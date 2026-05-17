import mongoose, { Schema } from 'mongoose';
import type { INotice } from '../types/notice.type.js';

const noticeSchema = new Schema<INotice>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        audience: [{ 
            type: String, 
            enum: ['all', 'students', 'teachers', 'parents'],
            default: 'all'
        }],
        targetClass: { type: Schema.Types.ObjectId, ref: 'Class' },
        expiryDate: Date,
        isPinned: { type: Boolean, default: false },
        attachments: [String],
    },
    { timestamps: true }
);

export const Notice = mongoose.model<INotice>('Notice', noticeSchema);
