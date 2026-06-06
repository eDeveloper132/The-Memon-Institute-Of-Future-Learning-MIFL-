---
id: 130
title: Plan course modal updates for decimal credits
stage: plan
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: main
branch: main
user: Muhammad Ilyas
command: /sp.plan Update course modals and fix decimal credits
labels: ["plan", "courses", "admin", "ux"]
links:
  spec: "D:/MIFL/specs/main/spec.md"
  plan: "D:/MIFL/specs/main/plan.md"
  research: "D:/MIFL/specs/main/research.md"
files:
  - specs/main/spec.md
  - specs/main/plan.md
  - specs/main/research.md
  - specs/main/data-model.md
  - specs/main/contracts/courses.md
  - specs/main/quickstart.md
tests:
  - N/A (Plan only)
---

## Prompt

/sp.plan Make a comprehensive plan to update "Register New Course" modal and "Edit Course" modal, fix that credit hours would be in decimal form and fix its functionality

## Response snapshot

I have executed the implementation planning workflow for updating the course management modals.

1.  **Requirement Capture**: Defined the need for decimal credit hours and improved modal functionality in `spec.md`.
2.  **Audit**: Identified `public/protected/admin/courses.html` as the primary UI file and `admin.controller.ts` as the backend controller.
3.  **Technical Strategy**: 
    - Determined that adding `step="0.1"` to the HTML5 number input is the most efficient way to enable decimal support.
    - Verified that Mongoose's `Number` type casting will handle decimal strings correctly on the backend.
4.  **Artifact Generation**: Created `research.md`, `data-model.md`, `contracts/courses.md`, and `quickstart.md` to guide the implementation and testing phases.
5.  **Context Sync**: Updated `GEMINI.md` to reflect the technical stack involved in this update.

The plan ensures that the academic structure can be accurately represented with fractional credits while maintaining a robust and user-friendly experience for administrators.

## Outcome

- ✅ Impact: Strategic path defined for fixing the credit hour limitation and improving course management UX.
- 🧪 Tests: Defined test cases for decimal saving, field population, and validation.
- 📁 Files: Created 6 design artifacts in `specs/main/`.
- 🔁 Next prompts: `/sp.tasks` to generate the step-by-step implementaton checklist.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
