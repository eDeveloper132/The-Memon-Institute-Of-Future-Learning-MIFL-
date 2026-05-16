# Configuration

This directory contains configuration files and setup logic for the application's infrastructure and external services.

## Core Configurations

### Database Connection (`db.ts`)
- **Technology:** Mongoose (MongoDB).
- **Functionality:** Exports a `connectDB` function that initializes the connection to the MongoDB instance using the `MONGODB_URI` environment variable.
- **Error Handling:** Includes retry logic and logs connection status using `chalk`.

## Environment Management

The application uses `dotenv` to manage configuration via environment variables. Key variables used across the project include:
- `PORT`: The port the Express server listens on.
- `MONGODB_URI`: Connection string for the database.
- `JWT_SECRET`: Secret used for signing authentication tokens.
- `mail_name` & `mail_pass`: Credentials for the email service.

## Best Practices

- **Never Commit Secrets:** Sensitive values should only exist in the `.env` file (which is ignored by Git).
- **Default Values:** Provide sensible defaults where appropriate to ensure the application can start with minimal configuration.
- **Type Safety:** Use TypeScript to define the structure of configuration objects.
