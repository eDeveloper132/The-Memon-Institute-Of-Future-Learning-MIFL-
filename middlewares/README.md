# Middlewares

This directory contains Express middlewares for various purposes, including security, logging, and request processing.

## Security Middlewares

- `security.mts`: Implements Helmet for HTTP headers, NoSQL injection prevention with `express-mongo-sanitize`, and HTTP Parameter Pollution (HPP) protection.
- `rateLimiter.mts`: Provides rate limiting strategies to prevent Brute Force and Denial of Service (DoS) attacks.
- `auth.mts`: Handles JWT authentication and role-based authorization.
