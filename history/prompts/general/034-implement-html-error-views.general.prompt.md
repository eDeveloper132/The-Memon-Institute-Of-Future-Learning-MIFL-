---
id: 034
title: Implement HTML Error Views (404 and 429)
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: general
branch: main
user: moham
command: /sp.implement
labels: ["ux", "error-handling", "html-views"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - public/errors/429.html
  - public/errors/404.html
  - middlewares/rateLimiter.ts
  - index.ts
---

### PROMPT_TEXT
Analyze and convert this type of messages into html view like 404.html etc.

### RESPONSE_TEXT
I have implemented custom HTML error views for **404 (Not Found)** and **429 (Too Many Requests)** errors.

1. **New Error Pages**: Created `public/errors/429.html` and `public/errors/404.html`. These pages are styled with Tailwind CSS and Font Awesome to match the application's aesthetic and provide a better user experience than raw JSON.
2. **Rate Limiter Update**: Modified `middlewares/rateLimiter.ts` to use a custom handler. It now detects if a request is from a browser (accepts HTML) and serves the `429.html` page instead of a JSON object.
3. **Global 404 Handler**: Added a catch-all middleware in `index.ts` to serve the `404.html` page for any undefined routes accessed via a browser.

### OUTCOME
JSON error messages have been replaced with user-friendly HTML pages for browser-based requests.
