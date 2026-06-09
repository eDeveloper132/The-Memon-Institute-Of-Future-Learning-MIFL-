---
id: 174
title: Plan Student Curriculum Fix
stage: plan
date: 2026-06-08
surface: agent
model: gemini-2.0-flash
feature: main
branch: main
user: moham
command: /sp.plan make a plan to fix it that Teacher added curriculum and outline with scheduling and pdf files and links but students can't see in "http://localhost:2000/protected/student/curriculum.html"
labels: ["planning", "curriculum", "student", "api"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/main/plan.md
 - specs/main/research.md
 - specs/main/data-model.md
tests:
 - null
---

## Prompt

make a plan to fix it that Teacher added curriculum and outline with scheduling and pdf files and links but students can't see in "http://localhost:2000/protected/student/curriculum.html"

## Response snapshot

Executed the implementation planning workflow to fix the student curriculum visibility:
1. Created `specs/main/research.md` identifying the root cause: The frontend is attempting to fetch data from `/api/admin/courses` and `/api/admin/classes`, which returns a 403 Forbidden error because students lack admin privileges.
2. Created `specs/main/data-model.md` defining a new API contract for `GET /api/student/roadmaps`.
3. Created `specs/main/plan.md` to document the solution: building the new backend endpoint and updating the frontend to consume it instead of the admin routes.
4. Executed `update-agent-context.ps1` to update `GEMINI.md`.

## Outcome

- ✅ Impact: Established a clear and secure plan to allow students to view their course and class roadmaps.
- 🧪 Tests: N/A
- 📁 Files: Generated `plan.md`, `research.md`, and `data-model.md`.
- 🔁 Next prompts: Use `/sp.tasks` to generate the actionable checklist.
- 🧠 Reflection: When frontends fail silently or stall, inspecting network requests (or in this case, the source code's fetch URLs) often reveals permissions issues. Building dedicated aggregators for different user roles is more secure and performant than downloading bulk admin data and filtering client-side.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
