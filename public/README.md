# Public Assets

This directory contains the static frontend assets for the application, including HTML prototypes and client-side scripts. These files serve as a visual representation and prototype for the Educational Management System's user interface.

## Structure

- `auth/`: HTML pages for authentication workflows.
    - `login.html`: User login page.
    - `signup.html`: User registration page.
    - `forgotPassword.html`: Initial step for password recovery.
    - `recoveryPass.html`: Form to enter a new password.
    - `changeEmailRequest.html`: Request to update user email.
    - `resetEmail.html`: Confirm email reset.
    - `success.html`: Generic success feedback page.
- `protected/`: Pages accessible only to authenticated users.
    - `index.html`: The main dashboard prototype.
- `components/`: Client-side TypeScript/JavaScript components for UI consistency.
    - `auth-components.ts`: UI elements specific to authentication pages.
    - `ui-components.ts`: General-purpose UI components.

## Usage

The Express server is configured to serve these files statically from the root path (`/`). For example, accessing `http://localhost:2500/auth/login.html` will serve the login page.

## Prototype Status

These files are currently prototypes intended to demonstrate functionality and design. In a production environment, they would typically be replaced or supplemented by a modern frontend framework (like React or Angular).
