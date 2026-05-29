import type { Document, Types } from 'mongoose';

export interface IMessage extends Document {
    sender: Types.ObjectId; // Ref to User
    receiver?: Types.ObjectId; // Ref to User (Optional for group messages)
    group?: Types.ObjectId; // Ref to ChatGroup (Optional for direct messages)
    content: string;
    attachments?: string[];
    isRead: boolean; // DM specific
    readBy?: Types.ObjectId[]; // Group specific
    createdAt: Date;
    updatedAt: Date;
}
