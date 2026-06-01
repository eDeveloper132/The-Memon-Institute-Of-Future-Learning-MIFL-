---
id: 113
title: Fix Preview Content and Add Selection Popup
stage: green
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: main
user: moham
command: In "New Learning Path" section the all curriculum not shown in preview syllabus, and fix that when click on preview syllabus button than will not show this "Select an entity first" it will confirm entity from an popup
labels: ["bug-fix", "ui-ux", "curriculum", "preview"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/teacher/curriculum.html
tests:
 - manual-preview-visibility-test
 - manual-popup-confirmation-test
---

## Prompt

In "New Learning Path" section the all curriculum not shown in preview syllabus, and fix that when click on preview syllabus button than will not show this "
Select an entity first" it will confirm entity from an popup

## Response snapshot

Resolved an issue where partially filled curriculum modules (e.g., those with a description but no title) were being skipped by the preview logic. Reverted the scraper filter to include all non-empty modules, ensuring they appear as "Untitled Module" in the preview. Additionally, overhauled the "Preview Syllabus" interaction to use standard popups (alert/confirm) for entity selection and confirmation, replacing the previous toast message for a more deliberate user experience.

## Outcome

- ✅ Impact: Comprehensive preview of in-progress curriculum work and improved selection feedback.
- 🧪 Tests: manual-preview-visibility-test (Verified that untitled modules now show in preview); manual-popup-confirmation-test (Verified alert/confirm sequence for entity selection)
- 📁 Files: public/protected/teacher/curriculum.html updated.
- 🔁 Next prompts: none
- 🧠 Reflection: Users often want to see a draft version of their work even if it doesn't meet the strict "production" validation criteria. Designing the preview logic to be more lenient than the save logic provides a better authoring experience.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
