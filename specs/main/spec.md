# Specification: Dynamic Notification Center for Dashboards

## Background
The current dashboards (especially the Admin dashboard) contain hard-coded notification items that do not reflect the actual state of the system. We have already implemented a centralized notification system (`NotificationService` and `Notification` model), but it is primarily used for the navbar bell. We need to expose these notifications directly on the dashboard pages and make them dynamic.

## User Stories
- **As an Admin**, I want to see real-time system-wide notifications (e.g., pending fees, new registrations) on my dashboard so I can take immediate action.
- **As a Teacher**, I want to see notifications relevant to my classes or faculty updates on my dashboard.
- **As a Student/Parent**, I want to see a unified view of important announcements and personal notifications on my main dashboard.

## Requirements

### Functional
- Replace hard-coded notification blocks in `admin/index.html` with a dynamic list fetched from the API.
- Implement similar dynamic notification sections for Teacher, Student, and Parent dashboards if they don't already have one or if they are currently static.
- Use the existing `Notification` model and `NotificationService`.
- Support real-time updates via Socket.IO for these dashboard sections.
- Display different types of notifications with appropriate icons and colors (e.g., warnings for fees, info for registrations).

### Technical
- API endpoint: Use or extend `/api/notifications`.
- Frontend: Refactor HTML dashboards to include a target container for notifications.
- Frontend: Add JavaScript to fetch and render notifications on page load.
- Frontend: Listen for `newNotification` events to update the dashboard list in real-time.

## Acceptance Criteria
- [ ] Admin dashboard "System Notifications" section is populated from the database.
- [ ] Teacher dashboard includes a "Recent Notifications" section.
- [ ] Notifications disappear or move to "read" state when interacted with (if applicable).
- [ ] Real-time notifications appear on the dashboard without page refresh.
- [ ] No hard-coded placeholder notifications remain in any dashboard HTML.
