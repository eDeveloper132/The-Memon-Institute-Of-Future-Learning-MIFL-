# Security and Middleware Layer

Middleware in MIFL provides essential protection against common web vulnerabilities and enforces role-based access control (RBAC) across the entire platform.

## 🛡 Security Middleware (`security.ts`)

Leverages **Helmet.js** to set critical security headers, including:
- **X-Content-Type-Options**: `nosniff`.
- **X-Frame-Options**: `DENY`.
- **Content-Security-Policy (CSP)**: A strict policy that forbids inline scripts. Frontend pages must use `addEventListener` and external modules in the `public` directory to comply.

## 🚦 Targeted Rate Limiting (`rateLimiter.ts`)

MIFL uses a specialized rate limiting strategy to balance security with developer/staff productivity:

- **Targeted Audience:** Rate limiting is explicitly applied **only to users with the `student` role**.
- **Exempt Users:** Admin, Teacher, and Parent roles are exempt from rate limiting to allow for high-frequency administrative tasks.
- **Limit:** 200 requests per 15-minute window per IP.
- **Mechanism:** Leverages `express-rate-limit` with custom `skip` logic based on JWT role decoding.

## 🔐 Authentication & Authorization (`auth.ts`)

- **`authenticate`**: Verifies the JWT token from the `token` cookie or `Authorization` header.
- **`authorize(...roles)`**: Restricts access to specific endpoints based on the authenticated user's role.

## 📂 File Uploads (`upload.ts`)

- **Engine:** Multer.
- **Usage:** Handles temporary storage for chat attachments and profile pictures before processing or external storage.
