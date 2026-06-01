# Quickstart: Admin Dashboard Overviews

## Development Setup

1. **Role Requirement**: Ensure your user account has the `role: 'admin'`.
2. **Data Preparation**:
    - Create at least one Student with attendance and grades.
    - Create at least one Teacher with assigned classes.
    - Create at least one Parent linked to a student.
3. **Launch**:
    - Navigate to `/protected/admin/students.html`.
    - Click "View Dashboard" next to a student record.

## Verification

### 1. Student Oversight
- Verify that the page at `/protected/admin/oversight/student.html?id=[SID]` displays accurate data for the selected student.
- Ensure the header clearly shows "Currently viewing: [Student Name]".

### 2. Teacher Oversight
- Verify that the page at `/protected/admin/oversight/teacher.html?id=[TID]` displays the teacher's class schedule and pending grading count.

### 3. Parent Oversight
- Verify that the page at `/protected/admin/oversight/parent.html?id=[PID]` shows the list of their children and their academic summaries.

## Return Path
- Click the "Return to Admin Console" button in the oversight header to go back to the main management list.
