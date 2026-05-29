---
id: 033
title: Bypass Rate Limiter for Admin and Teacher
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: general
branch: main
user: moham
command: /sp.implement
labels: ["security", "rate-limit", "admin", "teacher"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - middlewares/rateLimiter.ts
tests_yaml:
  - none
---

### PROMPT_TEXT
Remove this for admin and teachers:
{"status":429,"message":"Too many requests from this IP, please try again after 15 minutes"}

### RESPONSE_TEXT
I have updated the rate limiting middleware to exempt users with 'admin' or 'teacher' roles.

The `generalLimiter` in `middlewares/rateLimiter.ts` now includes a `skip` function that decodes the JWT token from the request. If the user's role is identified as `admin` or `teacher`, the rate limit is bypassed. This ensures that these privileged users can perform intensive tasks without being blocked by the "Too many requests" error.

### OUTCOME
Admins and teachers are no longer subject to the global rate limit.
