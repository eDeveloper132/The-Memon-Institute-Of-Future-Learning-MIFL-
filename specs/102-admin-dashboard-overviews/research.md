# Research: Admin Dashboard Overviews

## Findings

### 1. Existing role dashboards
- **Student Dashboard**: Uses `/api/student/profile`, `/api/student/attendance`, `/api/student/results`, etc.
- **Teacher Dashboard**: Uses `/api/teacher/stats`, `/api/teacher/classes`, etc.
- **Parent Dashboard**: Uses `/api/parent/children`, etc.

### 2. Data Fetching Strategy
- Most existing role-specific controllers strictly use `req.user.id`.
- Decision: Implement aggregated oversight endpoints in `admin.controller.ts` that take a `targetUserId` and return a consolidated JSON object mirroring the user's dashboard data.
- Rationale: Reduces the number of network requests from the Admin oversight pages and simplifies authorization logic (only one Admin-protected endpoint per role overview).

### 3. UI/UX Consistency
- The project uses custom web components like `ui-navbar` and `ui-card`.
- Decision: Use the same components in the Admin oversight views but wrap them in an "Admin Oversight Header" that indicates which user is being viewed and provides a "Return to Admin" button.

### 4. Implementation Logic
- **Student Oversight**: Needs to aggregate attendance, fees, assignments, and grades.
- **Teacher Oversight**: Needs to aggregate classes, pending grading, and department info.
- **Parent Oversight**: Needs to aggregate linked children and their respective status summaries.

## Decisions
- **Decision**: Create `/api/admin/oversight/:role/:id` endpoints.
- **Rationale**: Centralizes administrative proxy logic and ensures consistent authorization.
- **Decision**: Use a dedicated `oversight/` directory for HTML templates.
- **Rationale**: Separates primary admin management views from "view-as" proxy views.
