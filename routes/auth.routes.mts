import { Router } from 'express';
import { signup, login, logout, forgotPassword, resetPassword, getMe, verifyEmail, resendVerification, requestEmailChange, initiateNewEmailVerification, confirmEmailChange } from '../controllers/auth.controller.mjs';
import { authLimiter } from '../middlewares/rateLimiter.mjs';
import { authenticate } from '../middlewares/auth.mjs';
import path from 'path';

const router = Router();

/**
 * Auth Views
 */
router.get('/login', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'signup.html'));
});

router.get('/forgot-password', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'forgotPassword.html'));
});

router.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'resetPassword.html'));
});

router.get('/change-email', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'changeEmailRequest.html'));
});

router.get('/reset-email/:token', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'resetEmail.html'));
});

router.get('/success', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'success.html'));
});

/**
 * Authentication API Endpoints
 */
router.get('/me', authenticate, getMe);
router.get('/verify-email/:token', verifyEmail);
router.get('/confirm-email-change/:token', confirmEmailChange);
router.post('/resend-verification', authLimiter, resendVerification);
router.post('/signup', signup);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', authLimiter, resetPassword);
router.post('/request-email-change', authLimiter, requestEmailChange);
router.post('/update-email/:token', authLimiter, initiateNewEmailVerification);

export default router;
