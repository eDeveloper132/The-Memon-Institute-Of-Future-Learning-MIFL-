---
id: 035
title: Resolve CSP Violations in Error Pages
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: security
branch: main
user: moham
command: /sp.implement
labels: ["security", "csp", "error-handling"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - public/errors/429.html
  - public/errors/404.html
---

### PROMPT_TEXT
Executing inline event handler violates the following Content Security Policy directive 'script-src-attr 'none''. Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present. The action has been blocked.

in http://localhost:2000/protected/admin/sdf

### RESPONSE_TEXT
I have resolved the CSP violation by removing inline event handlers from the 404 and 429 error pages.

1. **Refactored 404.html**: Replaced the `onclick="history.back()"` attribute with an event listener attached via a `<script>` tag.
2. **Refactored 429.html**: Replaced the `onclick="window.location.reload()"` attribute with an event listener attached via a `<script>` tag.

These changes satisfy the `script-src-attr 'none'` directive of the Content Security Policy, ensuring the error pages function correctly without compromising security.

### OUTCOME
Resolved the "script-src-attr 'none'" CSP violation by moving logic to script blocks.
