# MIFL - Educational Management System (v1.2.0)

MIFL is a high-performance, real-time Educational Management System built with **Node.js (Express 5)**, **TypeScript**, and **MongoDB**. It provides a centralized platform for students, teachers, parents, and admins to manage academic lifecycles, financial records, and real-time communications.

## 🚀 Proactive Engagement Features

MIFL is designed to be a "Proactive" system, moving beyond passive data entry to active user engagement:

-   **Real-time Notification Center:** Dynamic dashboard feeds that update instantly via **Socket.IO** for all user roles.
-   **Comprehensive Email System:** Automated, branded HTML email alerts for assignments, grading, absences, fee vouchers, and offline messages.
-   **Live Notice Board:** Role-targeted announcements with category filtering, search, and pinned updates.
-   **Smart Messaging:** Multi-channel chat (Socket.IO + Email fallback) for students, teachers, and parents.

## 🛠 Modern Technical Stack

-   **Backend:** Express 5 (ES Modules), TypeScript (Strict Mode).
-   **Database:** MongoDB with Mongoose (Optimized indexing for real-time lookups).
-   **Real-time:** Socket.IO for instant dashboard and chat updates.
-   **Email:** Nodemailer with centralized, professional HTML templates.
-   **Frontend:** Custom modular **Web Components** with strict **CSP** (no inline scripts).
-   **Security:** Helmet headers, NoSQL Injection protection, and role-based rate limiting.

## 🏗 Project Architecture

```text
D:\MIFL\
├── config\           # Database connection and infrastructure setup
├── controllers\      # Business logic and notification trigger points
├── middlewares\      # Auth, role-based security, and targeted rate limiting
├── public\           # Modular Web Components and CSP-compliant UI
├── routes\           # Standardized REST API surface
├── schemas\          # Data layer: Models (Mongoose) and Strict Types
├── services\         # Shared libraries: Notification, Mail, and Role logic
├── index.ts          # Server entry point and global middleware
└── tsconfig.json     # Strict TypeScript configuration
```

## ⚖️ Quality Assurance (MANDATORY)

MIFL operates under a strict **Constitution (v1.2.0)**. The following rule is non-negotiable for all contributors:

> **Principle III: Mandatory Verification Gate**
> After any implementation task, `npx tsc` MUST be executed. Changes cannot be committed or pushed to `main` if any type errors exist.

## ⚡️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18.0.0)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1.  **Clone & Install:**
    ```bash
    git clone <repository-url>
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file with:
    - `PORT`, `MONGODB_URI`, `JWT_SECRET`
    - `mail_name`, `mail_pass` (Nodemailer credentials)
    - `SANITY_PROJECT_ID`, `SANITY_API_TOKEN` (for chat attachments)

### Available Scripts

-   `npm run build`: Compiles project to JavaScript.
-   `npm run serve`: Starts development server with nodemon.
-   **`npx tsc`**: Runs the **Mandatory Verification Gate**.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
