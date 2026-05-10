import type { Document, Types } from 'mongoose';

export interface IDepartment extends Document {
    name: string;
    code: string; // e.g., 'SCI', 'ART'
    headOfDepartment: Types.ObjectId; // Ref to User (Teacher)
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
