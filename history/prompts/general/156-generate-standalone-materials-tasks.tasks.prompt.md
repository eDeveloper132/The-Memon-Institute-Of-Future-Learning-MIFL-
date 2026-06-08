---
id: 156
title: Generate standalone material upload tasks
stage: tasks
date: 2026-06-07
surface: agent
model: Gemini 1.5 Pro
feature: material-management
branch: main
user: Muhammad Ilyas
command: /sp.tasks
labels: ["tasks", "materials", "teacher", "student", "sanity", "implementation"]
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

$ARGUMENTS (implicitly using the context of the standalone material uploads plan)

## Response snapshot

I have generated an actionable `tasks.md` file for the **Standalone Material Uploads via Sanity** feature.

1.  **Phase 2 (Foundational)**: Updates to the `Material` schema and interfaces (`material.type.ts`, `material.model.ts`) to make `course` optional and introduce an optional `class` reference. `uploadMaterial` controller logic will also be updated to handle this dual-targeting mechanism.
2.  **Phase 3 (User Story 1 - MVP)**: Total redesign of the `staff/index.html` page to serve as the new Teacher Resource Hub. Includes dynamic target selection (Course vs. Class), file selection, integration with the Sanity upload endpoint, and final submission to the database.
3.  **Phase 4 (User Story 2)**: Updates to the student portal. The `getMyMaterials` controller will be modified to use an `$or` query to fetch materials for both enrolled courses and the student's current class. `course-files.html` will be updated to display these materials correctly.
4.  **Polish Phase**: Execution of the mandatory `npx tsc` gate and UX verifications for the new upload form.

The tasks are ordered to ensure the schema and backend logic are in place before the frontend UI is implemented and integrated.

## Outcome

- ✅ Impact: Precise implementation roadmap created for adding standalone file distribution to the platform.
- 🧪 Tests: Independent test criteria defined for teacher upload and student retrieval.
- 📁 Files: `specs/main/tasks.md` generated with 13 actionable tasks.
- 🔁 Next prompts: `/sp.implement` to begin Phase 2 (Foundational Schema Updates).

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
