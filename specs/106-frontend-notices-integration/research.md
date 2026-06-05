# Research: Frontend Notice Boards

## Current Implementation State
- We have a robust `NotificationService` backend.
- We have existing REST endpoints for `Notification` management (get history, mark as read).
- We have existing endpoints for `Notice` management in `admin.controller`, `teacher.controller`, and `student.controller`.
- **Missing**: The frontend HTML/JS to consume these endpoints and present role-specific views.

## Role Permissions for Notice Creation

| Role | Can Target (Audience) | Target Class Requirement |
| :--- | :--- | :--- |
| **Admin** | 'all', 'teachers', 'parents', 'students' | None (Global) |
| **Teacher** | 'admins', 'students' | Must specify `targetClass` when targeting students |
| **Student** | None | N/A (Read-only) |
| **Parent** | None | N/A (Read-only) |

## UI Components Needed

### 1. Global Navigation (`UINavbar` in `ui-components.ts`)
- Needs a new Bell Icon button next to the user profile.
- Needs a dropdown container to render a list of recent notifications.
- Needs logic to fetch `/api/notifications?status=unread` on load.
- Needs logic to update count when `socket.on('notification')` fires.
- Needs logic to call `PATCH /api/notifications/:id/read` when a notification is clicked.

### 2. Role-Specific HTML Pages
- **Admin**: `public/protected/admin/notices.html` (Exists? Need to check. If yes, update it. If no, create it).
- **Teacher**: `public/protected/teacher/notices.html` (Need to verify existence/state).
- **Student**: `public/protected/student/notices.html` (Need to verify existence/state).
- **Parent**: `public/protected/parent/notices.html` (Need to verify existence/state).

## API Adjustments Needed (Backend check)
- We need to ensure the `Notice` model supports targeting 'admins'. Currently `audience` enum might not have it.
- Teacher's `createNotice` endpoint (does it exist? Need to check `teacher.controller.ts`).

## Decision Log
- **Decision**: Embed the Notification Bell directly into the `UINavbar` Custom Element.
- **Rationale**: Ensures it's available on every page without duplicating code.
- **Decision**: Create separate, dedicated HTML pages for "Notice Boards" rather than trying to build one massive dynamic page.
- **Rationale**: Keeps role-specific logic clean and avoids complex frontend routing.
