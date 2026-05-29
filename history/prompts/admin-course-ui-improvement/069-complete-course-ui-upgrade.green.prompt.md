---
id: 069
title: Complete Course UI Upgrade
stage: green
date_iso: 2026-05-30
surface: agent
model: gemini-2.0-flash
feature: admin-course-management
branch: 067-courses-ui-upgrade
user: moham
command: /sp.implement
labels: ["admin", "courses", "ui-overhaul", "batches"]
links:
  spec: "specs/067-courses-ui-upgrade/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - schemas/types/course.type.ts
  - schemas/models/course.model.ts
  - controllers/admin.controller.ts
  - routes/admin.routes.ts
  - public/protected/admin/courses.html
tests_yaml:
  - none
---

### PROMPT_TEXT
/sp.implement [Course UI Upgrade]

### RESPONSE_TEXT
I have successfully upgraded the `courses.html` interface to match the functionality and UI features of `classes.html`.

Key Implementation Details:
1.  **Backend Enhancements**:
    - Updated `Course` model and type definitions to support embedded `batches`.
    - Implemented a new `updateCourseBatches` controller and mounted the `PATCH /api/admin/coursebatches/:id` route.
    - Updated the `getAll` courses endpoint to populate batch student data.
2.  **Frontend Overhaul**:
    - Replaced the course table with a responsive **Card Grid** view.
    - Implemented the **Manage Batches** modal, allowing admins to organize students within each course.
    - Implemented the **View Students** modal, displaying enrolled students grouped by their assigned batches.
    - Integrated the **Quick Assign** workflow for efficient student enrollment from the unassigned list.
3.  **Visual Consistency**: Maintained parity with the design system used in classes management, including icons, button styles, and responsive layout adjustments.

### OUTCOME
Course management now features a modern grid UI and a robust batch management system, identical to the class management module.
