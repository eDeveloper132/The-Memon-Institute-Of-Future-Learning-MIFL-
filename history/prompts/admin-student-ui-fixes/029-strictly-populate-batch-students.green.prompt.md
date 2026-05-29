---
id: 029
title: Strictly Populate and Show Batch Students in Modal
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: admin-class-management
branch: main
user: moham
command: /sp.implement
labels: ["admin", "backend", "ui-fix", "mongoose"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - controllers/admin.controller.ts
  - public/protected/admin/classes.html
tests_yaml:
  - none
---

### PROMPT_TEXT
I want that the viewStudentsModal will show only the class batches students, I share you the exact students I share with you classSchema for reference:
[Schema Content]
I want to populate only this batchSchema students in viewstudentmodal in classes.html.

### RESPONSE_TEXT
I have updated both the backend and the frontend to strictly populate and display only the students assigned to batches within a class.

1. **Backend Update**: Modified the `getAll` controller for classes in `controllers/admin.controller.ts` to include `.populate('batches.students', 'name email')`. This ensures the API provides the full student details within the `batches` array.
2. **Frontend Update**: Refactored the `viewStudents` function in `classes.html` to leverage this populated data. The modal now iterates through each batch and displays only the students belonging to those batches.

This change ensures that the "View Students" modal is perfectly aligned with the batch-based organizational structure of each class.

### OUTCOME
The `viewStudentsModal` now strictly and accurately displays students assigned to batches using backend-populated data.
