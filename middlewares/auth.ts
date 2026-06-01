import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user?: any;
}

/**
 * Middleware to verify JWT tokens
 * Handles both API and View requests
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log(`[Auth] No token found for ${req.url}`);
        // If it's a browser request for a page, redirect to login
        if (req.accepts('html')) {
            return res.redirect('/api/auth/login');
        }
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        console.log(`[Auth] User authenticated: ${(decoded as any).id} [${(decoded as any).role}]`);
        next();
    } catch (error) {
        console.error(`[Auth] Token verification failed: ${error}`);
        res.cookie('token', '', { maxAge: 1 }); // Clear invalid token
        if (req.accepts('html')) {
            return res.redirect('/api/auth/login');
        }
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

/**
 * Middleware to restrict access based on roles
 */
export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            console.log(`[Auth] Authorization failed for ${req.url}. User role: ${req.user?.role}, Required roles: ${roles}`);
            if (req.accepts('html')) {
                return res.status(403).send('<h1>403 Forbidden - Permission Denied</h1>');
            }
            return res.status(403).json({ message: 'Permission denied' });
        }
        next();
    };
};
