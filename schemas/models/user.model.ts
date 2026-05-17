import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUser } from '../types/user.type.js';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        role: {
            type: String,
            enum: ['student', 'teacher', 'admin', 'parent'],
            default: 'student',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active',
        },
        profilePicture: String,
        dateOfBirth: Date,
        gender: { type: String, enum: ['male', 'female', 'other'] },

        // Student specific
        studentId: { type: String, unique: true, sparse: true },
        parent: { type: Schema.Types.ObjectId, ref: 'User' }, // Linked parent user
        parentName: String,
        parentContact: String,
        currentClass: { type: Schema.Types.ObjectId, ref: 'Class' },

        // Teacher specific
        staffId: { type: String, unique: true, sparse: true },
        department: { type: Schema.Types.ObjectId, ref: 'Department' },
        designation: String,
        joiningDate: Date,
        qualification: [String],

        isEmailVerified: { type: Boolean, default: false },
        emailVerificationToken: { type: String, index: true },
        pendingEmail: { type: String, index: true },
    },
    { timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
