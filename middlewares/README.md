# Middlewares

Middlewares are functions that execute during the request-response lifecycle. They provide a powerful way to handle cross-cutting concerns such as security, authentication, and request throttling.

## Core Middlewares

### 1. Security Middleware (`security.ts`)
Enhances application security by setting various HTTP headers and sanitizing inputs.
- **Helmet:** Sets security-related HTTP headers to protect against common web vulnerabilities.
- **NoSQL Injection:** Uses `express-mongo-sanitize` to prevent malicious MongoDB queries.
- **HPP:** Protects against HTTP Parameter Pollution.

### 2. Rate Limiting (`rateLimiter.ts`)
Prevents abuse and DoS attacks by limiting the number of requests a client can make within a certain timeframe.
- **General Limiter:** Applied globally to all routes.
- **Auth Limiter:** Stricter limits applied to authentication endpoints (Login, Signup) to prevent brute-force attacks.

### 3. Authentication (`auth.ts`)
Manages user sessions and access control.
- **`authenticate`:** Validates the JWT provided in the request (handles both cookies and Authorization headers).
- **`authorize`:** Restricts access based on user roles (Admin, Teacher, Student, Parent, etc.).

## Usage

Middlewares are applied globally in `index.ts` or locally within specific route definitions in the `routes/` directory.
