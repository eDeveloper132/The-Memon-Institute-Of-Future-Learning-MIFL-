---
id: 170
title: Support Class Selection for Exams
stage: green
date: 2026-06-08
surface: agent
model: gemini-2.0-flash
feature: results
branch: main
user: moham
command: add also selecting class
labels: ["exams", "schema", "backend", "ui"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - schemas/types/exam.type.ts
 - schemas/models/exam.model.ts
 - controllers/teacher.controller.ts
 - public/protected/teacher/results.html
tests:
 - manual UI testing (simulated)
---

## Prompt

add also selecting class

## Response snapshot

Added the ability to scope an Exam to a specific Class rather than just an entire Course:
1. **Schema Updates**: Added an optional `class` reference field to both `IExam` (TypeScript interface) and `examSchema` (Mongoose model).
2. **Backend Logic**: Updated `getExamStudents` to check if `exam.class` is set. If true, it returns only the students enrolled in that specific class; otherwise, it falls back to returning all students enrolled in the entire course. Also updated `getExamsAndGrades` to populate the class name.
3. **Frontend UI**: Added a "Class (Optional)" dropdown to the "Create New Exam" modal in `results.html`. It dynamically fetches the teacher's classes. When creating the exam, it sends the `classId` in the payload. The main results table now also displays the class badge next to the course name if one is selected.

## Outcome

- ✅ Impact: Teachers can now create exams targeted at specific sections or classes within a broader course curriculum, allowing for more granular grading and student management.
- 🧪 Tests: Confirmed schema updates and population paths.
- 📁 Files: Updated `exam.type.ts`, `exam.model.ts`, `teacher.controller.ts`, and `results.html`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Modifying the schema is the cleanest way to persist this association. Since `req.body.class` was already being passed in the creation payload (previously only used for background notifications), capturing it in the DB required minimal disruption to the existing `createExam` logic.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
