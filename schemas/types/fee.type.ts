import type { Document, Types } from 'mongoose';

export type FeeStatus = 'paid' | 'unpaid' | 'partially_paid' | 'overdue';

export interface IFee extends Document {
    student: Types.ObjectId; // Ref to User
    amount: number;
    type: string; // e.g., 'Tuition', 'Library', 'Transport'
    dueDate: Date;
    status: FeeStatus;
    paidDate?: Date;
    paymentMethod?: 'cash' | 'card' | 'online';
    transactionId?: string;
    remarks?: string;
    createdAt: Date;
    updatedAt: Date;
}
