---
description: "Task list for Login Redirect Fix"
---

# Tasks: Login Redirect Fix

**Input**: Design documents from `/specs/110-login-redirect-fix/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Organization**: Tasks are grouped by phase and mapped to user stories [US1, US2].

## Phase 1: Setup

- No setup tasks required for this bug fix.

---

## Phase 2: Foundational

- No foundational tasks required. Changes are isolated to specific endpoints/files.

---

## Phase 3: User Story 1 - Automatic Redirect after Login (Priority: P1)

**Goal**: Ensure users are directed to their dashboard immediately after logging in.

**Independent Test**: Perform a login at `/api/auth/login` and confirm the browser redirects to `/home`.

- [x] T001 [US1] Update success redirect from `/` to `/home` in `public/auth/login.html`

---

## Phase 4: User Story 2 - Authenticated Root Access (Priority: P2)

**Goal**: Automatically route logged-in users away from the public landing page to their dashboard.

**Independent Test**: While logged in, navigate to `/` and confirm automatic redirection to `/home`.

- [x] T002 [US2] Add soft-auth check for `req.cookies.token` to `app.get("/")` in `index.ts`
- [x] T003 [US2] Update `app.get("/")` to redirect to `/home` if token exists, else serve `landing.html` in `index.ts`

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T004 Run `npx tsc` to verify zero type errors (CONSTITUTIONAL GATE)
- [x] T005 Verify guest access to `/` is preserved (no token = landing page)

---

## Dependencies & Execution Order

1. **User Story 1 & 2**: Can be executed independently.
2. **Polish (Phase 5)**: Must follow the implementation of US2 to verify TypeScript compliance in `index.ts`.

## Implementation Strategy

- Apply the frontend change (T001) first as it directly addresses the user's reported symptom.
- Apply the backend routing enhancement (T002, T003) to ensure a robust user experience across all navigation paths.
