import type { Document, Types } from 'mongoose';

export type ExamType = 'midterm' | 'final' | 'quiz' | 'assignment';

export interface IExam extends Document {
    title: string;
    course: Types.ObjectId; // Ref to Course
    class?: Types.ObjectId; // Ref to Class (optional)
    type: ExamType;
    date: Date;
    maxMarks: number;
    weightage: number; // Percentage of final grade
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGrade extends Document {
    student: Types.ObjectId; // Ref to User
    exam: Types.ObjectId; // Ref to Exam
    obtainedMarks: number;
    feedback?: string;
    gradedBy: Types.ObjectId; // Ref to User (Teacher)
    createdAt: Date;
    updatedAt: Date;
}
