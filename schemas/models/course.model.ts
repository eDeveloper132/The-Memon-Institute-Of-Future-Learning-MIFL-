import mongoose, { Schema } from 'mongoose';
import type { ICourse } from '../types/course.type.js';

const batchSchema = new Schema({
    name: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const curriculumModuleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: String,
    learningObjectives: [String],
    resources: [{
        title: { type: String, required: true },
        url: { type: String, required: true }
    }],
    order: { type: Number, required: true, default: 0 }
});

const courseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true, trim: true },
        code: { type: String, required: true, unique: true, uppercase: true },
        description: String,
        credits: { type: Number, required: true, default: 0 },
        department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        batches: [batchSchema],
        syllabus: String,
        outline: String,
        curriculum: [curriculumModuleSchema],
        curriculumLocked: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);
