---
id: 136
title: Generate implementation tasks for dual-fee management
stage: tasks
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: main
branch: main
user: Muhammad Ilyas
command: /sp.tasks
labels: ["tasks", "finance", "admin", "ui", "schema"]
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

$ARGUMENTS (implicitly using the context of the dual-fee plan)

## Response snapshot

I have generated an actionable `tasks.md` file for the "Unified Dual-Fee Management" feature.

1.  **Phase 2 (Foundational)**: Mandatory updates to the `Class` schema and interface to support `monthlyFee`.
2.  **Phase 3 (US1 - MVP)**: Implementation of dual-fee inputs and card displays for the Course management dashboard.
3.  **Phase 4 (US2)**: Extension of the dual-fee pattern to the Class management dashboard.
4.  **Polish Phase**: Verification of existing quick-update logic and enforcing the mandatory `npx tsc` gate.

The roadmap ensures a systematic rollout of the two-tier pricing model across all administrative tools, maintaining both data integrity and UI consistency.

## Outcome

- ✅ Impact: Precise roadmap created for implementing complex financial fields.
- 🧪 Tests: Independent test criteria defined for both Course and Class management flows.
- 📁 Files: `specs/main/tasks.md` generated with 16 actionable tasks.
- 🔁 Next prompts: `/sp.implement` to begin Phase 2 (Foundational Schema Updates).

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
