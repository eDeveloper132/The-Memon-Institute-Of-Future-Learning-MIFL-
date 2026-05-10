# Controllers

Controllers act as the bridge between the API routes and the business logic (services). They are responsible for handling incoming HTTP requests, validating inputs, and returning the appropriate HTTP responses.

## Current Controllers

### Auth Controller (`auth.controller.mts`)
Handles all authentication-related logic, including:
- User registration (Signup).
- User login and JWT generation.
- Password management (Forgot/Reset password).
- Email verification and updates.

## Design Patterns

- **Separation of Concerns:** Controllers do not contain business logic; they delegate to services.
- **Request Validation:** Controllers ensure that the incoming request body, parameters, and queries are correctly formatted before processing.
- **Response Consistency:** All controllers follow a standard response format for success and error cases.
