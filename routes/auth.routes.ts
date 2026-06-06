import { Router } from 'express';
import { signup, login, logout, forgotPassword, resetPassword, getMe, verifyEmail, resendVerification, requestEmailChange, initiateNewEmailVerification, confirmEmailChange } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';
import path from 'path';

const router = Router();

/**
 * Auth Views
 */
router.get('/login', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'auth', 'login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'auth', 'signup.html'));
});

router.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'auth', 'forgotPassword.html'));
});

router.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'auth', 'resetPassword.html'));
});

router.get('/change-email', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'auth', 'changeEmailRequest.html'));
});

router.get('/reset-email/:token', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'auth', 'resetEmail.html'));
});

router.get('/success', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'auth', 'success.html'));
});

/**
 * Authentication API Endpoints
 */
router.get('/me', authenticate, getMe);
router.get('/verify-email/:token', verifyEmail);
router.get('/confirm-email-change/:token', confirmEmailChange);
router.post('/resend-verification', resendVerification);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/request-email-change', requestEmailChange);
router.post('/update-email/:token', initiateNewEmailVerification);

export default router;
