---
description: "Task list for Update Course Modals implementation"
---

# Tasks: Update Course Modals

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/courses.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup

- [x] T001 Initialize design artifacts in specs/main/
- [x] T002 [P] Verify `Course` model schema in `schemas/models/course.model.ts` allows decimal numbers for `credits`

## Phase 2: Foundational (Backend)

- [x] T003 Verify `crudCourses.create` and `crudCourses.update` in `controllers/admin.controller.ts` correctly handle incoming numeric data

---

## Phase 3: User Story 1 - Register Course with Decimal Credits (Priority: P1) 🎯 MVP

**Goal**: Enable admins to register courses with fractional credit hours.

**Independent Test**: Register a course with `1.5` credits and verify it appears correctly in the list.

### Implementation for User Story 1

- [x] T004 [US1] Update `credits` input in `public/protected/admin/courses.html` to add `step="0.1"` and `min="0"`.
- [x] T005 [US1] Update `credits` card rendering in `renderCourses` function in `public/protected/admin/courses.html` to handle decimal display.
- [x] T006 [US1] Enhance `showToast` feedback in `courseForm.onsubmit` in `public/protected/admin/courses.html` to provide specific error messages from the API.

**Checkpoint**: User Story 1 (Registering) should be functional with decimal credits.

---

## Phase 4: User Story 2 - Edit Course UX & Decimals (Priority: P2)

**Goal**: Ensure smooth editing of courses with decimal credit support.

**Independent Test**: Edit an existing course, change credits to `2.5`, and verify the update persists.

### Implementation for User Story 2

- [x] T007 [US2] Update `openCourseModal` logic in `public/protected/admin/courses.html` to ensure `credits` field is populated with the raw numeric value (avoiding string conversion issues if any).
- [x] T008 [US2] Verify `id` population and `PATCH` method assignment in `courseForm.onsubmit` in `public/protected/admin/courses.html`.

**Checkpoint**: User Story 2 (Editing) should be functional with decimal credits and consistent UI state.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T009 [P] Standardize input focus styles in `courseModal` in `public/protected/admin/courses.html` to match the rest of the dashboard.
- [x] T010 Run `npx tsc` to verify zero type errors (CONSTITUTIONAL GATE)
- [x] T011 Run quickstart.md validation for both Create and Edit flows.

---

## Dependencies & Execution Order

- **Phase 1 & 2** are foundational and should be checked first.
- **US1** and **US2** both depend on the HTML updates in `courses.html`.
- **Phase N** follows completion of all functional updates.

## Implementation Strategy

### MVP First (User Story 1 Only)
Enabling decimal support in the registration flow is the primary MVP. Once T004-T006 are done, the core requirement is satisfied.
