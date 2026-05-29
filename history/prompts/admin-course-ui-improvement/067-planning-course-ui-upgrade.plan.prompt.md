---
id: 067
title: Plan Course UI Upgrade
stage: plan
date_iso: 2026-05-30
surface: agent
model: gemini-2.0-flash
feature: admin-course-management
branch: 067-courses-ui-upgrade
user: moham
command: /sp.plan
labels: ["admin", "courses", "ui-ux", "planning"]
links:
  spec: "specs/067-courses-ui-upgrade/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - specs/067-courses-ui-upgrade/spec.md
  - specs/067-courses-ui-upgrade/plan.md
  - specs/067-courses-ui-upgrade/research.md
  - specs/067-courses-ui-upgrade/data-model.md
  - specs/067-courses-ui-upgrade/quickstart.md
  - specs/067-courses-ui-upgrade/contracts/courses-api.md
tests_yaml:
  - none
---

### PROMPT_TEXT
/sp.plan make same functionalities and UI features for courses.html from classes.html.

### RESPONSE_TEXT
I have completed the implementation planning to upgrade `courses.html` to mirror the advanced UI and functional features of `classes.html`.

Key highlights of the plan:
1.  **Card Grid View**: Transitioning from a table to a responsive card grid for courses.
2.  **Batch Management System**: Adding support for course batches to organize student enrollments.
3.  **Advanced Modals**: Replicating the "View Students" (grouped by batch), "Manage Batches", and "Quick Assign" modals.
4.  **Backend Enhancements**: Updating the `Course` model and creating a new `/api/admin/coursebatches/:id` endpoint.

Generated artifacts:
- `specs/067-courses-ui-upgrade/spec.md`: User stories and acceptance criteria.
- `specs/067-courses-ui-upgrade/plan.md`: Technical context and source structure.
- `specs/067-courses-ui-upgrade/research.md`: Decisions on batch schema unification and grid layout.
- `specs/067-courses-ui-upgrade/data-model.md`: Updated `Course` entity with batches.
- `specs/067-courses-ui-upgrade/quickstart.md`: Implementation guide.
- `specs/067-courses-ui-upgrade/contracts/courses-api.md`: API definitions for batches.

### OUTCOME
Planning phase completed. Ready for task generation.
