# Quickstart: Dynamic Notifications

## Setup
1. Ensure the backend is running: `npm run start` or `npm run serve`.
2. Login as an Admin or Teacher.
3. Open the main Dashboard (`/protected/admin/index.html` or `/protected/teacher/index.html`).

## Testing Dynamic Feed
1. Use a tool like Postman or a temporary script to create a notification for the logged-in user.
2. Observe if the notification appears in the dashboard section (e.g., "System Notifications").
3. Trigger a `newNotification` socket event and verify real-time injection.

## Verification
- [ ] No hard-coded text like "12 students have pending fee payments" is visible in the HTML source.
- [ ] The dashboard shows "No notifications" if the list is empty.
- [ ] Clicking a notification (if implemented) marks it as read and potentially removes it from the "unread" dashboard view.
