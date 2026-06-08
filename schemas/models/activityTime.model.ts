import mongoose, { Schema } from 'mongoose';
import type { IActivityTime } from '../types/activityTime.type.js';

const activityTimeSchema = new Schema<IActivityTime>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        targetType: { 
            type: String, 
            enum: ['class', 'course'],
            required: true 
        },
        targetId: { type: Schema.Types.ObjectId, required: true },
        activityName: { type: String, required: true, trim: true },
        duration: { type: String, required: true },
        durationMs: { type: Number, required: true, min: 0 }
    },
    { timestamps: true }
);

// Indexes to speed up queries by teacher or student
activityTimeSchema.index({ teacher: 1, createdAt: -1 });
activityTimeSchema.index({ student: 1, createdAt: -1 });

export const ActivityTime = mongoose.model<IActivityTime>('ActivityTime', activityTimeSchema);
