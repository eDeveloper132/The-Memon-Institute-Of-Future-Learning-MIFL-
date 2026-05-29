---
id: 031
title: Fix CSP and Asset Loading Errors
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: security
branch: main
user: moham
command: /sp.implement
labels: ["security", "csp", "socket.io", "font-awesome"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - middlewares/security.ts
  - public/protected/index.html
tests_yaml:
  - none
---

### PROMPT_TEXT
Fix this error:
Tracking Prevention blocked access to storage for https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css.
...
ui-components.ts:334 Loading the script 'https://cdn.socket.io/4.8.3/socket.io.min.js' violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline' cdn.tailwindcss.com https://vercel.live".

### RESPONSE_TEXT
I have fixed the CSP violation and asset loading errors.

1. **Updated CSP**: Modified `middlewares/security.ts` to include `https://cdn.socket.io` and `cdnjs.cloudflare.com` in the `script-src` and `connect-src` directives. This allows the Socket.IO client and Font Awesome assets to load and connect correctly.
2. **Fixed Font Awesome Tag**: Corrected an invalid `<script>` tag in `public/protected/index.html` that was trying to load a CSS file. It has been replaced with the correct `<link>` tag.

These changes resolve the blocked script error and ensure that icons and real-time features function correctly.

### OUTCOME
Resolved CSP violations and fixed invalid HTML tags for external assets.
