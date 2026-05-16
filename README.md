# MIFL - Educational Management System Backend

MIFL is a robust, scalable backend application for an Educational Management System, built with Node.js (Express 5), TypeScript, and MongoDB. It provides a foundation for managing users (students, teachers, parents, admins), courses, classes, attendance, exams, and fees.

## Key Features

- **Modern Stack:** Built with Express 5 and Node.js 18+.
- **Type Safety:** Fully written in TypeScript with strict type checking.
- **Database:** MongoDB integration using Mongoose with comprehensive schemas and models.
- **Advanced Authentication:** 
    - JWT-based session management using cookies.
    - Secure password hashing with Bcrypt.
    - Robust 3-Step Double Verification for email changes.
    - Email verification workflow for new registrations.
- **Security:** 
    - Security headers with Helmet.
    - NoSQL Injection protection.
    - HTTP Parameter Pollution (HPP) protection.
    - Rate limiting to prevent brute force and DoS attacks.
- **Real-time:** Socket.io integration ready for real-time notifications.
- **Emailing:** Automated email delivery using Nodemailer with HTML templates.
- **ES Modules:** Modern JavaScript module system throughout the project.

## Project Structure

```text
D:\MIFL\
├── config\           # Application configuration (DB connection, etc.)
├── controllers\      # Request handlers (Auth, etc.)
├── middlewares\      # Express middlewares (Auth, Security, Rate Limiter)
├── public\           # Static assets and frontend prototypes (Web Components)
├── routes\           # API route definitions
├── schemas\          # Data layer (Mongoose models and types)
│   ├── models\       # Mongoose models (User, Class, Course, etc.)
│   └── types\        # Data-related TypeScript interfaces
├── services\         # Business logic layer (Mail Service, etc.)
├── types\            # Global TypeScript type definitions
├── index.ts          # Application entry point
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18.0.0)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd MIFL
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Copy the `.env.example` file to `.env` and fill in your credentials:
    ```bash
    cp .env.example .env
    ```
    Required variables:
    - `PORT`: Server port (default: 2500)
    - `MONGODB_URI`: Your MongoDB connection string
    - `mail_name`: Nodemailer service email
    - `mail_pass`: Nodemailer service password (or app password)
    - `JWT_SECRET`: Secret key for JWT signing

### Available Scripts

-   `npm run build`: Compiles TypeScript to JavaScript.
-   `npm start`: Compiles the project and starts the server.
-   `npm run serve`: Starts the server in development mode using `nodemon`.

## Documentation

For more detailed information on specific modules, refer to the README files in their respective directories:

- [Config](./config/README.md)
- [Controllers](./controllers/README.md)
- [Middlewares](./middlewares/README.md)
- [Routes](./routes/README.md)
- [Schemas](./schemas/README.md)
- [Services](./services/README.md)
- [Types](./types/README.md)

## License

This project is licensed under the [MIT License](./LICENSE).
