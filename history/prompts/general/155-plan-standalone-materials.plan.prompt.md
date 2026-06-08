---
id: 155
title: Plan standalone material uploads
stage: plan
date: 2026-06-07
surface: agent
model: Gemini 1.5 Pro
feature: material-management
branch: main
user: Muhammad Ilyas
command: /sp.plan "http://localhost:2000/protected/staff/index.html" teacher can add pdf files, docx files for specified class or course through sanity and will be visible to his specified class or course students.
labels: ["plan", "materials", "teacher", "student", "sanity"]
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

/sp.plan "http://localhost:2000/protected/staff/index.html" teacher can add pdf files, docx files for specified class or course through sanity and will be visible to his specified class or course students.

## Response snapshot

I have executed the implementation planning workflow for the **Standalone Material Uploads** feature.

1.  **Contextual Analysis**: Determined that teachers need a standalone "Resource Hub" separate from the rigid Curriculum Studio milestones. The requested `staff/index.html` (currently an Inventory placeholder) will be completely overhauled to serve this purpose.
2.  **Schema Design**: Identified a required change to the `Material` model: transitioning from a strict `course`-only association to a dual-targeting model where a material can be assigned to either a specific `course` OR a specific `class`.
3.  **UI Strategy**: Planned a form in `staff/index.html` that uses radio toggles to switch between target types (Course vs. Class), triggering dynamic dropdowns, handling file selection, uploading to Sanity, and submitting the record.
4.  **Student Visibility**: Defined the MongoDB `$or` query needed in `student.controller.ts` to ensure students see all materials associated with their current class, alongside those from their enrolled courses.
5.  **Artifact Generation**: Created `spec`, `plan`, `research`, `data-model`, and `quickstart` documentation to guide the implementation phase.
6.  **Context Sync**: Updated `GEMINI.md` to reflect the updated data models and technical requirements.

The plan provides a clear architectural path for adding flexible, standalone file distribution to the platform.

## Outcome

- ✅ Impact: Strategic path defined for standalone resource distribution.
- 🧪 Tests: Identified cross-dashboard verification criteria (Teacher Upload -> Student View).
- 📁 Files: Created 5 core design artifacts in `specs/main/`.
- 🔁 Next prompts: `/sp.tasks` to generate the implementation checklist.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
