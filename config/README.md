# Infrastructure Configuration

This directory contains the essential setup for database connections, environment variables, and external service integrations.

## 🗄 Database Connection (`db.ts`)

- **ORM:** Mongoose.
- **Connection Logic:** Implements a singleton-like connection check to handle Vercel's serverless environment efficiently (reusing connections where possible).
- **Security:** Connection strings are injected via the `MONGODB_URI` environment variable.

## 📧 Service Integrations

The system leverages several environment variables for core functionality:

| Variable | Usage | Source |
|----------|-------|--------|
| `PORT` | Local server port (Default: 2500) | .env |
| `MONGODB_URI` | Connection string for MongoDB Atlas/Local | .env |
| `JWT_SECRET` | Signing key for authentication tokens | .env |
| `mail_name` | Nodemailer service email (e.g. Gmail) | .env |
| `mail_pass` | App-specific password for the email service | .env |
| `SANITY_PROJECT_ID` | Project ID for chat file attachments | Sanity.io |
| `SANITY_API_TOKEN` | API Token for uploading chat assets | Sanity.io |

## 🚀 Environment Specifics

- **Development:** Uses `dotenv` for local variable injection.
- **Production (Vercel):** Variables should be configured in the Vercel Dashboard under **Environment Variables**.
- **Test:** Variables are managed by Jest in the testing environment.
