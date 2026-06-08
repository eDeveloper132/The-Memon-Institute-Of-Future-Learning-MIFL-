---
id: 162
title: Generate implementation tasks for universal profile management
stage: tasks
date: 2026-06-07
surface: agent
model: Gemini 1.5 Pro
feature: profile-management
branch: main
user: Muhammad Ilyas
command: /sp.tasks
labels: ["tasks", "profile", "avatar", "user", "implementation"]
links:
  spec: "D:/MIFL/specs/main/spec.md"
  plan: "D:/MIFL/specs/main/plan.md"
  tasks: "D:/MIFL/specs/main/tasks.md"
files:
  - specs/main/tasks.md
tests:
  - N/A (Task generation only)
---

## Prompt

$ARGUMENTS (implicitly using the context of the universal profile management plan)

## Response snapshot

I have generated an actionable `tasks.md` file for the **Universal Profile Management** feature.

1.  **Phase 2 (Foundational)**: Creation of the `uploadAvatar` and `updateProfile` endpoints in `auth.controller.ts`, handling the secure integration with Sanity CDN and the safe filtering of user input fields.
2.  **Phase 3 (User Stories 1 & 2 - MVP)**: Implementation of the dynamic `<ui-profile-modal>` within the `ui-components.ts` file. This includes building the file upload UI, handling the Sanity API response, and performing real-time DOM updates to the navbar avatar without requiring a page refresh.
3.  **Phase 4 (User Stories 3, 4 & 5)**: Expanding the modal to include dynamic text inputs based on the user's role (e.g., rendering `qualification` inputs only for Teachers, or `emergencyContact` only for Students).
4.  **Polish Phase**: Ensuring strict CSP compliance via event delegation for the dynamically injected modal and enforcing the `npx tsc` verification gate.

The tasks are structured to ensure that the core visual interaction (clicking the navbar to open the modal and update the avatar) is built and verified first before layering in the complex role-specific text fields.

## Outcome

- ✅ Impact: Precise implementation roadmap created for integrating global profile management.
- 🧪 Tests: Independent test criteria defined for avatar uploads and role-specific credential updates.
- 📁 Files: `specs/main/tasks.md` generated with 17 actionable tasks.
- 🔁 Next prompts: `/sp.implement` to begin Phase 2 (Foundational API Routes).

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
