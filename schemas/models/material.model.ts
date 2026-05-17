import mongoose, { Schema } from 'mongoose';
import type { IMaterial } from '../types/material.type.js';

const materialSchema = new Schema<IMaterial>(
    {
        title: { type: String, required: true, trim: true },
        description: String,
        type: { 
            type: String, 
            enum: ['pdf', 'doc', 'video', 'link', 'other'],
            default: 'other'
        },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        fileUrl: String,
        link: String,
    },
    { timestamps: true }
);

export const Material = mongoose.model<IMaterial>('Material', materialSchema);
