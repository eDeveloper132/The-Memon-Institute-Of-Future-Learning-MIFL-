---
id: 163
title: Fix Login and Session Issues
stage: green
date: 2026-06-08
surface: agent
model: gemini-2.0-flash
feature: auth
branch: main
user: moham
command: fix login issue
labels: ["auth", "bug-fix", "session"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - controllers/auth.controller.ts
 - middlewares/auth.ts
 - public/components/auth-components.ts
tests:
 - npx tsx repro_login.ts
---

## Prompt

fix login issue

## Response snapshot

I have identified and fixed several issues related to login and session management:
1. **Fixed "Remember Me" bug**: The JWT token now correctly matches the cookie's 30-day expiration when "Remember Me" is selected. Previously, it was hardcoded to 1 day.
2. **Standardized Cookie Clearing**: Updated the authentication middleware to clear cookies using the root path (`/`), preventing multiple session cookies and authentication loops.
3. **Improved Email Sanitization**: Added explicit `trim()` and `toLowerCase()` to emails during login and signup to prevent credential mismatches.
4. **Enhanced Component Reliability**: Improved the `AuthInput` custom element to correctly handle prefilled values (like remembered emails) without relying on fragile timeouts.
5. **Secure Protocol Usage**: Ensured that password reset and email verification links use the correct protocol (HTTPS) when running behind a proxy like Vercel.

## Outcome

- ✅ Impact: Resolved session expiration issues and improved login reliability across different platforms.
- 🧪 Tests: Verified using `repro_login.ts`, confirming that the JWT now correctly receives a 30-day expiration when requested.
- 📁 Files: Updated `controllers/auth.controller.ts`, `middlewares/auth.ts`, and `public/components/auth-components.ts`.
- 🔁 Next prompts: None.
- 🧠 Reflection: The mismatch between cookie lifespan and token expiration was a significant source of user frustration.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
