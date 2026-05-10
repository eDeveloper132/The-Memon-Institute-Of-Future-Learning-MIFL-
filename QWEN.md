# MIFL - Educational Management System

## Project Overview
MIFL is a robust, scalable backend application for an Educational Management System, built with Node.js (Express 5), TypeScript, and MongoDB. It provides a foundation for managing users (students, teachers, admins), courses, classes, attendance, exams, and fees.

**Main Technologies:**
- Node.js 18+ with Express 5
- TypeScript with strict type checking
- MongoDB with Mongoose ODM
- JWT authentication
- Bcrypt password hashing
- Nodemailer for email services
- Socket.io for real-time features

## Building and Running

### Prerequisites
- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- Environment variables configured (see .env.example)

### Available Commands
```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Start development server with nodemon
npm run serve

# Run tests (if implemented)
npm test
```

### Environment Setup
Copy `.env.example` to `.env` and configure:
- `PORT`: Server port (default: 2500)
- `MONGODB_URI`: MongoDB connection string
- `mail_name`: Nodemailer service email
- `mail_pass`: Nodemailer service password
- `JWT_SECRET`: Secret key for JWT signing

## Development Conventions

### Code Structure
- **Controllers**: Handle request/response logic and business operations
- **Middlewares**: Express middleware for auth, security, rate limiting
- **Routes**: API endpoint definitions organized by feature
- **Schemas**: Mongoose models and TypeScript interfaces
- **Services**: Business logic services (e.g., email service)
- **Config**: Application configuration files

### Security Implementation
- JWT-based authentication with secure token management
- Email verification system with tokens
- Password reset functionality
- 3-step email change process with double verification
- Helmet.js for HTTP security headers
- NoSQL injection protection
- HTTP Parameter Pollution protection
- Rate limiting to prevent brute force attacks

### Authentication & User Management
- Role-based access control (student, teacher, staff, admin)
- Comprehensive user model supporting student/teacher-specific fields
- Bcrypt password hashing with salting
- Email verification system
- Secure session management with cookies

### Database Design
- Mongoose schemas with proper TypeScript interfaces
- Relationships between users, classes, departments, courses
- Proper indexing and query optimization
- Data sanitization and validation

### Email System
- Nodemailer integration with Gmail service
- HTML email templates for various use cases
- Async email delivery with error handling
- Verification, password reset, and welcome emails

## Current Implementation Status

### ✅ Completed Features
- Authentication system (signup, login, logout, verification)
- Password management (reset, forgot password)
- Email verification system
- Security middleware implementation
- Rate limiting
- Basic user CRUD operations
- Email service integration

### 📋 Database Models (Defined but need full implementation)
- User (fully implemented)
- Class, Department, Course (models exist but need controllers/routes)
- Attendance, Exam, Fee (models exist but need controllers/routes)

### 🔄 Real-time Features
- Socket.io is integrated but real-time features not yet implemented
- Ready for notifications, live updates, and collaborative features

### 🏗️ Architecture Notes
- Express 5 adoption for cutting-edge features
- ES Modules throughout the project
- Vercel-ready with proper proxy configuration
- Comprehensive error handling with chalk logging
- Production-ready security implementations

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- Consistent naming conventions
- Proper error handling with try/catch blocks
- Console logging with chalk for colored output
- Middleware chaining for security and functionality

### Testing Practices
- No tests currently implemented (TODO: Add test suite)
- Consider Jest or Mocha for unit testing
- Integration tests for API endpoints
- Security testing for authentication flows

### Security Considerations
- Always validate user input
- Use parameterized queries to prevent injection
- Implement proper CORS configuration
- Use HTTPS in production
- Store sensitive data securely (JWT secrets, passwords)
- Implement proper rate limiting on auth endpoints

### Contribution Guidelines
- Follow existing file structure and naming conventions
- Update TypeScript interfaces when modifying data models
- Add proper error handling for new features
- Document new API endpoints in route files
- Ensure security best practices are followed for new features

## Project Structure
```
D:\MIFL\
├── config/          # Database configuration
├── controllers/     # Business logic handlers
├── middlewares/     # Security, auth, rate limiting
├── public/          # Static assets and frontend prototypes
├── routes/          # API route definitions
├── schemas/         # Data models and TypeScript interfaces
├── services/        # Business services (mail, etc.)
└── types/           # Global type definitions
```

## Key Files Reference
- `index.ts`: Main application entry point
- `package.json`: Dependencies and scripts
- `schemas/models/user.model.ts`: User data model and methods
- `controllers/auth.controller.ts`: Authentication logic
- `middlewares/security.ts`: Security middleware suite
- `services/mail.service.ts`: Email service implementation
- `routes/auth.routes.ts`: Authentication endpoints