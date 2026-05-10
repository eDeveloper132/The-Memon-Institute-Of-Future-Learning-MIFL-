import type { Document, Types } from 'mongoose';

export interface IAssignment extends Document {
    title: string;
    description: string;
    course: Types.ObjectId; // Ref to Course
    class: Types.ObjectId; // Ref to Class
    teacher: Types.ObjectId; // Ref to User
    dueDate: Date;
    maxPoints: number;
    attachments?: string[]; // URLs to files
    createdAt: Date;
    updatedAt: Date;
}

export interface ISubmission extends Document {
    assignment: Types.ObjectId; // Ref to Assignment
    student: Types.ObjectId; // Ref to User
    content?: string;
    attachments?: string[]; // URLs to files
    submittedAt: Date;
    status: 'submitted' | 'late' | 'graded';
    grade?: number;
    feedback?: string;
    gradedBy?: Types.ObjectId; // Ref to User
    createdAt: Date;
    updatedAt: Date;
}
