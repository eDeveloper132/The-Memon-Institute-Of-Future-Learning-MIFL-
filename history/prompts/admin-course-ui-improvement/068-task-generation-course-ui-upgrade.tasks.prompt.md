---
id: 068
title: Task Generation for Course UI Upgrade
stage: tasks
date_iso: 2026-05-30
surface: agent
model: gemini-2.0-flash
feature: admin-course-management
branch: 067-courses-ui-upgrade
user: moham
command: /sp.tasks
labels: ["admin", "courses", "tasks", "implementation"]
links:
  spec: "specs/067-courses-ui-upgrade/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - specs/067-courses-ui-upgrade/tasks.md
tests_yaml:
  - none
---

### PROMPT_TEXT
/sp.tasks

### RESPONSE_TEXT
I have generated the implementation tasks for the **Course Management UI Overhaul** feature.

Task Summary:
- **Total Task Count**: 22
- **Phase 1 (Setup)**: 6 tasks to update the schema and add backend support for course batches.
- **Phase 2 (Scaffolding)**: 3 tasks to transition `courses.html` to a card-based grid layout.
- **Phase 3 (Grouped View)**: 3 tasks to implement the "View Students" modal with batch grouping.
- **Phase 4 (Batch Management)**: 4 tasks to enable adding and deleting batches within courses.
- **Phase 5 (Quick Assign)**: 3 tasks to implement the student quick-assignment workflow.
- **Phase 6 (Polish)**: 3 tasks for responsive audits and design consistency.

The tasks are ordered to ensure the backend is ready before the frontend wires up the modals. The plan prioritizes a card grid and grouped view as the MVP to establish the new data flow.

### OUTCOME
`tasks.md` generated successfully. Implementation is ready to proceed.
