# Implementation Plan: Unified Dual-Fee Management

**Branch**: `main` | **Date**: 2026-06-06 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Refactor the Admin Dashboard (Courses and Classes) to support a dual-fee model (Enrollment Fee + Monthly Fee). This includes updating the Class schema/types, as well as the UI for both management pages.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Express, Mongoose, Tailwind CSS
**Storage**: MongoDB
**Testing**: Manual verification, npx tsc
**Target Platform**: Web
**Project Type**: Web Application
**Constraints**: Strict CSP, Principle III (tsc gate)
**Scale/Scope**: Admin Dashboard (Course & Class Management)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Spec-Driven: Requirements captured in `spec.md`.
- [x] II. Type Safety: Schema and interfaces will be updated to include `monthlyFee`.
- [x] III. Verification Gate: `npx tsc` mandatory after implementation.
- [x] IV. Library-First: Logic remains in controllers/models.
- [x] V. Simplicity: Smallest viable change to existing HTML templates.
- [x] VI. Proactive: Real-time UI updates after saving.

## Project Structure

### Documentation

```text
specs/main/
├── plan.md              # This file
├── research.md          # Implementation details
└── tasks.md             # Actionable tasks
```

### Source Code

```text
schemas/
├── types/
│   ├── class.type.ts    # Add monthlyFee
│   └── course.type.ts   # Verify monthlyFee (added previously)
└── models/
    ├── class.model.ts   # Add monthlyFee
    └── course.model.ts  # Verify monthlyFee (added previously)

public/protected/admin/
├── courses.html         # UI updates for dual fees
└── classes.html         # UI updates for dual fees
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
