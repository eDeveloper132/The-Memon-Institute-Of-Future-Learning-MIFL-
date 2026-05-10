import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import type { Request, Response, NextFunction } from 'express';

/**
 * Security middleware suite
 * - Helmet for HTTP headers
 * - Custom NoSQL injection protection (Express 5 compatible)
 * - HPP to prevent HTTP Parameter Pollution
 */

// Custom middleware to handle NoSQL injection in Express 5
const nosqlSanitize = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[Security] Sanitizing request: ${req.method} ${req.url}`);
    if (req.body) mongoSanitize.sanitize(req.body);
    if (req.params) mongoSanitize.sanitize(req.params);
    if (req.query) mongoSanitize.sanitize(req.query);
    next();
};

export const securityMiddleware = [
    // 1. Set security HTTP headers with custom CSP for CDNs
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "script-src": ["'self'", "'unsafe-inline'", "cdn.tailwindcss.com"],
                "style-src": ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
                "img-src": ["'self'", "data:", "https:"],
            },
        },
    }),

    // 2. Data sanitization against NoSQL query injection (Express 5 compatible)
    nosqlSanitize,

    // 3. Prevent HTTP Parameter Pollution
    hpp(),

    // 4. Custom security headers
    (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        next();
    }
];
