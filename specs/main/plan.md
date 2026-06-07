# Implementation Plan: Daily Schedule for Curriculum Milestones

**Branch**: `main` | **Date**: 2026-06-06 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Transform the hierarchical curriculum system to support a third level of granularity: "Daily Schedules" within "Weekly Milestones". This will provide teachers with a powerful planning tool and students with a clear daily roadmap.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Mongoose, Express, Tailwind CSS
**Storage**: MongoDB (Course & Class collections)
**Testing**: Manual visual testing, npx tsc
**Target Platform**: Web (Teacher & Student Dashboards)
**Constraints**: Nested Mongoose sub-documents, Principle III (tsc gate)

## Constitution Check

- [x] I. Spec-Driven: Requirement coverage confirmed in `spec.md`.
- [x] II. Type Safety: Defining `IDaySchedule` and updating `ICurriculumModule`.
- [x] III. Verification Gate: `npx tsc` mandatory.
- [x] IV. Library-First: Logic remains encapsulated in schema definitions and rendering utilities.
- [x] V. Simplicity: Reusing the existing "compact row" pattern from the studio redesign for daily entries.
- [x] VI. Proactive: Immediate visual sync in the IDE sidebar.

## Project Structure

### Documentation

```text
specs/main/
├── plan.md              # This file
├── research.md          # Nested data structure findings
├── data-model.md        # Updated Schema definitions
└── tasks.md             # Actionable tasks
```

### Source Code

```text
schemas/
├── types/
│   └── course.type.ts   # Update ICurriculumModule and add IDaySchedule
└── models/
    ├── course.model.ts  # Add daySchedules to curriculumModuleSchema
    └── class.model.ts   # Add daySchedules to curriculumModuleSchema

public/protected/
├── teacher/
│   └── curriculum.html  # Refactor to include nested Day Editor
└── student/
    └── curriculum.html  # Refactor to display Daily Schedules
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Deep Nesting | Required by business logic (Section -> Week -> Day) | Flattening would lose the essential temporal context of a "Week". |
