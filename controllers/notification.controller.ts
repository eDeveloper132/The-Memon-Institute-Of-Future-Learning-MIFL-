import type { Response } from 'express';
import { Notification } from '../schemas/models/notification.model.js';
import { User } from '../schemas/models/user.model.js';
import chalk from 'chalk';

/**
 * Get user notifications with filtering
 */
export const getNotifications = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const { status } = req.query; // 'unread', 'read', 'all'

        const query: any = { recipient: userId };
        if (status === 'unread') query.readAt = null;
        else if (status === 'read') query.readAt = { $ne: null };

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .limit(50);

        res.status(200).json({ notifications });
    } catch (error) {
        console.error(chalk.red('[Notification Controller] getNotifications error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Mark a specific notification as read
 */
export const markAsRead = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findOneAndUpdate(
            { _id: id, recipient: userId },
            { $set: { readAt: new Date() } },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error(chalk.red('[Notification Controller] markAsRead error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Mark all notifications as read for the current user
 */
export const markAllAsRead = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;

        await Notification.updateMany(
            { recipient: userId, readAt: null },
            { $set: { readAt: new Date() } }
        );

        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error(chalk.red('[Notification Controller] markAllAsRead error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get notification preferences
 */
export const getPreferences = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('notificationPrefs');
        
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ preferences: user.notificationPrefs });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Update notification preferences
 */
export const updatePreferences = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const { email, socket, inApp } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { 
                $set: { 
                    'notificationPrefs.email': email,
                    'notificationPrefs.socket': socket,
                    'notificationPrefs.inApp': inApp
                } 
            },
            { new: true }
        ).select('notificationPrefs');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'Preferences updated', preferences: user.notificationPrefs });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
