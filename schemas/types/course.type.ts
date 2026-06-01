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
    learningObjectives?: string[];
    resources?: { title: string; url: string }[];
    order: number;
}

export interface ICurriculumSection {
    _id?: Types.ObjectId;
    title: string;
    modules: ICurriculumModule[];
    isOptional?: boolean; // NEW: Mark section as optional
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
    curriculumSections: ICurriculumSection[]; // Updated: Array of curriculum sections
    curriculumLocked: boolean; // Admin lock status
    enrollmentFee: number;
    enrolledStudents: Types.ObjectId[]; // Ref to User (Student)
    batches: ICourseBatch[];
    createdAt: Date;
    updatedAt: Date;
}
