import { Document, Types } from 'mongoose';
import type { UserRole } from './user.type.js';

export interface IRoleChangeLog extends Document {
    user: Types.ObjectId;
    oldRole: UserRole;
    newRole: UserRole;
    trigger: string;
    changedBy?: Types.ObjectId;
    reason?: string;
    createdAt: Date;
}
