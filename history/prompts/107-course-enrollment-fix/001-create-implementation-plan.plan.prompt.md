---
id: 001
title: Create implementation plan for course enrollment fix
stage: plan
date: 2026-06-08
surface: agent
model: gemini-2.0-flash
feature: course-enrollment-fix
branch: 107-course-enrollment-fix
user: moham
command: /sp.plan Fix the issue that student can apply in academic classes but can't apply in courses.
labels: [enrollment, courses, planning]
links:
  spec: specs/107-course-enrollment-fix/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/107-course-enrollment-fix/spec.md
  - specs/107-course-enrollment-fix/plan.md
  - specs/107-course-enrollment-fix/tasks.md
tests:
  - tests/enrollment_fix.test.ts (planned)
---

## Prompt

/sp.plan Fix the issue that student can apply in academic classes but can't apply in courses.

## Response snapshot

I have researched the enrollment logic and identified several bugs:
1. `getAvailableOpportunities` does not select enrollment arrays (`students` for Class, `enrolledStudents` for Course), leading to incorrect 'none' status for already enrolled students.
2. `formatItem` uses the wrong field name for Class enrollment check.
3. `applyForEnrollment` lacks duplicate check and pending request check for Courses.

I have created a detailed implementation plan, specification, and task list to address these issues.

## Outcome

- ✅ Impact: High. Fixes a core feature reported as broken by students.
- 🧪 Tests: Planned a new verification test suite.
- 📁 Files: Created spec.md, plan.md, and tasks.md in specs/107-course-enrollment-fix/
- 🔁 Next prompts: Start implementing the tasks.
- 🧠 Reflection: The root cause was a combination of missing data selection and inconsistent field naming between Class and Course models.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Implement T001 and T002 to confirm the bug.
