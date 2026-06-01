---
id: 111
title: Plan Price Section in PKR
stage: plan
date: 2026-06-01
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 104-price-section-management
branch: main
user: moham
command: /sp.plan Add price section in "Register New Course" and in "New Academic Class" with functionalities and will be in PKR format
labels: [price, pkr, course, class]
links:
  spec: specs/104-price-section-management/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/104-price-section-management/research.md
  - specs/104-price-section-management/data-model.md
  - specs/104-price-section-management/quickstart.md
  - specs/104-price-section-management/contracts/course-api.md
  - specs/104-price-section-management/contracts/class-api.md
  - specs/104-price-section-management/plan.md
tests:
  - null
---

## Prompt

/sp.plan Add price section in "Register New Course" and in "New Academic Class" with functionalities and will be in PKR format

## Response snapshot

I have completed the research and planning phase for adding a PKR price section to both 'Register New Course' and 'New Academic Class'. This involved:
1. Researching existing models and UI components.
2. Creating a detailed implementation plan.
3. Defining API contracts and data models.
4. Setting up a quickstart guide for the new functionality.

## Outcome

- ✅ Impact: High. Enables administrative users to manage enrollment fees in PKR during the creation of courses and classes.
- 🧪 Tests: No automated tests run yet; planning phase only.
- 📁 Files: Created 6 new specification and planning files.
- 🔁 Next prompts: /sp.tasks to break down the implementation into actionable items.
- 🧠 Reflection: The existing `enrollmentFee` field simplified the implementation as no schema changes were required.

## Evaluation notes (flywheel)

- Failure modes observed: None during the planning phase.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Update the creation modals to include the price field.
