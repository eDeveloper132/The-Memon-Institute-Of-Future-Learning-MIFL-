import { rateLimit } from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import path from 'path';

/**
 * General rate limiter to prevent DoS and Brute Force attacks
 */
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    handler: (req, res, next, options) => {
        if (req.accepts('html')) {
            return res.status(options.statusCode).sendFile(path.join(process.cwd(), 'public', 'errors', '429.html'));
        }
        res.status(options.statusCode).send(options.message);
    },
    skip: (req: any) => {
        try {
            const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
            // If no token, skip (applying only to authenticated students)
            if (!token) return true;
            
            const decoded = jwt.decode(token) as any;
            // Only apply rate limiting if role is explicitly 'student'
            // Skip for everyone else (admin, teacher, parent, guest)
            return !decoded || decoded.role !== 'student';
        } catch {
            return true; // Skip on error to be safe
        }
    }
});

/**
 * Stricter rate limiter for authentication endpoints
 */
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 5 login attempts per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many login attempts, please try again after an hour'
    },
    handler: (req, res, next, options) => {
        if (req.accepts('html')) {
            return res.status(options.statusCode).sendFile(path.join(process.cwd(), 'public', 'errors', '429.html'));
        }
        res.status(options.statusCode).send(options.message);
    }
});
