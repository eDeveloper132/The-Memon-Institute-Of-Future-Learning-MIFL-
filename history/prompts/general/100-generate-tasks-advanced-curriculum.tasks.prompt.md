---
id: 100
title: Generate Actionable Tasks for Advanced Curriculum
stage: tasks
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: 099-advanced-curriculum
user: moham
command: /sp.tasks
labels: ["task-generation", "teacher-dashboard", "curriculum"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/099-advanced-curriculum/tasks.md
tests:
 - none
---

## Prompt

Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.

## Response snapshot

Generated a 14-task implementation roadmap for the Advanced University-Level Curriculum feature. The tasks are organized into 6 phases, covering CSS setup, rich data backend support, professional course/class roadmap management, and a high-fidelity student-view preview mode.

## Outcome

- ✅ Impact: Clear execution roadmap for premium academic management.
- 🧪 Tests: none (Task generation)
- 📁 Files: specs/099-advanced-curriculum/tasks.md created.
- 🔁 Next prompts: /sp.implement to begin execution.
- 🧠 Reflection: Building on the existing curriculum module structure but adding granular academic fields allows for a professional "University Level" feel without excessive database changes.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
