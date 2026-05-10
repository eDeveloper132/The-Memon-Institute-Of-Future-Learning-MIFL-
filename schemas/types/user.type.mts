import type { Document, Types } from 'mongoose';

export type UserRole = 'student' | 'teacher' | 'staff' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    role: UserRole;
    status: UserStatus;
    profilePicture?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    emergencyContact?: {
        name: string;
        relationship: string;
        phoneNumber: string;
    };
    
    // Student specific
    studentId?: string;
    parentName?: string;
    parentContact?: string;
    currentClass?: Types.ObjectId; // Ref to Class
    
    // Teacher/Staff specific
    staffId?: string;
    department?: Types.ObjectId; // Ref to Department
    designation?: string;
    joiningDate?: Date;
    qualification?: string[];
    
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
