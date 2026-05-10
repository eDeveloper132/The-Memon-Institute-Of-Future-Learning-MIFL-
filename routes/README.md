# Routes

This directory contains the Express router definitions, mapping URL endpoints to their respective controller methods.

## Current Route Groups

### Authentication (`auth.routes.mts`)
- **Base Path:** `/api/auth`
- **Endpoints:**
    - `POST /signup`: Register a new user.
    - `POST /login`: Authenticate a user and receive a JWT.
    - `POST /forgot-password`: Initiate password recovery.
    - `POST /reset-password`: Update password using a recovery token.
    - `GET /verify-email`: Verify user email address.

## Middleware Integration

Routes are protected or enhanced using middlewares found in the `middlewares/` directory. For example, authentication routes use rate limiting to prevent brute-force attacks, and protected routes use the `authenticate` middleware.
