# Business Logic Layer (Controllers)

Controllers in MIFL act as the orchestrators between the API routes and the service layer. They are responsible for parsing user input, enforcing role-based logic, and triggering proactive notifications.

## 🏛 Core Responsibility

Each controller file corresponds to a user role or a specific feature domain:

- **`admin.controller.ts`**: Manages users, stats, bulk fee generation, and attendance oversight.
- **`teacher.controller.ts`**: Handles academic cycles (assignments, quizzes, materials, grading) and class-specific notices.
- **`student.controller.ts`**: Manages enrollment requests, profile updates, and quiz attempts.
- **`auth.controller.ts`**: Handles secure registration, login, and the 3-step email verification flow.
- **`notification.controller.ts`**: Manages the retrieval and "read" status of user alerts.
- **`chat.controller.ts`**: Orchestrates real-time messaging and group management.

## 🔔 Proactive Notification Triggers

A defining pattern in MIFL controllers is the use of `NotificationService.send()` at critical event points.

### Standard Trigger Pattern
```typescript
// Example: Creating an assignment
const assignment = await Assignment.create(req.body);

// 1. Instant Dashboard update
await NotificationService.broadcast({ ... });

// 2. Proactive Email Engagement (Backgrounded for performance)
setImmediate(async () => {
    await NotificationService.send({
        recipient: studentId,
        type: 'ACADEMIC',
        title: 'New Assignment',
        ...
    });
});
```

### Key Trigger Points
- **Academic:** New material upload, assignment posted, quiz available, grading completed.
- **Attendance:** Student absence (triggers email to Parent).
- **Finance:** Fee voucher generation (triggers email to Student and Parent).
- **Admin:** New enrollment request (triggers email to Admins).
- **Messaging:** New message received while user is offline.

## ⚖️ Performance Standards
- Long-running tasks (like batch email notifications to 50+ students) **MUST** be backgrounded using `setImmediate` or similar asynchronous patterns to ensure the API responds to the user in < 200ms.
