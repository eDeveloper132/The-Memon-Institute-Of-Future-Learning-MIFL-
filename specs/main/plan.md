# Implementation Plan: Student Activity Times in Stopwatch

**Branch**: `main` | **Date**: 2026-06-07 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Enhance the existing Stopwatch Utility to allow teachers to record, save, edit, and delete activity times for specific students within their authorized classes or courses.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Mongoose, Express, Tailwind CSS
**Storage**: MongoDB (ActivityTime collection)
**Testing**: Manual visual testing, npx tsc
**Target Platform**: Web (Teacher Dashboard)
**Constraints**: Zero type errors (tsc gate). Avoid inline event handlers (CSP compliance).

## Constitution Check

- [x] I. Spec-Driven: Requirement coverage confirmed in `spec.md`.
- [x] II. Type Safety: Defining `IActivityTime` interface.
- [x] III. Verification Gate: `npx tsc` mandatory.
- [x] IV. Library-First: Logic encapsulated in schemas and controllers.
- [x] V. Simplicity: Re-using existing student fetching logic.
- [x] VI. Proactive: UI auto-updates on save/edit/delete.

## Project Structure

### Documentation

```text
specs/main/
├── plan.md              # This file
├── research.md          # State management findings
├── data-model.md        # Updated Schema definitions
└── tasks.md             # Actionable tasks
```

### Source Code

```text
schemas/
├── types/
│   └── activityTime.type.ts   # New interface
└── models/
    └── activityTime.model.ts  # New schema

controllers/
└── teacher.controller.ts  # Add endpoints for ActivityTime CRUD

routes/
└── teacher.routes.ts      # Register CRUD routes

public/protected/teacher/
└── stopwatch.html         # Overhaul to include target selection and CRUD UI
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | Using a standard CRUD pattern with a new entity keeps concerns separated from the heavy Course/Class models. |
