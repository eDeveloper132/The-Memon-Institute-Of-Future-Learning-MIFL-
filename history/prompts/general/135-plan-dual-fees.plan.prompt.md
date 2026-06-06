---
id: 135
title: Plan dual-fee management for admin dashboards
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
  research: "D:/MIFL/specs/main/research.md"
files:
  - specs/main/spec.md
  - specs/main/plan.md
  - specs/main/research.md
  - specs/main/data-model.md
  - specs/main/quickstart.md
tests:
  - N/A (Plan only)
---

## Prompt

/sp.plan Make a plan to add monthly fee and enrollment fee both rather than only enrollment fee in fields of courses.html and classes.html of admin dashboard

## Response snapshot

I have executed the implementation planning workflow for the dual-fee management system (Enrollment + Monthly fees).

1.  **Requirements Analysis**: Defined the need to track both fee types for Courses and Classes, updating both the creation/edit modals and the dashboard card displays.
2.  **Schema Audit**: Identified that the `Course` model is already prepared, but the `Class` model requires the addition of a `monthlyFee` field.
3.  **UI/UX Strategy**: Planned the layout updates for course and class cards to display a two-tier fee section clearly using Tailwind CSS.
4.  **Artifact Generation**: Created the full suite of design documents (`spec`, `plan`, `research`, `data-model`, `quickstart`) to guide implementation.
5.  **Context Sync**: Updated `GEMINI.md` to reflect the technical requirements of this financial update.

The plan ensures that administrators have granular control over the institute's revenue model directly from the management dashboards.

## Outcome

- ✅ Impact: Strategic path defined for comprehensive fee management.
- 🧪 Tests: Defined dual-fee verification scenarios for both entity types.
- 📁 Files: Created 5 design artifacts in `specs/main/`.
- 🔁 Next prompts: `/sp.tasks` to generate the step-by-step implementation checklist.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
