import mongoose, { Schema } from 'mongoose';
import type { IAssignment, ISubmission } from '../types/assignment.type.js';

const assignmentSchema = new Schema<IAssignment>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        dueDate: { type: Date, required: true },
        maxPoints: { type: Number, required: true, default: 100 },
        attachments: [String],
    },
    { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);

const submissionSchema = new Schema<ISubmission>(
    {
        assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: String,
        attachments: [String],
        submittedAt: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['submitted', 'late', 'graded'],
            default: 'submitted',
        },
        grade: Number,
        feedback: String,
        gradedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

// Compound index to ensure unique submissions per student per assignment
submissionSchema.index({ student: 1, assignment: 1 }, { unique: true });

export const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);
