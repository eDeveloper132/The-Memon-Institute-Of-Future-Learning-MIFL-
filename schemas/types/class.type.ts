import type { Document, Types } from 'mongoose';
import type { ICurriculumModule } from './course.type.js';

export interface IClassBatch {
         _id?: Types.ObjectId;
         name: string;
         students: Types.ObjectId[];
     }
export interface IClass extends Document {
    name: string; // e.g., 'Grade 10-A'
    gradeLevel: number; // e.g., 10
    section: string; // e.g., 'A'
    roomNumber?: string;
    capacity?: number;
    classTeacher: Types.ObjectId; // Ref to User (Teacher)
    students: Types.ObjectId[]; // Array of Ref to User (Student)
    batches: IClassBatch[];
    classOutline?: string;
    classCurriculum: ICurriculumModule[];
    classCurriculumLocked: boolean;
    academicYear: string; // e.g., '2025-2026'
    createdAt: Date;
    updatedAt: Date;
}
