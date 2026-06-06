---
id: 114
title: Fix Admin Notices Navbar rendering
stage: general
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: none
branch: main
user: moham
command: NAVBAR NOT RENDERED ON ADMIN NOTICES VIEW
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

NAVBAR NOT RENDERED ON ADMIN NOTICES VIEW

## Response snapshot

I have fixed the issue where the navigation bar appeared empty (or not rendered with links) on the Admin Notices view.

1.  **Issue identified:** The `UINavbar` component lacked a reactive setter for `userData`. If the user data was fetched and assigned after the component was connected to the DOM (which is the case in the `DOMContentLoaded` listener), the links would never be generated.
2.  **Fix implemented:** 
    - Added a `set userData` setter to `UINavbar` in `ui-components.ts`.
    - The setter now automatically triggers `renderLinks()` and `loadNotifications()` when data is assigned.
    - Added an internal `_rendered` flag to ensure DOM manipulation only happens after `connectedCallback` has initialized the base HTML.

This fix improves the robustness of all pages using the custom `ui-navbar` element.

## Outcome

- ✅ Impact: Navbar now correctly displays user name, role, and navigation links on the Admin Notices page and other views.
- 🧪 Tests: Ensured reactivity regardless of assignment timing.
- 📁 Files: Modified `public/components/ui-components.ts`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Reactive properties in Web Components are essential when dealing with asynchronous data fetching.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
