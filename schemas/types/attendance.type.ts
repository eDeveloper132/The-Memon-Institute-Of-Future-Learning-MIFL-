import type { Document, Types } from 'mongoose';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface IAttendance extends Document {
    student: Types.ObjectId; // Ref to User
    class: Types.ObjectId; // Ref to Class
    course?: Types.ObjectId; // Ref to Course (if tracking by subject)
    date: Date;
    status: AttendanceStatus;
    remarks?: string;
    recordedBy: Types.ObjectId; // Ref to User (Teacher/Admin)
    createdAt: Date;
    updatedAt: Date;
}
