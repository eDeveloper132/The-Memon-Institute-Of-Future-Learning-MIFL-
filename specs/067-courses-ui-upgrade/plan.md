# Implementation Plan: Course Management UI Overhaul

**Branch**: `067-courses-ui-upgrade` | **Date**: 2026-05-30 | **Spec**: [specs/067-courses-ui-upgrade/spec.md]
**Input**: Feature specification from `/specs/067-courses-ui-upgrade/spec.md`

## Summary
Upgrade the `courses.html` interface to mirror the robust functionality of `classes.html`. This includes a responsive grid view for courses, an embedded batch management system, and streamlined student enrollment features.

## Technical Context

**Language/Version**: TypeScript / Node.js / HTML / Tailwind CSS
**Primary Dependencies**: `mongoose`, `express`, `tailwind`, `font-awesome`
**Storage**: MongoDB
**Testing**: Manual responsive testing and API verification
**Target Platform**: Vercel / Node.js
**Project Type**: Web application
**Performance Goals**: Low latency updates for batch management
**Constraints**: Must maintain parity with `Class` batch structure for UI consistency
**Scale/Scope**: All courses in the system

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Consistency: Reuses successful patterns from `classes.html`.
- [x] Simplicity: Leverages existing backend logic structures.
- [x] UI/UX: Transitions to a more modern and responsive grid view.

## Project Structure

### Documentation (this feature)

```text
specs/067-courses-ui-upgrade/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
├── contracts/
│   └── courses-api.md
└── tasks.md             
```

### Source Code (repository root)

```text
schemas/
├── types/
│   └── course.type.ts   # Add batches interface
└── models/
    └── course.model.ts   # Add batches field

controllers/
└── admin.controller.ts   # Add updateCourseBatches

routes/
└── admin.routes.ts       # Mount coursebatches endpoint

public/
└── protected/
    └── admin/
        └── courses.html  # Overhaul UI to card grid
```

**Structure Decision**: Web application structure with unified model patterns.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
