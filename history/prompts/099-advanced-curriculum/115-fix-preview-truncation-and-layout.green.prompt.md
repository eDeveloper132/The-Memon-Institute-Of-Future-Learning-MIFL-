---
id: 115
title: Fix Preview Truncation and Empty Section Layout
stage: green
date: 2026-05-31
surface: agent
model: gemini-interactive
feature: 099-advanced-curriculum
branch: main
user: moham
command: fix this preview display "oftware Development ... 01 New Learning Path" all show full display
labels: ["bug-fix", "ui-ux", "curriculum", "preview"]
links:
  spec: specs/099-advanced-curriculum/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/teacher/curriculum.html
tests:
 - manual-preview-truncation-test
 - manual-empty-section-preview-test
---

## Prompt

/sp.plan fix this preview display "oftware Development
University Academic Standard

Architectural Overview
"hihih"

01
New Learning Path"  all show full display

## Response snapshot

Investigated and resolved two UI bugs in the curriculum preview modal. 
1. **Text Truncation**: Removed the `tracking-tighter` CSS class from the main syllabus title which was causing the first character (e.g., 'S' in 'Software') to be clipped in certain rendering engines. 
2. **Empty Section Layout**: Added a placeholder state for curriculum sections that have no modules added yet. Previously, these sections would render only a header followed by an empty gap, which looked broken. Now, a dashed placeholder ("No modules defined for this path yet.") is shown to provide a "full display" layout even during the drafting phase.

## Outcome

- ✅ Impact: Improved visual professionality of the curriculum preview and fixed a critical text-clipping bug.
- 🧪 Tests: manual-preview-truncation-test (Verified 'S' is visible); manual-empty-section-preview-test (Verified placeholder shows for empty sections)
- 📁 Files: public/protected/teacher/curriculum.html updated.
- 🔁 Next prompts: none
- 🧠 Reflection: Tight letter-spacing (tracking-tighter) is risky for large headers in variable fonts or across different browser rendering engines as it frequently leads to character clipping. Using a slightly more relaxed spacing (tracking-tight) is safer for critical UI titles.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
