---
id: 161
title: Plan universal profile management
stage: plan
date: 2026-06-07
surface: agent
model: Gemini 1.5 Pro
feature: profile-management
branch: main
user: Muhammad Ilyas
command: /sp.plan Create a plan to update profile when user click on his name on navbar: user can add his profile pic update it and delete it, the profile pic will be shown on navbar near his name, and update credentials according his roles.
labels: ["plan", "profile", "avatar", "user", "navbar"]
links:
  spec: "D:/MIFL/specs/main/spec.md"
  plan: "D:/MIFL/specs/main/plan.md"
  research: "D:/MIFL/specs/main/research.md"
files:
  - specs/main/spec.md
  - specs/main/plan.md
  - specs/main/research.md
  - specs/main/data-model.md
  - specs/main/quickstart.md
tests:
  - N/A (Planning phase)
---

## Prompt

/sp.plan Create a plan to update profile when user click on his name on navbar: user can add his profile pic update it and delete it, the profile pic will be shown on navbar near his name, and update credentials according his roles.

## Response snapshot

I have executed the implementation planning workflow for the **Universal Profile Management** feature.

1.  **Contextual Analysis**: Determined that a "Universal Web Component Modal" injected via `ui-components.ts` is the best approach to ensure the profile settings are accessible across all 15+ protected dashboards without losing the user's current context.
2.  **Schema Design**: The `IUser` schema already supports a `profilePicture` string field (for the Sanity CDN URL) and various role-specific fields (e.g., `qualification`, `emergencyContact`). No schema structural changes are required, only exposure logic.
3.  **UI Strategy**: 
    - The `<ui-navbar>` will bind a click listener to the user's name/avatar.
    - A dynamic modal will open displaying current credentials based on the user's role.
    - An avatar uploader will instantly post to Sanity and update the navbar DOM in real-time.
4.  **Artifact Generation**: Created `spec`, `plan`, `research`, `data-model`, and `quickstart` documentation to guide the implementation phase.
5.  **Context Sync**: Updated `GEMINI.md` to reflect the technical dependencies (Sanity Client usage for user avatars).

The plan provides a robust strategy for global profile management while maintaining strict CSP and type safety.

## Outcome

- ✅ Impact: Strategic path defined for universal profile and avatar management.
- 🧪 Tests: Identified cross-role testing requirements for dynamic field rendering.
- 📁 Files: Created 5 core design artifacts in `specs/main/`.
- 🔁 Next prompts: `/sp.tasks` to generate the implementation checklist.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
