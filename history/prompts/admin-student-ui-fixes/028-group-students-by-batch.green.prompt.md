---
id: 028
title: Group Students by Batch in viewStudentsModal
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: admin-class-management
branch: main
user: moham
command: /sp.implement
labels: ["admin", "ui-fix", "classes"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - public/protected/admin/classes.html
tests_yaml:
  - none
---

### PROMPT_TEXT
In classes.html, the viewStudentsModal will show only its assigned baches students not every students.

### RESPONSE_TEXT
I have updated `viewStudentsModal` in `classes.html` to display students grouped by their assigned batches. 

Previously, the modal would fetch all students assigned to the class and list them flatly. Now, it iterates through the `batches` array of the class object and displays each batch with its associated students. This ensures that only students who are actually assigned to a batch are shown, and they are shown in their respective batch context.

Key changes:
- Refactored `viewStudents` to use the batch data from the class object.
- Added a visual separator for each batch.
- Added a count of students per batch.

### OUTCOME
`viewStudentsModal` now correctly displays students grouped by their batches.
