import type { Document, Types } from 'mongoose';

export interface IMessage extends Document {
    sender: Types.ObjectId; // Ref to User
    receiver: Types.ObjectId; // Ref to User
    content: string;
    attachments?: string[];
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}
