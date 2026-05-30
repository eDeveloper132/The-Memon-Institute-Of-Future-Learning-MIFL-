---
id: 091
title: Plan Targeted Assignments Feature
stage: plan
date: 2026-05-30
surface: agent
model: gemini-interactive
feature: 091-targeted-assignments
branch: main
user: moham
command: /sp.plan
labels: ["teacher-dashboard", "assignments", "batch-targeting", "planning"]
links:
  spec: specs/091-targeted-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/091-targeted-assignments/spec.md
 - specs/091-targeted-assignments/plan.md
 - specs/091-targeted-assignments/research.md
 - specs/091-targeted-assignments/data-model.md
 - specs/091-targeted-assignments/contracts/api.md
 - specs/091-targeted-assignments/quickstart.md
tests:
 - null
---

## Prompt

make a comprehensive plan to manage assignments in assignments.html to specific class students and specific course batches students.

## Response snapshot

Created a comprehensive implementation plan to transform assignment management. The plan introduces granular targeting (Class vs. Course Batch), updates the Assignment schema to support batch IDs, and refactors the "New Assignment" UI to mirror the robust selection flow used in attendance.

## Outcome

- ✅ Impact: Strategic roadmap for targeted academic delivery.
- 🧪 Tests: none (Planning phase)
- 📁 Files: 6 specification and design files created.
- 🧠 Reflection: Leveraging the UI patterns established in the enhanced attendance feature ensures consistency and reduces cognitive load for teachers.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): /sp.tasks to break down implementation.
