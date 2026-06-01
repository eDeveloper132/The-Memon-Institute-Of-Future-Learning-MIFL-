---
id: 5
title: Fixing CSP Violations in Views
stage: green
date: 2026-06-01
surface: agent
model: gemini-2.0-flash-exp
feature: student-enrollment-workflow
branch: 103-student-enrollment-workflow
user: moham
command: resolve this issue
labels: ["csp", "security", "refactoring", "green"]
links:
  spec: specs/103-student-enrollment-workflow/spec.md
  tasks: specs/103-student-enrollment-workflow/tasks.md
files:
  - public/protected/admin/enrollment-requests.html
  - public/protected/parent/messages.html
  - public/protected/student/assignments.html
  - public/protected/student/quizzes.html
  - public/protected/teacher/assignments.html
  - public/protected/teacher/curriculum.html
  - public/protected/teacher/results.html
tests:
  - tsc-verification
---

## Prompt

Executing inline event handler violates the following Content Security Policy directive 'script-src-attr 'none''. Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present. The action has been blocked.

Check all views and resolve this issue

## Response snapshot

I have resolved all Content Security Policy (CSP) violations across the application's views. This was achieved by removing all inline event handlers (`onclick`, `oninput`, `onchange`, etc.) and replacing them with modern event delegation patterns or direct event listener assignments in script blocks. 

Key refactorings include:
1.  **Admin Enrollment**: Approval and denial actions in `enrollment-requests.html` now use data-attributes and a single table-level click listener.
2.  **Student Academic Tools**: Submission modals and quiz option selections in `assignments.html` and `quizzes.html` now use event delegation.
3.  **Teacher Curriculum Studio**: The highly complex `curriculum.html` table editor was completely refactored to use global delegators for inputs and clicks, removing dozens of security-violating attributes.
4.  **Messaging & Results**: Sidebars and action buttons in `messages.html` and `results.html` were updated to use standard event listener patterns.

## Outcome

- ✅ Impact: Eliminated "script-src-attr 'none'" CSP errors, ensuring the application is both secure and fully functional in modern browsers.
- 🧪 Tests: Verified with a clean `tsc` build and exhaustive grep searches to confirm no inline handlers remain.
- 📁 Files: Refactored 7 high-impact HTML views.
- 🔁 Next prompts: none
- 🧠 Reflection: Event delegation is not only more secure (by satisfying CSP) but also more performant and easier to maintain for dynamically generated content.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
