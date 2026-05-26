# Feature Spec: Admin Course UI Improvement

## Overview
Improve the course management interface by replacing the manual "Department ID" text input with a dynamic dropdown list of actual departments.

## Goals
- Simplify course registration for administrators.
- Reduce data entry errors by using a predefined list of departments.
- Ensure the "Register New Course" modal is intuitive and fully functional.

## Functional Requirements
- **Backend:**
  - Implement a `GET /api/admin/departments` endpoint to fetch all available departments.
- **Frontend:**
  - Update `courses.html` to fetch departments on initialization.
  - Replace the `<input type="text" name="department">` with a `<select name="department">` in the "Register New Course" modal.
  - Dynamically populate the select options with department names and IDs.

## Acceptance Criteria
- [ ] Admin can see a list of departments in the "Department" dropdown when registering a new course.
- [ ] Selecting a department and saving the course correctly links the course to that department ID.
- [ ] The dropdown is populated from the actual `Department` collection in the database.
