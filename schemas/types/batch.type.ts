import type { Document } from 'mongoose';

export interface IBatch extends Document {
    name: string;
    startYear: number;
    endYear: number;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
