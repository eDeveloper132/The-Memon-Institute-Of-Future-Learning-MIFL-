import mongoose, { Schema, type Document } from 'mongoose';

export interface IEnrollmentRequest extends Document {
    student: mongoose.Types.ObjectId;
    targetType: 'Class' | 'Course';
    targetId: mongoose.Types.ObjectId;
    status: 'pending' | 'approved' | 'denied' | 'cancelled';
    feeAtTimeOfApplication: number;
    appliedAt: Date;
    processedAt?: Date;
    processedBy?: mongoose.Types.ObjectId;
}

const enrollmentRequestSchema = new Schema<IEnrollmentRequest>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        targetType: { type: String, enum: ['Class', 'Course'], required: true },
        targetId: { type: Schema.Types.ObjectId, refPath: 'targetType', required: true },
        status: {
            type: String,
            enum: ['pending', 'approved', 'denied', 'cancelled'],
            default: 'pending',
        },
        feeAtTimeOfApplication: { type: Number, default: 0 },
        appliedAt: { type: Date, default: Date.now },
        processedAt: Date,
        processedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

// Index for efficient querying by student or admin
enrollmentRequestSchema.index({ student: 1, status: 1 });
enrollmentRequestSchema.index({ status: 1 });

export const EnrollmentRequest = mongoose.model<IEnrollmentRequest>('EnrollmentRequest', enrollmentRequestSchema);
