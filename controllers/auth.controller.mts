import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.mjs';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import { mailService } from '../services/mail.service.mjs';

/**
 * Generate JWT Token
 */
const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1d',
    });
};

/**
 * Generate Reset Token (Short lived - 1 hour)
 */
const generateResetToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
    });
};

/**
 * Auth Controller
 */
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber, address, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            phoneNumber,
            address,
            role,
        });

        const token = generateToken(user._id.toString(), user.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error: any) {
        console.error(chalk.red('Signup error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id.toString(), user.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error: any) {
        console.error(chalk.red('Login error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = generateResetToken(user._id.toString());
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

        const html = `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
                <h1 style="color: #2563eb;">Reset Your Password</h1>
                <p>Hello ${user.name},</p>
                <p>You requested a password reset. Please click the button below to set a new password. This link is valid for 1 hour.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>Best regards,<br>MIFL Team</p>
            </div>
        `;

        await mailService.sendMail({
            to: user.email,
            subject: 'Password Reset Request - MIFL',
            html,
        });

        res.status(200).json({ message: 'Password recovery instructions sent to your email' });
    } catch (error: any) {
        console.error(chalk.red('Forgot Password error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'secret');
        } catch (err) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User no longer exists' });
        }

        // Update password (will be hashed by pre-save hook)
        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error: any) {
        console.error(chalk.red('Reset Password error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
