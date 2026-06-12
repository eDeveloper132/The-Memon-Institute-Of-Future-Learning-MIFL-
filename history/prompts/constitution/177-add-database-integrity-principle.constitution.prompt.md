---
id: 177
title: Add Database Integrity Principle
stage: constitution
date: 2026-06-12
surface: agent
model: Gemini 2.0 Flash
feature: constitution
branch: main
user: moham
command: /sp.constitution Create a law that in the phase of implementation database data not harmed even in making plans or tasks.
labels: [constitution, database, safety]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/tasks-template.md
 - README.md
 - types/README.md
tests:
 - Manual verification of version synchronization
---

## Prompt

/sp.constitution Create a law that in the phase of implementation database data not harmed even in making plans or tasks.

## Response snapshot

I have updated the MIFL Constitution to version 1.2.0, introducing **Principle VII: Database Integrity & Data Protection**. This principle ensures that database data is safeguarded across all development phases—planning, task creation, and implementation. I have also synchronized this update across the implementation plan template, task template, and all relevant README files to maintain consistent governance.

## Outcome

- ✅ Impact: Established a mandatory safety gate for database operations project-wide.
- 🧪 Tests: Verified version synchronization across 5 files via grep.
- 📁 Files: Modified constitution, 2 templates, and 2 READMEs.
- 🔁 Next prompts: None.
- 🧠 Reflection: Version propagation is critical for governance; sequential edits to the same file avoid race conditions.

## Evaluation notes (flywheel)

- Failure modes observed: Parallel execution race condition on README.md.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
