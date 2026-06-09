import mongoose, { Schema } from 'mongoose';
import type { IExam, IGrade } from '../types/exam.type.js';

const examSchema = new Schema<IExam>(
    {
        title: { type: String, required: true, trim: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        class: { type: Schema.Types.ObjectId, ref: 'Class' },
        type: {
            type: String,
            enum: ['midterm', 'final', 'quiz', 'assignment'],
            required: true,
        },
        date: { type: Date, required: true },
        maxMarks: { type: Number, required: true },
        weightage: { type: Number, required: true },
        description: String,
    },
    { timestamps: true }
);

export const Exam = mongoose.model<IExam>('Exam', examSchema);

const gradeSchema = new Schema<IGrade>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
        obtainedMarks: { type: Number, required: true },
        feedback: String,
        gradedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

// Ensure a student is graded only once per exam
gradeSchema.index({ student: 1, exam: 1 }, { unique: true });

export const Grade = mongoose.model<IGrade>('Grade', gradeSchema);
