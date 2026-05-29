---
id: 075
title: Fix JavaScript Runtime Errors in Admin Dashboard
stage: green
date: 2026-05-30
surface: agent
model: gemini-interactive
feature: 070-parent-management
branch: main
user: moham
command: /sp.implement
labels: ["bug-fix", "custom-elements", "javascript-errors"]
links:
  spec: specs/070-parent-management/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/components/ui-components.ts
 - public/protected/admin/classes.html
 - public/protected/admin/courses.html
 - public/protected/admin/parents.html
tests:
 - none
---

## Prompt

script.js:176 Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.
    at script.js:176:12
(anonymous) @ script.js:176Understand this error
parents.html:601 Uncaught (in promise) TypeError: document.querySelector(...).renderLinks is not a function
    at parents.html:601:57

## Response snapshot

Identified that `renderLinks` was incorrectly defined as a `static` method in `ui-components.ts` but called on an instance in `parents.html`. Converted `renderLinks` to an instance method and updated all static call sites in `classes.html` and `courses.html` to use the instance. This resolved the "not a function" error and likely mitigated cascading effects in external scripts.

## Outcome

- ✅ Impact: Resolved critical JavaScript crash in Parent Management and other admin pages.
- 🧪 Tests: none
- 📁 Files: 4 files modified.
- 🧠 Reflection: Mixing static and instance methods in Custom Elements can lead to confusing errors. Consistency in using instance methods for component behavior is preferred.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
