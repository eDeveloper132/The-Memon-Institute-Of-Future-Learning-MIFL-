import type { Document, Types } from 'mongoose';

export interface IChatGroup extends Document {
    name: string;
    description?: string;
    creator: Types.ObjectId; // Ref to User
    members: Types.ObjectId[]; // Refs to User
    classBatch?: {
        classId: Types.ObjectId; // Ref to Class
        batchName: string;
    };
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}
