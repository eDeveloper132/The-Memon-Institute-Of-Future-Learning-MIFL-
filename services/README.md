# Shared Service Layer (Libraries)

The service layer contains standalone libraries and business logic utilities that are reused across multiple controllers. Following **Principle IV (Library-First)**, all complex logic must reside here.

## 🚀 Key Services

### `NotificationService.ts`
The proactive engagement engine of MIFL.
- **Channels:** Database (in-app), Socket.IO (real-time), and Email (Nodemailer).
- **Templates:** Uses professional HTML layouts defined in `emailTemplates.ts`.
- **Preference Aware:** Respects user `notificationPrefs` (opt-in/out).

### `MailService.ts`
A thin wrapper around **Nodemailer** for standardizing SMTP delivery.
- Handles connection pooling and secure credential injection.

### `RoleService.ts`
Manages role transition logic and logging.
- Automatically records `RoleChangeLog` entries when user permissions are updated.

### `Grading.service.ts`
Contains algorithmic logic for calculating GPA and performance metrics.

## 🧱 Design Guidelines

- **Stateless:** Services should not store internal request state; they should receive all necessary data via parameters.
- **Independently Testable:** Each service in this directory has a corresponding `.test.ts` file in the root `tests/` folder.
- **Async First:** Almost all service methods return `Promise<T>` to ensure non-blocking I/O.
