---
id: 112
title: Fix CSP violations in notices UI
stage: general
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: none
branch: main
user: moham
command: fix(csp): resolve inline event handler violations in notice boards
labels: ["csp", "security", "bugfix", "notices"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - public/protected/admin/notices.html
  - public/protected/teacher/notices.html
tests:
  - Manual UI verification
---

## Prompt

The user reported CSP violations:
`notices.html:21 Executing inline event handler violates the following Content Security Policy directive 'script-src-attr 'none''`

## Response snapshot

I have refactored the admin and teacher notice board pages to eliminate inline event handlers. 

1.  **Replaced `onclick` and `onchange` attributes** with `addEventListener` calls in the script block.
2.  **Implemented event delegation** for dynamic "Delete" buttons inside the notices list.
3.  **Updated HTML structure** to include necessary IDs (`createNoticeBtn`, `closeModalBtnTop`, etc.) for script-based targeting.

This ensures compatibility with the strict Content Security Policy defined in the middleware.

## Outcome

- ✅ Impact: Resolved security blocks preventing notice management in admin and teacher dashboards.
- 🧪 Tests: Refactored logic to be more robust and CSP-compliant.
- 📁 Files: Modified `public/protected/admin/notices.html` and `public/protected/teacher/notices.html`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Moving away from inline JS is always better for security and maintainability.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
