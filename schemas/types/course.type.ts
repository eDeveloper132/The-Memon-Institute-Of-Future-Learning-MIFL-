import type { Document, Types } from 'mongoose';

export interface ICourseBatch {
    _id?: Types.ObjectId;
    name: string;
    students: Types.ObjectId[];
}

export interface ICourse extends Document {
    title: string;
    code: string; // e.g., 'MATH101'
    description?: string;
    credits: number;
    department: Types.ObjectId; // Ref to Department
    teacher: Types.ObjectId; // Ref to User (Teacher)
    syllabus?: string; // URL or text
    enrolledStudents: Types.ObjectId[]; // Ref to User (Student)
    batches: ICourseBatch[];
    createdAt: Date;
    updatedAt: Date;
}
