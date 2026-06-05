import mongoose, { Schema } from 'mongoose';
import type { IRoleChangeLog } from '../types/roleChangeLog.type.js';

const roleChangeLogSchema = new Schema<IRoleChangeLog>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        oldRole: { type: String, required: true },
        newRole: { type: String, required: true },
        trigger: { type: String, required: true },
        changedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        reason: { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const RoleChangeLog = mongoose.model<IRoleChangeLog>('RoleChangeLog', roleChangeLogSchema);
