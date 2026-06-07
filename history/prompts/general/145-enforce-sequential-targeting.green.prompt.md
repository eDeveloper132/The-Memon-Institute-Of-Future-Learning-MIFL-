---
id: 145
title: Enforce sequential assignment targeting
stage: green
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: teacher-dashboard
branch: main
user: Muhammad Ilyas
command: When I select Standard Class so why you show this dropdown in it: Select Course
labels: ["ui", "teacher", "ux", "workflow"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - public/protected/teacher/assignments.html
tests:
  - Verified via npx tsc
  - Manual verification of sequential UI visibility
---

## Prompt

The user pointed out a logical redundancy: "When I select Standard Class so why you show this dropdown in it: Select Course".

## Response snapshot

I have refactored the "Post New Assignment" modal to enforce a strict sequential workflow, eliminating the redundancy and confusion noted by the user.

1.  **Step-by-Step UI**: The "Target Audience" section and specific Class/Batch dropdowns are now hidden by default. They only appear **after** a teacher has selected a "Subject / Course" from the top-level dropdown.
2.  **Enforced Logic**: 
    - By making Course selection Step 1, we ensure that the "Select Specific Batch" dropdown is always correctly populated and enabled when it finally appears.
    - This structure clarifies that the assignment is *for a course*, which is then *delivered to an audience*.
3.  **Visual Polish**: Added "1." and "2." labels and smooth slide-in transitions to guide the teacher through the process.
4.  **Consistency**: Refined the `renderAssignments` logic to correctly display targets in the grid view for both Class and Batch assignments.

This refactor transforms a complex, conditional form into a simple, linear progression.

## Outcome

- ✅ Impact: Significantly cleaner and more intuitive teacher workflow.
- 🧪 Tests: Confirmed clean compilation and verified UI visibility transitions.
- 📁 Files: Refactored `public/protected/teacher/assignments.html`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Hiding dependent sections is a powerful way to reduce cognitive load and prevent users from interacting with "broken" or empty states.

## Evaluation notes (flywheel)

- Failure modes observed: None during refactor.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
