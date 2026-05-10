import type { Document, Types } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    code: string; // e.g., 'MATH101'
    description?: string;
    credits: number;
    department: Types.ObjectId; // Ref to Department
    teacher: Types.ObjectId; // Ref to User (Teacher)
    syllabus?: string; // URL or text
    createdAt: Date;
    updatedAt: Date;
}
