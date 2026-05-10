# Services

Services contain the core business logic of the application.

## Available Services

### Mail Service (`mail.service.mts`)
- Handles email delivery using Nodemailer.
- Configured via `mail_name` and `mail_pass` environment variables.
- Supports plain text and HTML emails.
- Includes pre-built templates for common tasks (e.g., Welcome Emails).

## Responsibility

- Perform database operations via models.
- Implement complex business rules.
- Maintain a clean separation between HTTP handling (controllers) and data logic.
