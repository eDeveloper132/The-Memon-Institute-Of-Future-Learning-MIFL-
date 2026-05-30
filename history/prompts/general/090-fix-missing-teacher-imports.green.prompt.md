---
id: 090
title: Fix Missing Imports in Teacher Routes
stage: green
date: 2026-05-30
surface: agent
model: gemini-interactive
feature: 086-enhanced-teacher-attendance
branch: main
user: moham
command: /sp.implement
labels: ["bug-fix", "import-error", "teacher-dashboard"]
links:
  spec: specs/086-enhanced-teacher-attendance/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - routes/teacher.routes.ts
tests:
 - server-start
---

## Prompt

file:///D:/MIFL/routes/teacher.routes.js:12
router.get('/courses', getTeacherCourses);
                       ^

ReferenceError: getTeacherCourses is not defined

## Response snapshot

Fixed a `ReferenceError` caused by missing imports in `routes/teacher.routes.ts`. Added `getTeacherCourses` and `getTeacherClasses` to the named import list from `teacher.controller.js`.

## Outcome

- ✅ Impact: Resolved server crash and restored access to teacher endpoints.
- 🧪 Tests: none (Critical fix for syntax/reference error)
- 📁 Files: routes/teacher.routes.ts updated.
- 🧠 Reflection: When adding new controller methods and mounting them to routes, always verify that the import block in the routes file is updated to include the new identifiers.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
