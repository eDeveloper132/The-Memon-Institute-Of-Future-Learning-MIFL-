import type { Document, Types } from 'mongoose';

export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';
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
    parent?: Types.ObjectId; // Ref to User (Parent)
    parentName?: string;
    parentContact?: string;
    currentClass?: Types.ObjectId; // Ref to Class
    
    // Teacher specific
    staffId?: string;
    department?: Types.ObjectId; // Ref to Department
    designation?: string;
    joiningDate?: Date;
    qualification?: string[];
    
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    pendingEmail?: string;
    
    notificationPrefs: {
        email: boolean;
        socket: boolean;
        inApp: boolean;
    };
    
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
