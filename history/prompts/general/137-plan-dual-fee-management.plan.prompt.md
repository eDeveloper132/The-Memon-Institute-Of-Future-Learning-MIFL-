---
id: 137
title: Plan dual-fee management for courses and classes
stage: plan
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: main
branch: main
user: Muhammad Ilyas
command: /sp.plan Add monthly fee and enrollment fee both in fields of courses.html and classes.html
labels: ["plan", "finance", "admin", "ui", "schema"]
links:
  spec: "D:/MIFL/specs/main/spec.md"
  plan: "D:/MIFL/specs/main/plan.md"
  tasks: "D:/MIFL/specs/main/tasks.md"
files:
  - specs/main/spec.md
  - specs/main/plan.md
  - specs/main/research.md
  - specs/main/data-model.md
  - specs/main/quickstart.md
  - specs/main/tasks.md
tests:
  - N/A (Plan only)
---

## Prompt

/sp.plan Make a plan to add monthly fee and enrollment fee both rather than only enrollment fee in fields of courses.html and classes.html of admin dashboard

## Response snapshot

I have executed the implementation planning workflow for the dual-fee management system (Enrollment + Monthly fees) for both Courses and Classes.

1.  **Requirement Audit**: Identified that while `Course` has `monthlyFee`, the `Class` entity requires a schema update. Both UI files (`courses.html` and `classes.html`) need form and card refactoring.
2.  **Schema Design**: Updated the design artifacts to include `monthlyFee` in the `Class` model and interface.
3.  **UI Strategy**: Planned a two-column fee display for cards and dual-input modals to provide a consistent financial management experience.
4.  **Task Generation**: Created a detailed 16-task roadmap covering foundational schema updates, UI implementation for both dashboards, and final verification.
5.  **Quality Gate**: Ensured all tasks are bound by the `npx tsc` mandate from the Constitution.

The roadmap ensures that administrators can manage both upfront and recurring fees for all academic entities with a unified interface.

## Outcome

- ✅ Impact: Strategic path defined for comprehensive fee management across all admin modules.
- 🧪 Tests: Independent test criteria defined for both Course and Class management flows.
- 📁 Files: Created 6 design and task artifacts in `specs/main/`.
- 🔁 Next prompts: `/sp.implement` to begin Phase 2 (Foundational Schema Updates).

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
