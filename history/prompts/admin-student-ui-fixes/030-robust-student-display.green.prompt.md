---
id: 030
title: Robust Student Display in Classes Modal
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: admin-class-management
branch: main
user: moham
command: /sp.implement
labels: ["admin", "ui-fix", "debugging"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - controllers/admin.controller.ts
  - public/protected/admin/classes.html
---

### PROMPT_TEXT
This shown me this: 
Unknown Student
No email
but this student have its name and email

### RESPONSE_TEXT
I have fixed the issue where students were appearing as "Unknown Student" in the `viewStudentsModal`.

The problem was caused by a data mismatch between raw IDs and populated objects during the transition to the new batch system. I have implemented a two-pronged fix:

1. **Backend Robustness**: Updated the `updateClassBatches` controller to always return populated student data, ensuring consistency with the `getAll` endpoint.
2. **Frontend Robustness**: Refactored the `viewStudents` function to use a "hybrid" lookup. It now checks if the student data is already populated; if not, it automatically falls back to searching for the student in the master `allStudents` list.

This hybrid approach ensures that student names and emails are displayed correctly even if there are inconsistencies in the API response or timing issues during data updates.

### OUTCOME
Student names and emails are now correctly displayed in the `viewStudentsModal` through robust data handling.
