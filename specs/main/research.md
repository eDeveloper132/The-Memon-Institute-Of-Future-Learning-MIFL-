# Research: Student Curriculum Visibility Issue

## Root Cause Analysis

**Decision**: The root cause of students not being able to see their curriculum is a permissions mismatch on the frontend.
**Rationale**: In `public/protected/student/curriculum.html`, the `loadData()` function attempts to fetch all courses and classes using the admin endpoints `/api/admin/courses` and `/api/admin/classes`. Because these endpoints are protected by the `authorize('admin')` middleware, requests from students return a 403 Forbidden error, preventing the curriculum data from ever loading.
**Alternatives considered**: 
- Removing the admin authorization middleware from the admin endpoints. This is highly insecure and rejected.
- Creating a new dedicated endpoint for students to fetch their specific roadmaps (courses they are enrolled in, and their assigned class). This is the correct, secure, and performant approach.

## Implementation Details

**Decision**: Create a new API endpoint `GET /api/student/roadmaps` (or similar) that aggregates and returns the curriculum data specifically permitted for the logged-in student.
**Rationale**: Instead of making the frontend download all courses and manually filter them (which is slow and insecure), the backend should cleanly provide exactly what the student is enrolled in, populated with the necessary `curriculumSections` and `classCurriculumSections`.
