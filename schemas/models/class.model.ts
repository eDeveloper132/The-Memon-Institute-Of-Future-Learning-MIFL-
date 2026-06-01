import mongoose, { Schema } from 'mongoose';
import type { IClass } from '../types/class.type.js';
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

const curriculumSectionSchema = new Schema({
    title: { type: String, required: true },
    modules: [curriculumModuleSchema],
    isOptional: { type: Boolean, default: false },
    order: { type: Number, required: true, default: 0 }
});

const classSchema = new Schema<IClass>(
    {
        name: { type: String, required: true, trim: true },
        gradeLevel: { type: Number, required: true },
        section: { type: String, required: true },
        roomNumber: String,
        capacity: Number,
        classTeacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        batches: [batchSchema], // NEW: Embedded batches
        classOutline: String,
        classCurriculumSections: [curriculumSectionSchema],
        classCurriculumLocked: { type: Boolean, default: false },
        academicYear: { type: String, required: true },
        enrollmentFee: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Compound index to ensure unique class names per academic year
classSchema.index({ name: 1, academicYear: 1 }, { unique: true });

export const Class = mongoose.model<IClass>('Class', classSchema);
