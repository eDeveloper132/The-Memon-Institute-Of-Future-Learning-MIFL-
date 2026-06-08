---
id: 157
title: Implement standalone material uploads
stage: green
date: 2026-06-07
surface: agent
model: Gemini 1.5 Pro
feature: material-management
branch: main
user: Muhammad Ilyas
command: /sp.implement
labels: ["green", "materials", "sanity", "teacher", "student", "implementation"]
links:
  spec: "D:/MIFL/specs/main/spec.md"
  plan: "D:/MIFL/specs/main/plan.md"
  tasks: "D:/MIFL/specs/main/tasks.md"
files:
  - schemas/types/material.type.ts
  - schemas/models/material.model.ts
  - controllers/teacher.controller.ts
  - controllers/student.controller.ts
  - public/protected/staff/index.html
  - public/protected/student/course-files.html
tests:
  - Verified via npx tsc (resolved query type error)
  - Manual verification of upload form and target selection
  - Manual verification of student side rendering
---

## Prompt

/sp.implement (Standalone Material Uploads)

## Response snapshot

I have successfully implemented the **Standalone Material Uploads** feature, providing teachers with a dedicated "Resource Hub" independent of the curriculum milestones.

1.  **Data Contract**: 
    - Updated `IMaterial` and `materialSchema` to support dual-targeting. A material can now be assigned to either a specific `course` OR a specific `class` by making both fields optional but requiring at least one in the controller logic.
2.  **Teacher Resource Hub**:
    - Completely overhauled the placeholder `/protected/staff/index.html` page into a functional Material Distribution center.
    - Teachers can use radio toggles to select their target audience (Class vs. Course), which dynamically populates the appropriate options.
    - Built a seamless upload flow that sends files to Sanity CDN and persists the resulting URL to MongoDB.
3.  **Student Material Visibility**:
    - Updated the `getMyMaterials` logic in `student.controller.ts` to use a dynamic `$or` query, ensuring students fetch materials assigned to *both* their enrolled courses and their current class. Fixed a TypeScript/Mongoose strict typing error during this step by explicitly handling the undefined `currentClass` case.
    - Updated `/protected/student/course-files.html` to clearly group and label materials by their origin (e.g., "[Class] Class 10A" vs "[Course] Intro to Math").
4.  **Verification**: Passed the mandatory `npx tsc` gate with 0 errors.

Teachers now have maximum flexibility in how they distribute resources, and students have a single, unified view of all their materials.

## Outcome

- ✅ Impact: Flexible, standalone resource distribution enabled for teachers.
- 🧪 Tests: Confirmed architectural integrity and visual grouping on the student dashboard.
- 📁 Files: Modified 4 backend files and 2 core UI files.
- 🔁 Next prompts: None.
- 🧠 Reflection: Mongoose is strictly typed regarding `undefined` in queries. When building `$or` arrays based on optional user references, it's safer to conditionally push conditions to the array rather than passing `undefined` directly into the query object.

## Evaluation notes (flywheel)

- Failure modes observed: `npx tsc` caught a type error in `student.controller.ts` where `{ class: user?.currentClass }` was invalid if `currentClass` was undefined.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
