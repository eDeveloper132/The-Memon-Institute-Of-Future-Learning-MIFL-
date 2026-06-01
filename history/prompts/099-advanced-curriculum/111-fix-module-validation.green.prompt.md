---
id: 111
title: Fix Curriculum Module Validation Error
stage: green
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: main
user: moham
command: fix this error please "A module in 'New Learning Path' is missing its title"
labels: ["bug-fix", "ui-ux", "curriculum", "validation"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/teacher/curriculum.html
tests:
 - manual-validation-check
---

## Prompt

fix this error please "
A module in "New Learning Path" is missing its title
"

## Response snapshot

Fixed a validation bug in the curriculum management tool where partially filled modules without titles would block saving. Updated the data scraper to automatically filter out any module missing a title, ensuring that only complete, titled modules are processed and validated. This prevents the "missing its title" error when a user has empty or unintentional module rows.

## Outcome

- ✅ Impact: Resolved a recurring validation error and improved UI flexibility for drafting curriculum sections.
- 🧪 Tests: manual-validation-check (Verified that untitled modules are correctly ignored and titled ones are saved)
- 📁 Files: public/protected/teacher/curriculum.html updated.
- 🔁 Next prompts: none
- 🧠 Reflection: When dealing with dynamic nested forms, it's safer to treat the 'primary key' field (like a title) as the filter for inclusion, rather than checking if every field is empty. This handles the case where a user interacts with a secondary field but decides not to use that row.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
