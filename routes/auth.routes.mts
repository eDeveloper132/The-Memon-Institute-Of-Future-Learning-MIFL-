import { Router } from 'express';
import { signup, login, logout, forgotPassword, resetPassword } from '../controllers/auth.controller.mjs';
import { authLimiter } from '../middlewares/rateLimiter.mjs';
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

router.get('/success', (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'success.html'));
});

/**
 * Authentication API Endpoints
 */
router.post('/signup', signup);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', authLimiter, resetPassword);

export default router;
