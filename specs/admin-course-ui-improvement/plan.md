# Implementation Plan: Admin Course UI Improvement

**Branch**: `admin-course-ui-improvement` | **Date**: 2026-05-26 | **Spec**: [specs/admin-course-ui-improvement/spec.md](spec.md)

## Summary
Refactor the Course registration UI to use a dynamic dropdown for department selection instead of manual ID entry.

## Technical Context
**Language/Version**: Node.js (TypeScript)
**Primary Dependencies**: Express, Mongoose
**Storage**: MongoDB
**Constraints**: Admin-only access.

## Constitution Check
- [x] **Test-First**: I will manually verify the dropdown population and course saving.
- [x] **Simplicity**: Minimal changes to `admin.controller.ts` and `courses.html`.

## Project Structure
### Source Code
```text
controllers/
└── admin.controller.ts      # Add crudDepartments.getAll

routes/
└── admin.routes.ts         # Add GET /departments

public/protected/admin/
└── courses.html             # Replace input with select
```

## Phase 0: Research & API Setup
- [x] Confirmed `Department` model exists.
- [ ] Implement `crudDepartments.getAll` in `admin.controller.ts`.
- [ ] Register route in `admin.routes.ts`.

## Phase 1: Frontend Refactor
- [ ] Fetch departments in `courses.html` during `init()`.
- [ ] Replace text input with `<select>` element in the modal.
- [ ] Map API response to select options.

## Phase 2: Validation
- [ ] Verify course creation with selected department.
