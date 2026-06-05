# Feature Spec: Frontend Notice Board Integration

## Overview
Implement the frontend user interface for the centralized notification system. Each role (Admin, Teacher, Student, Parent) will have a distinct view and capabilities for managing and viewing notices.

## Requirements

### General
- Integrate with the existing `NotificationService` and `Notice` models.
- Display a real-time notification bell/dropdown in the `UINavbar` for all roles.
- The notification dropdown should show recent unread notifications and allow marking them as read.

### Role-Specific Notice Boards

#### 1. Admin Notice Board
- **View**: Can see all notices across the system.
- **Action**: Can create and send notices to:
  - All Teachers (`audience: 'teachers'`)
  - All Parents (`audience: 'parents'`)
  - All Users (`audience: 'all'`)
- **Action**: Can delete/manage any notice.

#### 2. Teacher Notice Board
- **View**: Can see notices directed to 'teachers' or 'all', and notices for their specific classes.
- **Action**: Can create and send notices to:
  - Their Students (filtered by class: `targetClass: <classId>`)
  - Admins (`audience: 'admins'`)
- **Action**: Can manage notices they authored.

#### 3. Student Notice Board
- **View**: Can see notices directed to 'students', 'all', or their specific `targetClass`.
- **Action**: Read-only. Cannot create or send notices.

#### 4. Parent Notice Board
- **View**: Can see notices directed to 'parents', 'all', and optionally notices targeting their children's classes.
- **Action**: Read-only. Cannot create or send notices.

## Out of Scope
- Direct one-on-one messaging (handled by the Chat feature).
- Complex rich-text editing for notices (simple text/markdown is sufficient for MVP).

## Acceptance Criteria
- [ ] Admin can create a notice targeted at Teachers, and a logged-in Teacher sees it.
- [ ] Teacher can create a notice targeted at their Class, and a logged-in Student in that class sees it.
- [ ] Student cannot see the "Create Notice" button.
- [ ] UINavbar shows an unread notification count badge.
- [ ] Clicking a notification marks it as read via the API.
