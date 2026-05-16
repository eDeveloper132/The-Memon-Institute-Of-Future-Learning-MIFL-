# Routes

This directory contains the Express router definitions, mapping URL endpoints to their respective controller methods.

## Current Route Groups

### Authentication (`auth.routes.ts`)
- **Base Path:** `/api/auth`
- **Key API Endpoints:**
    - `POST /signup`: Register a new user.
    - `POST /login`: Authenticate a user and set cookie.
    - `POST /logout`: Clear session cookie.
    - `POST /forgot-password`: Initiate password recovery.
    - `POST /reset-password/:token`: Update password.
    - `GET /verify-email/:token`: Verify account email.
    - `POST /request-email-change`: Start email change workflow.
    - `GET /confirm-email-change/:token`: Finalize email change.
    - `GET /me`: Get current authenticated user profile.
- **View Routes:**
    - `GET /login`, `GET /signup`, `GET /forgot-password`, etc.

## Middleware Integration

Routes are protected or enhanced using middlewares found in the `middlewares/` directory. For example, authentication routes use rate limiting to prevent brute-force attacks, and protected routes use the `authenticate` middleware to ensure only logged-in users can access them.
