---
id: 105
title: Fix Curriculum ValidationError and Refactor Data Collection
stage: green
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: main
user: moham
command: /sp.implement
labels: ["bug-fix", "validation", "ui-ux", "curriculum"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/teacher/curriculum.html
tests:
 - manual-validation-check
---

## Prompt

curriculum.html:396 
 PATCH http://localhost:2000/api/teacher/courses/6a15e3d…/curriculum 500 (Internal Server Error)
...
[Teacher Controller] updateCourseCurriculum error: ValidationError: Course validation failed: curriculumSections.0.modules.0.title: Path `title` is required.

## Response snapshot

Identified that the 500 Internal Server Error was caused by a Mongoose `ValidationError` when the frontend sent modules with empty titles. Refactored the data collection logic in `curriculum.html` to scrape the DOM directly before saving, and added strict frontend validation to ensure all sections and modules have titles. This prevents invalid data from reaching the server and provides immediate feedback to the teacher.

## Outcome

- ✅ Impact: Resolved a critical server crash and improved data integrity.
- 🧪 Tests: none (Manual validation verified)
- 📁 Files: public/protected/teacher/curriculum.html updated.
- 🧠 Reflection: Scaping the DOM directly for complex, nested forms is often more robust than managing a mirrored state object in Vanilla JS, as it ensures the "Source of Truth" is always what the user sees on screen.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
