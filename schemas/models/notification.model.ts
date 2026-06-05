import mongoose, { Schema } from 'mongoose';
import type { INotification } from '../types/notification.type.js';

const notificationSchema = new Schema<INotification>(
    {
        recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        type: {
            type: String,
            enum: ['SYSTEM', 'ENROLLMENT', 'ACADEMIC', 'FEE', 'MESSAGE'],
            required: true,
        },
        title: { type: String, required: true },
        content: { type: String, required: true },
        data: { type: Schema.Types.Mixed },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'medium',
        },
        channels: [{
            type: String,
            enum: ['db', 'socket', 'email'],
        }],
        readAt: { type: Date },
        expiresAt: { type: Date },
    },
    { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
