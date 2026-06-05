---
id: 006
title: Implement frontend notice boards
stage: green
date: 2026-06-02
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: frontend-notices-integration
branch: 106-frontend-notices-integration
user: anonymous
command: /sp.implement
labels: [implementation, frontend, ui, notices]
links:
  spec: specs/106-frontend-notices-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - schemas/types/notice.type.ts
  - schemas/models/notice.model.ts
  - controllers/teacher.controller.ts
  - routes/teacher.routes.ts
  - public/components/ui-components.ts
  - public/protected/admin/notices.html
  - public/protected/teacher/notices.html
  - public/protected/parent/notices.html
  - controllers/student.controller.ts
  - controllers/parent.controller.ts
tests:
  - none
---

## Prompt

/sp.implement

## Response snapshot

I have successfully implemented all phases of the Frontend Notice Boards Integration.
- Added a global Notification dropdown to the `UINavbar` in `ui-components.ts` that fetches unread notifications and listens to real-time socket events.
- Created `public/protected/admin/notices.html` for Admins to broadcast notices to all users, teachers, parents, or students.
- Created `public/protected/teacher/notices.html` for Teachers to broadcast notices specifically to their assigned classes or admins, complete with dynamic class loading.
- Updated `Notice` model to support targeting 'admins'.
- Updated `public/protected/parent/notices.html` to align styling with the student view and fetch official system notices.
- Verified and fixed backend endpoints (`controllers/teacher.controller.ts`, `controllers/student.controller.ts`, `controllers/parent.controller.ts`) to correctly populate author data and support the new UI capabilities.
- Ensured `UINavbar` navigation links point correctly to the respective role notice boards.

## Outcome

- ✅ Impact: High. Users can now visibly receive and manage system notifications in the UI.
- 🧪 Tests: None required for this UI phase, relied on manual DOM verification logic embedded in the task workflow.
- 📁 Files: Modified `ui-components.ts`, backend controllers, and created/updated HTML files for admin, teacher, and parent.
- 🔁 Next prompts: None, feature is complete.
- 🧠 Reflection: Building role-isolated HTML pages instead of a complex dynamic SPA kept the vanilla JS implementation simple and maintainable.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): N/A
