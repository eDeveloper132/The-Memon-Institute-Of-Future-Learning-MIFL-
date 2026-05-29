import type { Request, Response } from 'express';
import { User } from '../schemas/models/user.model.js';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import { mailService } from '../services/mail.service.js';
import crypto from 'crypto';
import { emailTemplates } from '../services/emailTemplates.js';

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
        
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const verificationUrl = `${protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Verify Your Email - MIFL',
            html: emailTemplates.verification(user.name, verificationUrl),
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

export const login = async (req: any, res: Response) => {
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

        // Emit activity to admins
        if (req.io) {
            req.io.to('role:admin').emit('activity', {
                type: 'USER_LOGIN',
                user: {
                    id: user._id,
                    name: user.name,
                    role: user.role
                },
                timestamp: new Date()
            });
        }

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

export const logout = (req: any, res: Response) => {
    console.log(`[Auth] User logging out`);
    
    // Optional: Emit activity to admins
    if (req.io && req.user) {
        req.io.to('role:admin').emit('activity', {
            type: 'USER_LOGOUT',
            userId: req.user.id,
            timestamp: new Date()
        });
    }

    res.cookie('token', '', { maxAge: 1, path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        
        // Find user by token
        const user = await User.findOne({ emailVerificationToken: token as string });

        if (!user) {
            console.log(`[Auth] Email verification failed: Invalid token ${token}`);
            return res.status(400).send('<h1>Invalid or expired verification link</h1>');
        }

        // Use findByIdAndUpdate to avoid validation issues with unselected required fields (like password)
        await User.findByIdAndUpdate(user._id, {
            $set: { isEmailVerified: true },
            $unset: { emailVerificationToken: 1 }
        });

        console.log(`[Auth] Email verified for user: ${user._id}`);
        
        // Redirect to login page with success message
        res.redirect('/api/auth/login?verified=true');
    } catch (error) {
        console.error(chalk.red('Verify Email error:'), error);
        res.status(500).send('<h1>Internal server error during verification</h1>');
    }
};

export const resendVerification = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.isEmailVerified) return res.status(400).json({ message: 'Email is already verified' });

        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        // Use findByIdAndUpdate to avoid validation issues
        await User.findByIdAndUpdate(user._id, {
            $set: { emailVerificationToken: verificationToken }
        });

        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const verificationUrl = `${protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Verify Your Email - MIFL',
            html: emailTemplates.verification(user.name, verificationUrl),
        });

        res.status(200).json({ message: 'Verification email resent successfully' });
    } catch (error) {
        console.error(chalk.red('Resend Verification error:'), error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            // Still return 200 to prevent user enumeration attacks
            console.log(`[Auth] Forgot Password: Attempt for non-existent user ${email}`);
            return res.status(200).json({ message: 'If a user with that email exists, a recovery link has been sent.' });
        }

        const resetToken = generateResetToken(user._id.toString());
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Password Reset Request - MIFL',
            html: emailTemplates.passwordReset(resetUrl),
        });

        res.status(200).json({ message: 'Password recovery instructions sent to your email' });
    } catch (error: any) {
        console.error(chalk.red('Forgot Password error:'), error.message);
        res.status(500).json({ message: 'Internal server error while sending email' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found or token is invalid' });
        }

        user.password = password;
        await user.save();
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error: any) {
        console.error(chalk.red('Reset Password error:'), error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ message: 'Internal server error' });
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
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const changeUrl = `${protocol}://${req.get('host')}/api/auth/reset-email/${changeToken}`;

        await mailService.sendMail({
            to: user.email,
            subject: 'Email Change Request - MIFL',
            html: emailTemplates.emailChangeIntent(changeUrl),
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

        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const confirmUrl = `${protocol}://${req.get('host')}/api/auth/confirm-email-change/${finalToken}`;

        await mailService.sendMail({
            to: newEmail,
            subject: 'Verify Your New Email - MIFL',
            html: emailTemplates.emailChangeVerify(confirmUrl),
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

        // Use findByIdAndUpdate to avoid validation issues with unselected fields
        await User.findByIdAndUpdate(user._id, {
            $set: { 
                email: user.pendingEmail,
                isEmailVerified: true 
            },
            $unset: { pendingEmail: 1 }
        });

        console.log(`[Auth] Email updated for user: ${user._id} to ${user.pendingEmail}`);
        res.redirect('/api/auth/success?type=email_updated');
    } catch (error) {
        console.error(chalk.red('Confirm Email Change error:'), error);
        res.status(400).send('<h1>Link expired or invalid</h1>');
    }
};
