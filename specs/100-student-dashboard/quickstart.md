# Quickstart: Student Dashboard

## Development Setup

1. **Environment**: Ensure `.env` is configured with a valid `MONGODB_URI`.
2. **Server**: Run `npm run dev` to start the backend server.
3. **Login**: Navigate to `/auth/login.html` and log in as a student.
4. **Access Dashboard**: Navigate to `/protected/student/index.html`.

## Testing & Validation

### 1. Dashboard Summary
- Verify cards for Attendance, Fees, and Assignments show correct numbers.
- **Manual Refresh**: Click the refresh icon on the dashboard. Verify that summary stats update in under 1 second without a page reload.

### 2. Assignment Overwriting
- Submit an assignment file.
- Submit a **different** file for the same assignment.
- Verify in the database (or via API) that the second submission has **overwritten** the first.

### 3. Quiz Single Attempt
- Complete a quiz attempt.
- Try to navigate back to the quiz or submit another attempt.
- Verify the system blocks the second attempt with an appropriate message.

### 4. Notice Prioritization
- Create a new notice (unpinned).
- Create a pinned notice (older or newer).
- Verify the **pinned notice** appears at the top of the dashboard feed.

### 5. Grading Display
- Check that assignments and exams display numeric scores (e.g., 85/100) alongside their derived letter grades (e.g., A).
