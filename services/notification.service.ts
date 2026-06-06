import { Notification } from '../schemas/models/notification.model.js';
import { User } from '../schemas/models/user.model.js';
import { mailService } from './mail.service.js';
import { emailTemplates } from './emailTemplates.js';
import { getIO } from '../socket.js';
import type { INotification, NotificationChannel } from '../schemas/types/notification.type.js';
import chalk from 'chalk';

export class NotificationService {
    /**
     * Send a notification through multiple channels
     */
    static async send(data: Partial<INotification>): Promise<INotification> {
        const { recipient, type, title, content, data: extraData, priority } = data;

        if (!recipient) {
            throw new Error('Recipient is required for notification');
        }

        // 1. Fetch recipient and their preferences
        const user = await User.findById(recipient).select('notificationPrefs email name');
        if (!user) {
            throw new Error('Recipient user not found');
        }

        const prefs = user.notificationPrefs || { email: true, socket: true, inApp: true };
        const channelsUsed: NotificationChannel[] = [];

        // 2. Save to Database (In-App) if preferred
        let notification: any;
        if (prefs.inApp) {
            if (!type || !title || !content) {
                throw new Error('Type, title, and content are required for persistent notifications');
            }
            const createPayload: any = {
                recipient,
                type,
                title,
                content,
                priority: priority || 'medium',
                channels: ['db'] 
            };
            if (extraData !== undefined) createPayload.data = extraData;
            
            notification = await Notification.create(createPayload);
            channelsUsed.push('db');
        }

        // 3. Emit via Socket.io if preferred
        if (prefs.socket) {
            try {
                const io = getIO();
                io.to(recipient.toString()).emit('notification', {
                    _id: notification?._id,
                    type,
                    title,
                    content,
                    data: extraData,
                    priority,
                    createdAt: notification?.createdAt || new Date()
                });
                channelsUsed.push('socket');
            } catch (error) {
                console.error(chalk.red('[Notification Service] Socket emission failed:'), error);
            }
        }

        // 4. Send Email if preferred
        if (prefs.email && user.email) {
            try {
                let html = `<p>${content || ''}</p>`;
                const safeTitle = title || 'MIFL Notification';
                const safeContent = content || '';
                
                // Use specialized templates if available
                if (type === 'ACADEMIC') {
                    html = emailTemplates.academicUpdate(safeTitle, extraData || { title: safeContent });
                } else if (type === 'FEE') {
                    html = emailTemplates.financeAlert(safeTitle, extraData || { description: safeContent, amount: 0 });
                } else if (type === 'SYSTEM' && priority === 'urgent') {
                    html = emailTemplates.adminAlert(safeTitle, safeContent);
                } else if (type === 'MESSAGE') {
                    html = emailTemplates.offlineMessage(extraData?.senderName || 'Someone', safeContent);
                }

                await mailService.sendMail({
                    to: user.email,
                    subject: `[MIFL] ${safeTitle}`,
                    html
                });
                channelsUsed.push('email');
            } catch (error) {
                console.error(chalk.red('[Notification Service] Email delivery failed:'), error);
            }
        }

        // Update notification with channels used if it was created
        if (notification) {
            notification.channels = channelsUsed;
            await notification.save();
        }

        // If inApp was disabled, we return a plain object or nothing
        return (notification || { 
            recipient, type, title, content, data: extraData, priority, channels: channelsUsed, createdAt: new Date() 
        }) as INotification;
    }

    /**
     * Broadcast a notification to all connected clients via Socket.io
     * Note: This does not save to DB or send emails for all users (too expensive for now)
     */
    static async broadcast(data: { type: string, title: string, content: string, data?: any }): Promise<void> {
        try {
            const io = getIO();
            io.emit('notification', {
                ...data,
                createdAt: new Date()
            });
            console.log(chalk.blue(`[Notification Service] Broadcasted: ${data.title}`));
        } catch (error) {
            console.error(chalk.red('[Notification Service] Broadcast failed:'), error);
        }
    }
}
