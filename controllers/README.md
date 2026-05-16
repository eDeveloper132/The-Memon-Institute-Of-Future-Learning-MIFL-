# Controllers

Controllers act as the bridge between the API routes and the business logic (services). They are responsible for handling incoming HTTP requests, validating inputs, and returning the appropriate HTTP responses.

## Current Controllers

### Auth Controller (`auth.controller.ts`)
Handles all authentication-related logic, including:
- **Registration (Signup):** Creates new users and sends verification emails.
- **Login:** Authenticates users and sets JWT cookies.
- **Logout:** Clears authentication cookies.
- **Password Management:** Forgot and Reset password workflows.
- **Email Verification:** Verifies new accounts via tokenized links.
- **3-Step Double Verification Email Change:**
    1. Confirm intent via current email.
    2. Verify access to new email.
    3. Finalize swap in database.

## Design Patterns

- **Separation of Concerns:** Controllers do not contain complex business logic; they delegate to services (like `mailService`) or interact directly with models for simple CRUD.
- **Request Validation:** Controllers ensure that the incoming request body, parameters, and queries are correctly formatted before processing.
- **Response Consistency:** All controllers follow a standard response format for success and error cases.
