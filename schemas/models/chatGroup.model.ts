import mongoose, { Schema } from 'mongoose';
import type { IChatGroup } from '../types/chatGroup.type.js';

const chatGroupSchema = new Schema<IChatGroup>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        classBatch: {
            classId: { type: Schema.Types.ObjectId, ref: 'Class' },
            batchName: { type: String }
        },
        isArchived: { type: Boolean, default: false }
    },
    { timestamps: true }
);

// Index for efficient querying of user's groups
chatGroupSchema.index({ members: 1, isArchived: 1 });

export const ChatGroup = mongoose.model<IChatGroup>('ChatGroup', chatGroupSchema);
