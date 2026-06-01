---
id: 112
title: Fix Curriculum Preview Synchronization
stage: green
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: main
user: moham
command: Now syllabus added but not shown in preview syllabus
labels: ["bug-fix", "ui-ux", "curriculum", "preview"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/teacher/curriculum.html
tests:
 - manual-preview-test
---

## Prompt

Now syllabus added but not shown in preview syllabus

## Response snapshot

Identified that the "Preview Syllabus" button was reading from the persistent state (`currentCourse`), which is only updated after a successful "Deploy" (save) action. This prevented users from previewing their changes in real-time before saving. Updated the preview logic to use the `scrapeCurriculum` tool to read directly from the active DOM inputs, allowing the preview modal to accurately reflect all current on-screen changes, whether saved or unsaved.

## Outcome

- ✅ Impact: Users can now preview their syllabus work-in-progress in real-time without needing to save first.
- 🧪 Tests: manual-preview-test (Verified that typing in a title and clicking preview immediately shows the content in the modal)
- 📁 Files: public/protected/teacher/curriculum.html updated.
- 🔁 Next prompts: none
- 🧠 Reflection: For preview functionality in dynamic editors, always prioritize reading from the active view state (DOM or reactive state) rather than the database-backed persistent state to ensure a responsive "What You See Is What You Get" (WYSIWYG) experience.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
