import type { Document, Types } from 'mongoose';

export interface IMaterial extends Document {
    title: string;
    description?: string;
    type: 'pdf' | 'doc' | 'video' | 'link' | 'other';
    course?: Types.ObjectId; // Ref to Course (Optional)
    class?: Types.ObjectId;  // Ref to Class (Optional)
    teacher: Types.ObjectId; // Ref to User (Teacher)
    fileUrl?: string;
    link?: string;
    createdAt: Date;
    updatedAt: Date;
}
