---
description: "Task list for Dual Fee support in admin dashboards"
---

# Tasks: Unified Dual-Fee Management

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

- [x] T001 Initialize design artifacts in specs/main/

## Phase 2: Foundational (Backend & Types)

**Purpose**: Update the core data layer to support dual fees for classes.

- [x] T002 Update `IClass` interface to include `monthlyFee: number` in `schemas/types/class.type.ts`
- [x] T003 Update `Class` Mongoose schema to include `monthlyFee: { type: Number, default: 0 }` in `schemas/models/class.model.ts`
- [x] T004 Verify `monthlyFee` exists in `ICourse` in `schemas/types/course.type.ts` (already added previously)
- [x] T005 Verify `monthlyFee` exists in `Course` model in `schemas/models/course.model.ts` (already added previously)

---

## Phase 3: User Story 1 - Course Fee Management (Priority: P1) 🎯 MVP

**Goal**: Manage both Enrollment and Monthly fees for courses in the Admin Dashboard.

**Independent Test**: Add/Edit a course, set both fees, and see them displayed correctly on the course card.

### Implementation for User Story 1

- [x] T006 [US1] Add "Monthly Fee (PKR)" input field to the Course Modal in `public/protected/admin/courses.html`
- [x] T007 [US1] Update `openModal` function in `public/protected/admin/courses.html` to populate `monthlyFee` during edits.
- [x] T008 [US1] Update `courseForm.onsubmit` in `public/protected/admin/courses.html` to include and cast `monthlyFee` to Number.
- [x] T009 [US1] Refactor `renderCourses` card template in `public/protected/admin/courses.html` to show a two-column fee display (Enrollment vs Monthly).

**Checkpoint**: Course management now fully supports dual fees.

---

## Phase 4: User Story 2 - Class Fee Management (Priority: P2)

**Goal**: Manage both Enrollment and Monthly fees for academic classes in the Admin Dashboard.

**Independent Test**: Create/Edit a class, set both fees, and see them displayed correctly on the class card.

### Implementation for User Story 2

- [x] T010 [US2] Add "Monthly Fee (PKR)" input field to the Class Modal in `public/protected/admin/classes.html`
- [x] T011 [US2] Update `openModal` function in `public/protected/admin/classes.html` to populate `monthlyFee` during edits.
- [x] T012 [US2] Update `addClassForm.onsubmit` in `public/protected/admin/classes.html` to include and cast `monthlyFee` to Number.
- [x] T013 [US2] Refactor `renderClasses` card template in `public/protected/admin/classes.html` to show a two-column fee display (Enrollment vs Monthly).

**Checkpoint**: Class management now fully supports dual fees.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T014 [P] Update `window.updateFee` prompt logic in `courses.html` and `classes.html` if needed for quick-updates (or maintain single-fee prompt if per-field update not required).
- [x] T015 Run `npx tsc` to verify zero type errors (CONSTITUTIONAL GATE)
- [x] T016 Final validation of `quickstart.md` scenarios for both pages.

---

## Dependencies & Execution Order

- **Phase 2** is a mandatory prerequisite for all UI work (T002-T003 specifically).
- **US1 (Courses)** and **US2 (Classes)** can proceed in parallel once Phase 2 is complete.
- **Phase N** follows completion of all functional updates.

## Implementation Strategy

### MVP First (User Story 1 Only)
Updating the Course management UI is the first priority as it proves the UI pattern for dual fees.

---

## Notes
- Ensure all numeric inputs have `min="0"` and appropriate `step` values.
- Card layouts should use a flexible grid or flexbox to handle the extra fee label without breaking responsiveness.
