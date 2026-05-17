import mongoose, { Schema } from 'mongoose';
import type { IMessage } from '../types/message.type.js';

const messageSchema = new Schema<IMessage>(
    {
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        attachments: [String],
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Index for efficient message retrieval between two users
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });
messageSchema.index({ receiver: 1, sender: 1, createdAt: -1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema);
