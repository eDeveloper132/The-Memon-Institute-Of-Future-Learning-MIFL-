import { Document, Types } from 'mongoose';

export type NotificationType = 'SYSTEM' | 'ENROLLMENT' | 'ACADEMIC' | 'FEE' | 'MESSAGE';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';
export type NotificationChannel = 'db' | 'socket' | 'email';

export interface INotification extends Document {
    recipient: Types.ObjectId;
    type: NotificationType;
    title: string;
    content: string;
    data?: Record<string, any>;
    priority: NotificationPriority;
    channels: NotificationChannel[];
    readAt?: Date;
    createdAt: Date;
    expiresAt?: Date;
}
