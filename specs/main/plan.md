# Implementation Plan: Standalone Material Uploads via Sanity

**Branch**: `main` | **Date**: 2026-06-07 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Transform the existing placeholder page at `/protected/staff/index.html` into a fully functional "Resource Hub" where teachers can upload standalone PDF and DOCX files directly to Sanity CDN. These materials can be targeted to either specific Courses or specific Classes, and will instantly appear in the respective students' dashboards.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Mongoose, Express, Tailwind CSS, Sanity Client
**Storage**: MongoDB (Material collection) & Sanity.io (Files)
**Testing**: Manual visual testing, npx tsc
**Target Platform**: Web (Staff/Teacher & Student Dashboards)
**Constraints**: Ensure backward compatibility with existing Curriculum Studio resources. Principle III (tsc gate).

## Constitution Check

- [x] I. Spec-Driven: Requirement coverage confirmed in `spec.md`.
- [x] II. Type Safety: Defining `class` reference as optional in `IMaterial`.
- [x] III. Verification Gate: `npx tsc` mandatory.
- [x] IV. Library-First: Logic remains encapsulated in schemas and existing controllers.
- [x] V. Simplicity: Re-using the `/api/teacher/materials/upload` endpoint rather than creating a new one.
- [x] VI. Proactive: Immediate visual sync for students.

## Project Structure

### Documentation

```text
specs/main/
├── plan.md              # This file
├── research.md          # Targeting logic findings
├── data-model.md        # Updated Schema definitions
└── tasks.md             # Actionable tasks
```

### Source Code

```text
schemas/
├── types/
│   └── material.type.ts   # Make course optional, add class
└── models/
    └── material.model.ts  # Make course optional, add class

controllers/
└── student.controller.ts  # Update getMyMaterials query

public/protected/
├── staff/
│   └── index.html         # Overhaul into Material Upload Hub
└── student/
    └── course-files.html  # Verify rendering of new data structure
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Optional References | A material can belong to a Course OR a Class | Forcing a material to have both or creating separate tables (`CourseMaterial`, `ClassMaterial`) adds unnecessary overhead. |
