import type { Document, Types } from 'mongoose';

export interface IActivityTime extends Document {
    student: Types.ObjectId; // Ref to User (Student)
    teacher: Types.ObjectId; // Ref to User (Teacher)
    targetType: 'class' | 'course';
    targetId: Types.ObjectId; // Ref to Class or Course
    activityName: string;
    duration: string; // Stored as formatted string "HH:MM:SS"
    durationMs: number; // Storing MS for math operations
    createdAt: Date;
    updatedAt: Date;
}
