---
id: 131
title: Generate implementation tasks for course modal updates
stage: tasks
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: main
branch: main
user: Muhammad Ilyas
command: /sp.tasks
labels: ["tasks", "courses", "admin", "ux"]
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

$ARGUMENTS (implicitly using the context of the course modal plan)

## Response snapshot

I have generated an actionable `tasks.md` file for the "Update Course Modals" feature.

1.  **Phase 1 & 2 (Setup/Foundational)**: Verification of the `Course` model schema and the `admin.controller.ts` logic to ensure they handle numeric decimals correctly.
2.  **Phase 3 (User Story 1 - MVP)**: Updating the `credits` input in `courses.html` to support `step="0.1"` and adjusting the card rendering to display decimals accurately.
3.  **Phase 4 (User Story 2)**: Refining the modal population logic for edits and ensuring the form submission correctly triggers `PATCH` requests.
4.  **Polish Phase**: Standardizing UI styles and enforcing the mandatory `npx tsc` quality gate.

The roadmap ensures that administrators can accurately record fractional credit hours with a polished, reliable user interface.

## Outcome

- ✅ Impact: Precise roadmap created for fixing the credit hour limitation and improving course management UX.
- 🧪 Tests: Independent test criteria defined for each user story (Create vs Edit).
- 📁 Files: `specs/main/tasks.md` generated with 11 actionable tasks.
- 🔁 Next prompts: `/sp.implement` to begin Phase 1 & 2 verification.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
