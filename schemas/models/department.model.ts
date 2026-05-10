import mongoose, { Schema } from 'mongoose';
import type { IDepartment } from '../types/department.type.js';

const departmentSchema = new Schema<IDepartment>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        code: { type: String, required: true, unique: true, uppercase: true },
        headOfDepartment: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        description: String,
    },
    { timestamps: true }
);

export const Department = mongoose.model<IDepartment>('Department', departmentSchema);
