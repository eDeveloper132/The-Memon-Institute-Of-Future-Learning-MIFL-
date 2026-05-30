import type { Document, Types } from 'mongoose';

export interface ICourseBatch {
    _id?: Types.ObjectId;
    name: string;
    students: Types.ObjectId[];
}

export interface ICurriculumModule {
    title: string;
    description: string;
    duration?: string;
    order: number;
}

export interface ICourse extends Document {
    title: string;
    code: string; // e.g., 'MATH101'
    description?: string;
    credits: number;
    department: Types.ObjectId; // Ref to Department
    teacher: Types.ObjectId; // Ref to User (Teacher)
    syllabus?: string; // URL or text
    outline?: string; // Structured course outline
    curriculum: ICurriculumModule[]; // Array of curriculum modules
    curriculumLocked: boolean; // Admin lock status
    enrolledStudents: Types.ObjectId[]; // Ref to User (Student)
    batches: ICourseBatch[];
    createdAt: Date;
    updatedAt: Date;
}
