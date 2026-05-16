# Public Assets

This directory contains the static frontend assets for the application, including HTML prototypes and client-side scripts. The frontend is built using **Native Web Components** and styled with **Tailwind CSS**.

## Structure

- `auth/`: HTML pages for authentication workflows.
    - `login.html`, `signup.html`, `forgotPassword.html`, etc.
- `protected/`: Pages accessible only to authenticated users (Dashboard, etc.).
- `components/`: Client-side TypeScript components.
    - `auth-components.ts`: UI elements specific to authentication.
    - `ui-components.ts`: General-purpose UI components (Navbar, Cards, Toasts).

## Tech Stack

- **HTML5:** Semantic structure.
- **Tailwind CSS:** Utility-first styling (loaded via CDN or compiled).
- **TypeScript:** Compiled to modern JavaScript for component logic.
- **Web Components:** Reusable, encapsulated UI elements (e.g., `<ui-navbar>`, `<ui-card>`).

## Usage

The Express server serves these files statically. Protected routes are guarded by the `authenticate` middleware, which redirects unauthenticated users to the login page.
