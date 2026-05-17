import type { Document, Types } from 'mongoose';

export type NoticeAudience = 'all' | 'students' | 'teachers' | 'parents';

export interface INotice extends Document {
    title: string;
    content: string;
    author: Types.ObjectId; // Ref to User
    audience: NoticeAudience[];
    targetClass?: Types.ObjectId; // Optional: specific to a class
    expiryDate?: Date;
    isPinned: boolean;
    attachments?: string[];
    createdAt: Date;
    updatedAt: Date;
}
