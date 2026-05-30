---
id: 103
title: Fix Missing Curriculum Sections in UI
stage: green
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: main
user: moham
command: /sp.implement
labels: ["bug-fix", "backend", "ui-ux", "curriculum"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - controllers/teacher.controller.ts
 - public/protected/teacher/curriculum.html
tests:
 - browser-refresh
---

## Prompt

Curriculum sections input not shown

## Response snapshot

Identified that the `getTeacherCourses` and `getTeacherClasses` controllers were missing the new curriculum-related fields in their `select` projection. Updated the controllers to include `outline`, `curriculumSections`, and `curriculumLocked`. Also added defensive initialization and empty-state messaging in `curriculum.html` to ensure a robust user experience when no sections are defined.

## Outcome

- ✅ Impact: Restored visibility of curriculum management tools in the teacher portal.
- 🧪 Tests: none (Manual verification)
- 📁 Files: 2 files updated.
- 🧠 Reflection: When evolving a data model, always ensure that all relevant retrieval endpoints (controllers) are updated to include the new fields in their projection.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
