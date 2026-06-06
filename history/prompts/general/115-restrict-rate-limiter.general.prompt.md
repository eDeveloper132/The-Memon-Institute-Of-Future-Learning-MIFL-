---
id: 115
title: Restrict rate limiting to students only
stage: general
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: none
branch: main
user: moham
command: Remove rate limiter and set this only for students only
labels: ["security", "rate-limiter", "student"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - index.ts
  - middlewares/rateLimiter.ts
  - routes/auth.routes.ts
  - routes/student.routes.ts
tests:
  - Manual verification of student routes vs other routes.
---

## Prompt

Remove rate limiter and set this only for students only

## Response snapshot

I have restricted the rate limiting mechanism to target only authenticated students.

1.  **Removed Global Application:** `generalLimiter` is no longer applied globally in `index.ts`.
2.  **Cleaned Auth Routes:** `authLimiter` was removed from authentication endpoints to ensure zero friction for all users (including guests) during login/signup.
3.  **Modified Middleware Logic:** The `generalLimiter` now explicitly skips all requests unless the user is authenticated and has the role of `student`.
4.  **Targeted Application:** The limiter is now applied as a router-level middleware in `routes/student.routes.ts`.

This ensures that admins, teachers, parents, and guests are never rate-limited, while still protecting student-facing API endpoints from abuse.

## Outcome

- ✅ Impact: All users except students are now exempt from rate limiting.
- 🧪 Tests: Refactored logic to be role-aware and skip by default.
- 📁 Files: Modified `index.ts`, `middlewares/rateLimiter.ts`, `routes/auth.routes.ts`, and `routes/student.routes.ts`.
- 🔁 Next prompts: None.
- 🧠 Reflection: While rate limiting is a security best practice, restricting it to a specific subset of users (students) allows for a better experience for staff and parents while maintaining protection where it's most likely needed.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
