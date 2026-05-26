# Quickstart: Admin Course UI Improvement

## Verification Steps

### 1. Backend Verification
1. Call `GET /api/admin/departments`.
2. Verify it returns a list of departments (create one manually in DB if empty).

### 2. Frontend Verification
1. Visit `courses.html`.
2. Click "Add Course".
3. Verify that the "Department" field is a dropdown.
4. Verify that the dropdown contains the names of departments fetched from the API.
5. Select a department and save a course.
6. Verify the course appears in the table with the correct department name.
