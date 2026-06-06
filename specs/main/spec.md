# Specification: Comprehensive Email Notification System

## Background
MIFL currently has a `NotificationService` that supports in-app, socket, and email channels. However, email notifications are only triggered in a few places (like role transitions). To make the system more engaging and professional, we need to systematically integrate email notifications into all critical user journeys.

## User Stories
- **As a Student**, I want to receive an email when a new assignment is posted, when a quiz is available, or when my fee voucher is generated.
- **As a Parent**, I want to receive an email when my child is marked absent, when their results are published, or when a fee is due.
- **As a Teacher**, I want to receive an email when a student submits an assignment or when a new class is assigned to me.
- **As an Admin**, I want to receive an email for new enrollment requests or high-priority system alerts.

## Requirements

### Functional
- **Triggers**: Integrate `NotificationService.send()` into the following events:
  - **Auth**: Signup (welcome), Password Reset, Email Change. (Already exists but verify templates).
  - **Academic**: New Assignment, Assignment Graded, New Material, New Quiz, Exam Schedule.
  - **Attendance**: Absence alerts (to parents).
  - **Finance**: Fee voucher generated, Payment confirmed.
  - **Admin**: New Enrollment Request.
  - **Messaging**: New message notification (when user is offline).
- **Preferences**: Respect `user.notificationPrefs.email` (already implemented in `NotificationService`, but ensure data is consistent).
- **Templates**: Use meaningful HTML templates for different types of emails.

### Technical
- **Centralization**: All email sending must flow through `NotificationService.send()`.
- **Async Execution**: Ensure notification sending doesn't block API responses (use `await` but consider if some should be backgrounded or if the performance is acceptable).
- **Templates**: Centralize templates in `services/emailTemplates.ts`.

## Acceptance Criteria
- [ ] Email notifications are sent for all events listed in the Requirements.
- [ ] Emails contain relevant data (titles, names, links).
- [ ] User can opt-out of emails via their profile settings.
- [ ] No duplicate emails for the same event.
