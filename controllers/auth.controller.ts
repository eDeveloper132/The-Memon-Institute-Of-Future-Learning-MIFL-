import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import { mailService } from '../services/mail.service.js';
import crypto from 'crypto';

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
        console.log(`[Auth] Processing signup for email: ${req.body.email}`);
        const { name, email, password, phoneNumber, address, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log(`[Auth] Signup failed: User ${email} already exists`);
            return res.status(400).json({ message: 'User already exists' });
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = await User.create({
            name,
            email,
            password,
            phoneNumber,
            address,
            role,
            isEmailVerified: false,
            emailVerificationToken: verificationToken,
        });

        console.log(`[Auth] User created successfully: ${user._id}. Sending verification email.`);
        
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Verify Your Email - MIFL',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
                    <h1 style="color: #2563eb;">Welcome to MIFL!</h1>
                    <p>Hello ${user.name},</p>
                    <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
                    </div>
                    <p>Best regards,<br>MIFL Team</p>
                </div>
            `,
        });

        res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.',
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
        console.log(`[Auth] Processing login for email: ${req.body.email}`);
        const { email, password, rememberMe } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            console.log(`[Auth] Login failed: Invalid credentials for ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isEmailVerified) {
            console.log(`[Auth] Login failed: Email not verified for ${email}`);
            return res.status(403).json({ 
                message: 'Email not verified. Please verify your email before logging in.',
                requiresVerification: true,
                email: user.email 
            });
        }

        console.log(`[Auth] User logged in: ${user._id}`);
        const token = generateToken(user._id.toString(), user.role);

        const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge,
            path: '/',
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
    console.log(`[Auth] User logging out`);
    res.cookie('token', '', { maxAge: 1, path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ emailVerificationToken: token as string });

        if (!user) {
            return res.status(400).send('<h1>Invalid or expired verification link</h1>');
        }

        user.isEmailVerified = true;
        user.set('emailVerificationToken', undefined);
        await user.save();

        console.log(`[Auth] Email verified for user: ${user._id}`);
        res.redirect('/api/auth/login?verified=true');
    } catch (error) {
        console.error(chalk.red('Verify Email error:'), error);
        res.status(500).send('<h1>Internal server error</h1>');
    }
};

export const resendVerification = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.isEmailVerified) return res.status(400).json({ message: 'Email is already verified' });

        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.emailVerificationToken = verificationToken;
        await user.save();

        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Verify Your Email - MIFL',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
                    <h1 style="color: #2563eb;">Verify Your Email</h1>
                    <p>Please click the button below to verify your email address:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
                    </div>
                </div>`,
        });

        res.status(200).json({ message: 'Verification email resent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = generateResetToken(user._id.toString());
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Password Reset Request - MIFL',
            html: `<h1>Reset Your Password</h1><p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        res.status(200).json({ message: 'Password recovery instructions sent to your email' });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = password;
        await user.save();
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error: any) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

export const getMe = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// EMAIL CHANGE LOGIC (3-Step Double Verification)

/**
 * Step 1: User requests email change.
 * System sends verification link to CURRENT email to confirm owner intent.
 */
export const requestEmailChange = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email, isEmailVerified: true });
        if (!user) return res.status(404).json({ message: 'Verified user not found' });

        const changeToken = jwt.sign({ id: user._id, step: 'intent' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        const changeUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-email/${changeToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Email Change Request - MIFL',
            html: `<h1>Confirm Intent</h1><p>Click <a href="${changeUrl}">here</a> to confirm you want to change your email.</p>`,
        });

        res.status(200).json({ message: 'Confirmation link sent to your current email' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Step 2: User provides NEW email.
 * System sends verification link to the NEW email to prove access.
 */
export const initiateNewEmailVerification = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { newEmail } = req.body;

        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || 'secret');
        if (decoded.step !== 'intent') return res.status(400).json({ message: 'Invalid token step' });

        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser) return res.status(400).json({ message: 'This email is already in use' });

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Save proposed email temporarily
        user.pendingEmail = newEmail;
        const finalToken = jwt.sign({ id: user._id, step: 'confirm', newEmail }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        await user.save();

        const confirmUrl = `${req.protocol}://${req.get('host')}/api/auth/confirm-email-change/${finalToken}`;

        await mailService.sendMail({
            to: newEmail,
            subject: 'Verify Your New Email - MIFL',
            html: `<h1>Verify New Email</h1><p>Click <a href="${confirmUrl}">here</a> to verify this new email address.</p>`,
        });

        res.status(200).json({ message: 'Verification link sent to your NEW email address' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

/**
 * Step 3: User clicks link in NEW email.
 * System performs the actual swap in database.
 */
export const confirmEmailChange = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || 'secret');
        if (decoded.step !== 'confirm') return res.status(400).send('<h1>Invalid link</h1>');

        const user = await User.findById(decoded.id);
        if (!user || !user.pendingEmail || user.pendingEmail !== decoded.newEmail) {
            return res.status(400).send('<h1>Email change no longer valid</h1>');
        }

        user.email = user.pendingEmail;
        user.set('pendingEmail', undefined);
        user.isEmailVerified = true;
        await user.save();

        res.redirect('/api/auth/success?type=email_updated');
    } catch (error) {
        res.status(400).send('<h1>Link expired or invalid</h1>');
    }
};
