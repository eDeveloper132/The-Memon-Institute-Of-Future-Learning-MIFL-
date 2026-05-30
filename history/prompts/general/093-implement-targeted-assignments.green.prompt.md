---
id: 093
title: Implement Targeted Assignments Feature
stage: green
date: 2026-05-30
surface: agent
model: gemini-interactive
feature: 091-targeted-assignments
branch: 091-targeted-assignments
user: moham
command: /sp.implement
labels: ["teacher-dashboard", "assignments", "batch-targeting", "implementation"]
links:
  spec: specs/091-targeted-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - schemas/types/assignment.type.ts
 - schemas/models/assignment.model.ts
 - controllers/teacher.controller.ts
 - public/protected/teacher/assignments.html
 - specs/091-targeted-assignments/tasks.md
tests:
 - browser-refresh
---

## Prompt

Execute the implementation plan by processing and executing all tasks defined in tasks.md

## Response snapshot

Implemented granular targeting for assignments, allowing teachers to post work to either a full Class or a specific Course Batch. Updated the Assignment schema and creation controller to handle the new `batch` field and optional `class` logic. Refactored the "New Assignment" modal in the frontend to include a dynamic mode toggle and reactive dropdowns. Ensured assignment cards in the dashboard clearly display their specific targeting information.

## Outcome

- ✅ Impact: Precision academic delivery enabled for teachers with multi-cohort courses.
- 🧪 Tests: none (Manual verification)
- 📁 Files: 4 source files updated, tasks.md finalized.
- 🧠 Reflection: Reusing targeting logic from the attendance module ensured a fast and consistent implementation.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
