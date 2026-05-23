import mongoose, { Schema } from 'mongoose';
import type { IClass } from '../types/class.type.js';

const classSchema = new Schema<IClass>(
    {
        name: { type: String, required: true, trim: true },
        gradeLevel: { type: Number, required: true },
        section: { type: String, required: true },
        roomNumber: String,
        capacity: Number,
        classTeacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        academicYear: { type: String, required: true },
    },
    { timestamps: true }
);

// Compound index to ensure unique class names per academic year
classSchema.index({ name: 1, academicYear: 1 }, { unique: true });

export const Class = mongoose.model<IClass>('Class', classSchema);
