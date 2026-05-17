import mongoose, { Schema } from 'mongoose';
import type { IBatch } from '../types/batch.type.js';

const batchSchema = new Schema<IBatch>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        startYear: { type: Number, required: true },
        endYear: { type: Number, required: true },
        description: String,
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Batch = mongoose.model<IBatch>('Batch', batchSchema);
