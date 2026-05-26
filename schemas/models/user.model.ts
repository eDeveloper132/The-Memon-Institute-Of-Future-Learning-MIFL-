import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUser } from '../types/user.type.js';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ['admin', 'student', 'teacher', 'parent'], default: 'student' },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        profilePicture: String,
        status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
        dateOfBirth: Date,
        gender: { type: String, enum: ['male', 'female', 'other'] },
        bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
        emergencyContact: {
            name: String,
            relationship: String,
            phoneNumber: String,
        },
        
        // Student specific
        studentId: { type: String, unique: true, sparse: true },
        parent: { type: Schema.Types.ObjectId, ref: 'User' },
        parentName: String,
        parentContact: String,
        currentClass: { type: Schema.Types.ObjectId, ref: 'Class' },
        
        // Teacher specific
        staffId: { type: String, unique: true, sparse: true },
        department: { type: Schema.Types.ObjectId, ref: 'Department' },
        designation: String,
        joiningDate: Date,
        qualification: [String],
        
        // Auth/Security
        isEmailVerified: { type: Boolean, default: false },
        emailVerificationToken: String,
        pendingEmail: String,
    },
    { timestamps: true }
);

// Password hashing middleware
userSchema.pre('save', async function (this: any) {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error: any) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
