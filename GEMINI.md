# MIFL Project Overview

MIFL is a Node.js/TypeScript backend application built with Express and MongoDB (via Mongoose). It appears to be a foundation for a web application with authentication and real-time capabilities.

## Technologies

- **Runtime:** Node.js (>=18.0.0)
- **Language:** TypeScript
- **Web Framework:** Express 5
- **Database:** MongoDB with Mongoose
- **Real-time:** Socket.io
- **Security:** JSON Web Tokens (JWT), Bcrypt
- **Email:** Nodemailer
- **Environment Management:** dotenv

## Architecture

The project follows a structured directory layout, though many directories are currently placeholders:

- `config/`: Configuration files (e.g., database connection).
- `controllers/`: Request handling logic (currently empty).
- `routes/`: API route definitions (currently empty).
- `schemas/`: Mongoose models and type definitions (currently empty).
- `services/`: Business logic layer (currently empty).
- `types/`: Custom TypeScript type definitions.
- `public/`: Static assets, including an `auth` and `protected` section.

## Building and Running

### Prerequisites

- Node.js (>=18.0.0)
- MongoDB instance (local or remote)

### Setup

1. Copy `.env.example` to `.env` and fill in the required variables:
   ```env
   PORT=2500
   MONGODB_URI=your_mongodb_uri
   mail_pass=your_mail_password
   mail_name=your_mail_name
   JWT_SECRET=your_jwt_secret
   ```

### Commands

- **Build:** `npm run build` (Compiles TypeScript to JavaScript)
- **Start:** `npm start` (Compiles and runs the application)
- **Development:** `npm run serve` (Runs the application using nodemon)

## Development Conventions

- **Module System:** Uses ES Modules (`type: "module"` in `package.json`).
- **TypeScript:** Configured with `NodeNext` for module resolution and strict type checking.
- **Entry Point:** `index.mts` is the main entry point of the application.
- **Error Handling:** Uncaught exceptions and unhandled rejections are logged using `chalk` and terminate the process.
