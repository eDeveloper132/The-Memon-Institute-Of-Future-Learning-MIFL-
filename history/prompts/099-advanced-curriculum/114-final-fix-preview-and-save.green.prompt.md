---
id: 114
title: Final Fix for Curriculum Preview and Save Logic
stage: green
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: main
user: moham
command: fix preview syllabus and entity selection popup
labels: ["bug-fix", "ui-ux", "curriculum", "preview", "data-integrity"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/teacher/curriculum.html
tests:
 - manual-preview-full-test
 - manual-save-filtering-test
---

## Prompt

In "New Learning Path" section the all curriculum not shown in preview syllabus, and fix that when click on preview syllabus button than will not show this "
Select an entity first" it will confirm entity from an popup

## Response snapshot

Resolved the issue where modules were missing from the preview by removing the strict filtering from the `scrapeCurriculum` function. Now, all modules in the DOM (including placeholders) are captured and displayed in the preview as "Untitled Module". To maintain data quality, I implemented a filtering step during the "Deploy" (save) process that removes completely empty modules before they are validated and sent to the server. I also finalized the preview interaction to use standard `alert` and `confirm` popups for a more deliberate user experience.

## Outcome

- ✅ Impact: Reliable real-time preview of all curriculum modules and safer data submission.
- 🧪 Tests: manual-preview-full-test (Verified that empty modules show as placeholders in preview); manual-save-filtering-test (Verified that blank rows are ignored during save)
- 📁 Files: public/protected/teacher/curriculum.html updated.
- 🔁 Next prompts: none
- 🧠 Reflection: Separating the view-logic (preview) from the business-logic (save) allows for a more flexible UI without compromising the integrity of the persistent data.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
