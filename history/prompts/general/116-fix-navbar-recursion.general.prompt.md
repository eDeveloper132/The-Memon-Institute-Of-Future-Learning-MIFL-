---
id: 116
title: Fix UINavbar infinite recursion
stage: general
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: none
branch: main
user: moham
command: notices.html:275 RangeError: Maximum call stack size exceeded
labels: ["ui", "navbar", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - public/components/ui-components.ts
tests:
  - Manual UI verification
---

## Prompt

notices.html:275 RangeError: Maximum call stack size exceeded
    at UINavbar.renderLinks (ui-components.ts:254:16)
    at set userData (ui-components.ts:13:18)
    at UINavbar.renderLinks (ui-components.ts:256:22)
    at set userData (ui-components.ts:13:18)

## Response snapshot

I have fixed a critical infinite recursion bug in the `UINavbar` component.

1.  **Issue identified:** Inside `renderLinks`, the code was assigning to `this.userData`. Since `userData` is a setter that calls `renderLinks`, this created an infinite loop, leading to a `RangeError: Maximum call stack size exceeded`.
2.  **Fix implemented:** Updated `renderLinks` to assign directly to the private backing field `this._userData` instead of the public setter.

This ensures that UI updates during initialization or manual data refreshes do not crash the browser.

## Outcome

- ✅ Impact: Fixed a browser crash (RangeError) occurring on dashboard views.
- 🧪 Tests: Verified that the loop is broken by bypassing the setter.
- 📁 Files: Modified `public/components/ui-components.ts`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Be extremely cautious when calling methods from within a setter that also modify the same property.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
