# Implementation Plan: Update Course Modals

**Branch**: `main` | **Date**: 2026-06-06 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Refactor the "Register New Course" and "Edit Course" modals in the Admin Dashboard to support decimal credit hours and improve overall functionality and error handling.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Express, Mongoose, Tailwind CSS
**Storage**: MongoDB
**Testing**: Manual verification, npx tsc
**Target Platform**: Web
**Project Type**: Web Application
**Performance Goals**: N/A
**Constraints**: Strict CSP (no inline handlers), Principle III (tsc gate)
**Scale/Scope**: Admin Course Management

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Spec-Driven: Requirement coverage confirmed in `spec.md`.
- [x] II. Type Safety: Using existing `ICourse` types.
- [x] III. Verification Gate: `npx tsc` will be run after implementation.
- [x] IV. Library-First: Logic remains in controllers/services.
- [x] V. Simplicity: Targeted changes to `courses.html`.
- [x] VI. Proactive: UI feedback via toasts.

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
public/protected/admin/
└── courses.html         # Main UI for course management

controllers/
└── admin.controller.ts   # Backend CRUD logic for courses
```

**Structure Decision**: Modifying the existing admin courses page and verifying the backend controller.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
