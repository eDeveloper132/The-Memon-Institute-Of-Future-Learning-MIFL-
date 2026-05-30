---
id: 096
title: Generate Tasks for Curriculum Management
stage: tasks
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 095-teacher-curriculum-management
branch: 095-teacher-curriculum-management
user: moham
command: /sp.tasks
labels: ["task-generation", "teacher-dashboard", "curriculum"]
links:
  spec: specs/095-teacher-curriculum-management/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/095-teacher-curriculum-management/tasks.md
tests:
 - null
---

## Prompt

Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.

## Response snapshot

Generated a 17-task implementation list for the Teacher Curriculum Management feature. The tasks are organized into 6 phases, covering type definitions, model extensions, secure backend controllers with locking logic, and a major frontend refactor of `curriculum.html` to support structured roadmap entry and admin oversight.

## Outcome

- ✅ Impact: Clear roadmap for digitizing structured curriculum management.
- 🧪 Tests: none (Task generation)
- 📁 Files: specs/095-teacher-curriculum-management/tasks.md created.
- 🔁 Next prompts: /sp.implement to begin implementation of Phase 1 and 2.
- 🧠 Reflection: Dividing the UI into tabs (Course vs Class) helps maintain clarity for teachers who serve both as subject instructors and class managers.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
