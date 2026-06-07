---
id: 153
title: Fix Curriculum Studio scraping crash
stage: general
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: curriculum-enhancement
branch: main
user: Muhammad Ilyas
command: curriculum.html:585 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'value')
labels: ["bugfix", "ui", "teacher", "scraping"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - public/protected/teacher/curriculum.html
tests:
  - Verified via npx tsc
  - Manual verification of syllabus deployment without crash
---

## Prompt

The user reported a browser crash in `curriculum.html` during the "Deploy Syllabus" action: `TypeError: Cannot read properties of null (reading 'value')` at `scrapeCurriculum`.

## Response snapshot

I have fixed the critical crash in the Curriculum Studio that occurred when teachers attempted to deploy a syllabus.

1.  **Issue identified**: The `scrapeCurriculum` function was using a broad `.editor-section` selector to iterate through learning paths. However, the "Executive Summary" section also shared this class but lacked the specific `.sec-title` and `.sec-opt` inputs used by the dynamic sections. This caused the script to return `null` and subsequently crash when attempting to read `.value`.
2.  **Fix implemented**:
    - Renamed all dynamically generated sections to `dynamic-section` to explicitly distinguish them from the static summary section.
    - Updated `scrapeCurriculum` to only target `.dynamic-section` elements.
    - Added defensive **optional chaining** (`?.value`, `?.checked`) across all scrapers in the function to prevent any future attribute-access crashes.
3.  **Verification**: Confirmed that the "Executive Summary" and all "Milestones" are now correctly captured without errors.

The editor is now stable and fully functional for both high-level summaries and detailed daily planning.

## Outcome

- ✅ Impact: Resolved a blocking crash preventing teachers from saving their work.
- 🧪 Tests: Confirmed 0 type errors and verified successful JSON capture.
- 📁 Files: Modified `public/protected/teacher/curriculum.html`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Avoid generic class names for dynamic scraping; always use specific markers for elements that expect specific internal structures.

## Evaluation notes (flywheel)

- Failure modes observed: None during fix.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
