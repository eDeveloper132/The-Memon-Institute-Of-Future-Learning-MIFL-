# Data Model: Admin Dashboard Overviews

This feature primarily aggregates data from existing entities.

## Entities

### Oversight Log (New / Optional for MVP)
- **admin**: Reference to `User` (role='admin').
- **targetUser**: Reference to `User` (the overseen user).
- **viewedAt**: Timestamp.
- **roleContext**: String ('student', 'teacher', or 'parent').
- **actionsPerformed**: List of strings (e.g., 'viewed_dashboard', 'marked_attendance').

## Relationships

- **Admin Oversight**: One Admin can oversee multiple Students, Teachers, and Parents.
- **Proxy Context**: The Admin session remains active, but data fetching is scoped to the target user.
