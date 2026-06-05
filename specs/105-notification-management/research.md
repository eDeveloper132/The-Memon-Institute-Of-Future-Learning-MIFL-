# Research: Notification Management & Auto Role Changing

## 1. Existing Notification Systems

### Socket.io
- **Mechanism**: `req.io.emit('notification', { type, message, ... })`
- **Scattered in**: `admin.controller.ts`, `enrollment.controller.ts`, `student.controller.ts`, `teacher.controller.ts`.
- **Frontend handling**: `public/components/ui-components.ts` listens for `notification` event and shows a toast.
- **Issues**: Not persistent. If a user is offline, they miss the notification. No history.

### Email
- **Mechanism**: `mailService.sendMail(options)`
- **Scattered in**: `auth.controller.ts` (reset password, welcome mail).
- **Service**: `services/mail.service.ts` uses `nodemailer`.
- **Issues**: No record in the DB of emails sent (other than what might be in external logs).

### Chat Messages
- **Mechanism**: `Message.create(...)`
- **Usage**: Used for direct messaging and group chats.
- **Relationship**: Distinct from system notifications but shares the "message" concept.

## 2. Role Management

### Current Roles
- `admin`, `teacher`, `student`, `parent`.
- Defined in `schemas/types/user.type.ts`.

### Triggers for Role Change (Targeted)
1. **Application -> Student**: When an `EnrollmentRequest` (targetType: 'Class') is `approved`.
2. **Student -> Alumni**: (Proposed) When a student graduates or completes all courses.
3. **User -> Parent**: (Proposed) When a user is linked to a student.
4. **Guest -> Applicant**: (Proposed) When a user submits their first `EnrollmentRequest`.

## 3. Best Practices for Centralized Notifications

### Notification Model
- Fields: `recipient`, `sender` (optional), `type`, `title`, `content`, `data` (JSON), `readAt`, `expiresAt`.
- Status: `unread`, `read`, `archived`.

### Notification Service
- Method: `send(userId, notificationData)`
- Logic:
  1. Save to DB.
  2. Emit via Socket if user is online.
  3. Send Email if user preferences allow.

## 4. Automated Role Transition Engine

### Design
- Event-based listener or Hook in `User` model / `EnrollmentRequest` model.
- `RoleTransitionRule` (conceptual): `IF condition THEN change role TO X`.

### Proposed Transitions
| Event | Current Role | New Role | Condition |
|-------|--------------|----------|-----------|
| Enrollment Approved | Applicant/User | Student | `targetType: 'Class'` |
| Payment Verified | Student (inactive) | Student (active) | `Fee.status === 'paid'` |
| All Courses Passed | Student | Alumni | Custom logic |

## 5. Decision Log

- **Decision**: Create a centralized `Notification` model and `NotificationService`.
- **Rationale**: To provide persistence, history, and a unified API for all notification channels.
- **Alternatives**: Using a 3rd party service like Firebase or OneSignal. Rejected for now to minimize external dependencies and keep data in-house.
- **Decision**: Implement a `RoleService` to handle role transitions and logging.
- **Rationale**: Decouples role logic from controllers and ensures consistent auditing.
