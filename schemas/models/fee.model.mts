import mongoose, { Schema } from 'mongoose';
import type { IFee } from '../types/fee.type.mjs';

const feeSchema = new Schema<IFee>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        type: { type: String, required: true },
        dueDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ['paid', 'unpaid', 'partially_paid', 'overdue'],
            default: 'unpaid',
        },
        paidDate: Date,
        paymentMethod: { type: String, enum: ['cash', 'card', 'online'] },
        transactionId: String,
        remarks: String,
    },
    { timestamps: true }
);

export const Fee = mongoose.model<IFee>('Fee', feeSchema);
