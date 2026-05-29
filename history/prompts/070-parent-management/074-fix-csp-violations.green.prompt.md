---
id: 074
title: Fix CSP Violations in Parent Management
stage: green
date: 2026-05-30
surface: agent
model: gemini-interactive
feature: 070-parent-management
branch: main
user: moham
command: /sp.implement
labels: ["parent-management", "csp-fix", "admin-dashboard"]
links:
  spec: specs/070-parent-management/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - public/protected/admin/parents.html
tests:
 - none
---

## Prompt

Executing inline event handler violates the following Content Security Policy directive 'script-src-attr 'none''. Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present. The action has been blocked.Understand this error

## Response snapshot

Identified that `parents.html` used inline `onclick` attributes in dynamically generated HTML, which violates the strict CSP policy (`script-src-attr 'none'`). Refactored the code to use event delegation on the container instead.

## Outcome

- ✅ Impact: Resolved CSP violation errors in the Admin Dashboard.
- 🧪 Tests: none
- 📁 Files: public/protected/admin/parents.html updated.
- 🧠 Reflection: Modern CSP policies often block inline attributes like `onclick` even if `unsafe-inline` is allowed for script blocks. Event delegation is a more robust and secure pattern.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
