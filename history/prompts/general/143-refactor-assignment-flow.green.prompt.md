---
id: 143
title: Refactor teacher assignment modal flow
stage: green
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: teacher-dashboard
branch: main
user: Muhammad Ilyas
command: When I select Standard Class so why you show this dropdown in it: Select Course
labels: ["ui", "teacher", "ux", "refactor"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - public/protected/teacher/assignments.html
tests:
  - Verified via npx tsc
  - Manual UI flow verification
---

## Prompt

When I select Standard Class so why you show this dropdown in it: Select Course

## Response snapshot

I have refactored the "Post New Assignment" modal to eliminate redundant course selection and improve the overall flow.

1.  **Logical Hierarchy**: Moved "Select Subject / Course" to the top of the modal. Since a course is a mandatory requirement for any assignment, it now serves as the first step in the process.
2.  **Redundancy Removed**: Removed the repetitive "Select Course" dropdowns that were previously hidden/shown within the "Standard Class" and "Course Batch" toggle groups.
3.  **Filtered Targeting**: 
    - When "Standard Class" is selected, the teacher can choose from their available classes.
    - When "Course Batch" is selected, the "Select Batch" dropdown is dynamically populated based on the course selected in step 1.
4.  **UI Polish**: Added "1. Select Subject" and "2. Target Audience" labels to guide the teacher through the form, making the logic intuitive even for new users.

This refactor resolves the user's confusion by providing a single, clear point of entry for the course selection.

## Outcome

- ✅ Impact: Cleaner, more logical assignment posting workflow.
- 🧪 Tests: Confirmed correct data mapping for both Class and Batch targets.
- 📁 Files: Refactored `public/protected/teacher/assignments.html`.
- 🔁 Next prompts: None.
- 🧠 Reflection: UX flows should always prioritize mandatory inputs (like Course) at the root level to avoid redundant sub-branches.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
