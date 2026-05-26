import mongoose, { Schema } from 'mongoose';
import type { IAttendance } from '../types/attendance.type.js';

const attendanceSchema = new Schema<IAttendance>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        class: { type: Schema.Types.ObjectId, ref: 'Class' },
        course: { type: Schema.Types.ObjectId, ref: 'Course' },
        date: { type: Date, required: true, default: Date.now },
        checkIn: Date,
        checkOut: Date,
        status: {
            type: String,
            enum: ['present', 'absent', 'late', 'excused'],
            required: true,
        },
        remarks: String,
        recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

// Index for efficient querying by student and date
attendanceSchema.index({ student: 1, date: 1 });

export const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);
