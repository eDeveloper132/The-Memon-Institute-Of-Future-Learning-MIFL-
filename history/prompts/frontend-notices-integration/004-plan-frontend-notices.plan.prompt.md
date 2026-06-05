---
id: 004
title: Plan Frontend Notice Boards
stage: plan
date: 2026-06-02
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 106-frontend-notices-integration
branch: 106-frontend-notices-integration
user: anonymous
command: /sp.plan
labels: [frontend, notices, ui]
links:
  spec: specs/106-frontend-notices-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/106-frontend-notices-integration/spec.md
  - specs/106-frontend-notices-integration/plan.md
  - specs/106-frontend-notices-integration/research.md
tests:
  - none
---

## Prompt

/sp.plan I'm not shown centralized notification system in dashboards. Students notices will be different, Teacher notices will be different, and Parent notices will be different as per logged in user role. The Admin can send notices to Teachers and Parents, the teachers can send notices to his students and admin, the student only see the notices.

## Response snapshot

I have created the implementation plan for the frontend Notice Boards. 
- Created `spec.md` detailing the role-specific views and capabilities (Admin creates for Teachers/Parents, Teacher creates for Students/Admins, Students/Parents read-only).
- Created `research.md` identifying the need to update the `Notice` model audience enum and add a `createNotice` endpoint for teachers.
- Created `plan.md` outlining the HTML files to be created/updated and the `UINavbar` component to be enhanced with a global notification bell.

## Outcome

- ✅ Impact: Medium. Defines the UI structure to expose the backend notification system to users.
- 🧪 Tests: None (UI focus).
- 📁 Files: Created spec, plan, and research docs.
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: Keeping role-specific HTML files separate aligns with the current architecture and avoids complex client-side routing.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` bash script unavailable on Windows, manual fallback used.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): N/A
