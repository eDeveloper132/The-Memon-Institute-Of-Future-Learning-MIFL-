---
id: 084
title: Fix Auto-Logout Bug in Teacher Dashboard
stage: green
date: 2026-05-30
surface: agent
model: gemini-interactive
feature: 070-parent-management
branch: main
user: moham
command: /sp.implement
labels: ["bug-fix", "session-reset", "teacher-dashboard"]
links:
  spec: specs/070-parent-management/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/teacher/curriculum.html
 - public/protected/teacher/results.html
 - public/protected/teacher/attendance.html
tests:
 - browser-refresh
---

## Prompt

When I click on curriculum page in teacher dashboard than it auto resets the session and back to login

## Response snapshot

Identified that `curriculum.html` and `results.html` were calling undefined functions (`fetchCourses()` and `fetchResults()`) during page initialization. These `ReferenceErrors` were caught by the global initialization `catch` block, which incorrectly interpreted them as authentication failures and redirected users to the login page. Refactored the calls to use the correct function names (`fetchMaterials()` and `fetchExams()`).

## Outcome

- ✅ Impact: Resolved critical session reset bug preventing teachers from accessing curriculum and results.
- 🧪 Tests: none
- 📁 Files: 3 HTML files updated.
- 🧠 Reflection: Global catch-all redirects for initialization logic can hide code errors and cause frustrating user experiences. Specific error handling for auth versus data fetching is preferred.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
