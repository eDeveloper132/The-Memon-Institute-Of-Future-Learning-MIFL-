# Services

Services contain the core business logic of the application. By isolating logic into services, we ensure that the codebase remains modular, testable, and independent of the transport layer (HTTP/Express).

## Available Services

### Mail Service (`mail.service.ts`)
A wrapper around Nodemailer for handling all outgoing communications.
- **Transporters:** Configured to use SMTP with environment-based credentials.
- **Functionality:** 
    - `sendMail`: Generic method for sending HTML/Text emails.
    - `sendWelcomeEmail`: Sent upon registration.
    - Special templates for verification links, password resets, and email change confirmations.

## Responsibility

1.  **Data Processing:** Perform complex calculations or data transformations.
2.  **Model Interaction:** Use Mongoose models to create, read, update, and delete data.
3.  **Third-Party Integration:** Handle interactions with external APIs or services (like Nodemailer).
4.  **Error Handling:** Throw meaningful errors that can be caught and handled by controllers.

## Design Philosophy

Controllers should be "thin," meaning they only handle request/response logic. Services should be "fat," containing the actual logic that makes the application function.
