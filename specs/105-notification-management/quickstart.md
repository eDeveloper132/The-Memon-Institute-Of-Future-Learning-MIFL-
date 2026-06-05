# Quickstart: Notification Management System

## Overview
This feature centralizes all notification logic into a single `NotificationService` and introduces persistent in-app notifications with history. It also automates role transitions based on key events.

## For Developers

### Sending a Notification
Instead of `req.io.emit` or `mailService.sendMail`, use the new `NotificationService`:

```typescript
import { NotificationService } from '../services/notification.service';

await NotificationService.send({
    recipient: userId,
    type: 'ENROLLMENT',
    title: 'Application Approved',
    content: 'Your application for Class X has been approved.',
    data: { targetId: '...' },
    priority: 'high'
});
```

The service will automatically:
1. Save the notification to the DB.
2. Emit via Socket.io (if user online).
3. Send Email (if user preference is ON).

### Triggering a Role Change
Use the `RoleService`:

```typescript
import { RoleService } from '../services/role.service';

await RoleService.transition({
    userId,
    newRole: 'student',
    trigger: 'ENROLLMENT_APPROVAL',
    reason: 'Approved by Admin',
    changedBy: adminId
});
```

This will:
1. Update the `User` role.
2. Log the change in `RoleChangeLog`.
3. Send a notification to the user.

## For Frontend

### Listening for Real-time Notifications
The existing `notification` socket event remains the same, but the payload is now standardized.

### Fetching History
Use `GET /api/notifications` to populate a notification bell or center.

### Marking as Read
Use `PATCH /api/notifications/:id/read` when a user clicks a notification.
