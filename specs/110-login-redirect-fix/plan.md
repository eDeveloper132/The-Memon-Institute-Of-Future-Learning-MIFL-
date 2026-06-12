# Implementation Plan: Login Redirect Fix

**Branch**: `110-login-redirect-fix` | **Date**: 2026-06-12 | **Spec**: `/specs/110-login-redirect-fix/spec.md`
**Input**: Feature specification from `/specs/110-login-redirect-fix/spec.md`

## Summary

Resolve an issue where users are incorrectly routed to the public landing page after logging in. The fix involves updating the frontend login redirect destination and introducing a soft-auth check on the root route to automatically direct authenticated users to the dashboard.

## Technical Context

**Language/Version**: TypeScript (Node.js/Express), Vanilla JS
**Primary Dependencies**: Express (cookies)
**Storage**: N/A
**Testing**: Manual login and routing verification
**Target Platform**: Vercel
**Project Type**: Web application
**Performance Goals**: N/A
**Constraints**: Do not lock out public guests from the root route.
**Scale/Scope**: Minor routing and frontend logic update.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Spec-Driven: Requirement coverage confirmed in `/specs/110-login-redirect-fix/spec.md`.
- [x] II. Type Safety: Maintained in `index.ts`.
- [x] III. Verification Gate: `npx tsc` mandatory pre-commit.
- [x] IV. Library-First: Logic remains in route handlers.
- [x] V. Simplicity: Minimal required changes to correct the routing logic.
- [x] VI. Proactive: Not applicable.
- [x] VII. Database Integrity: No database changes.

## Project Structure

### Documentation (this feature)

```text
specs/110-login-redirect-fix/
├── plan.md              # This file
├── research.md          # Technical decisions
├── quickstart.md        # Verification guide
└── tasks.md             # To be generated
```

### Source Code (repository root)

```text
public/
└── auth/
    └── login.html       # Frontend redirect logic update

index.ts                 # Root route soft-auth check
```

**Structure Decision**: Enhancing existing files in the web application structure.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
