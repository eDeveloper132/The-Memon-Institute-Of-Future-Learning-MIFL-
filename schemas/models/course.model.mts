import mongoose, { Schema } from 'mongoose';
import type { ICourse } from '../types/course.type.mjs';

const courseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true, trim: true },
        code: { type: String, required: true, unique: true, uppercase: true },
        description: String,
        credits: { type: Number, required: true, default: 0 },
        department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        syllabus: String,
    },
    { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);
