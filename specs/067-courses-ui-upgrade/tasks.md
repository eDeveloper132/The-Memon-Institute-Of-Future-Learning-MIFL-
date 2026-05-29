---
description: "Task list for Course Management UI Overhaul"
---

# Tasks: Course Management UI Overhaul

**Input**: Design documents from `/specs/067-courses-ui-upgrade/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/courses-api.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Schema & Backend Foundation)

**Purpose**: Update the data model and backend to support course batches.

- [ ] T001 Verify project structure and branch `067-courses-ui-upgrade`
- [ ] T002 [P] Update `ICourse` interface to include `batches` field in `schemas/types/course.type.ts`
- [ ] T003 Update `courseSchema` to include `batches` field (using `batchSchema` logic) in `schemas/models/course.model.ts`
- [ ] T004 Implement `updateCourseBatches` controller function in `controllers/admin.controller.ts`
- [ ] T005 [P] Mount `PATCH /api/admin/coursebatches/:id` route in `routes/admin.routes.ts`
- [ ] T006 Update `crudCourses.getAll` to populate `batches.students` in `controllers/admin.controller.ts`

---

## Phase 2: Foundational (Frontend Scaffolding)

**Purpose**: Transition the UI to a grid layout.

- [ ] T007 Refactor `public/protected/admin/courses.html`: Replace `<table>` structure with a responsive `#courseGrid` div
- [ ] T008 Implement `renderCourses()` function in `public/protected/admin/courses.html` to generate card-based UI
- [ ] T009 [P] Update `fetchCourses()` to call the new `renderCourses()` function in `public/protected/admin/courses.html`

**Checkpoint**: Courses are now displayed as cards in a responsive grid.

---

## Phase 3: User Story 1 & 4 - Grouped Student Visibility (Priority: P1) 🎯 MVP

**Goal**: View students enrolled in a course, organized by their batches.

**Independent Test**: Open a course view and verify students appear grouped by their assigned batches.

### Implementation for US1 & US4

- [ ] T010 [US4] Add "View Students" modal (mirrored from `classes.html`) to `public/protected/admin/courses.html`
- [ ] T011 [US4] Implement `viewStudents(cid, name)` function to fetch course data and render students grouped by batch in `public/protected/admin/courses.html`
- [ ] T012 [US4] Wire the "View" button on course cards to trigger `viewStudents()` in `public/protected/admin/courses.html`

**Checkpoint**: Admin can now see which students are in which batch for a specific course.

---

## Phase 4: User Story 2 - Batch Management (Priority: P1)

**Goal**: Create, delete, and manage batches within each course.

**Independent Test**: Create a new batch "Morning" for a course, and verify it saves and appears in the management list.

### Implementation for User Story 2

- [ ] T013 [US2] Add "Manage Batches" modal (mirrored from `classes.html`) to `public/protected/admin/courses.html`
- [ ] T014 [US2] Implement `manageBatches`, `refreshBatchView`, and `renderBatches` functions in `public/protected/admin/courses.html`
- [ ] T015 [US2] Implement `saveBatches` function to hit the `/api/admin/coursebatches/:id` endpoint in `public/protected/admin/courses.html`
- [ ] T016 [US2] Wire the "Batches" button on course cards to trigger `manageBatches()` in `public/protected/admin/courses.html`

**Checkpoint**: Full batch CRUD (Create, Read, Delete) is functional for courses.

---

## Phase 5: User Story 3 - Quick Assignment (Priority: P2)

**Goal**: Quickly assign unassigned students to specific course batches.

**Independent Test**: Click an unassigned student tag and successfully assign them to a course batch.

### Implementation for User Story 3

- [ ] T017 [US3] Add "Quick Assign" modal and unassigned students container to `public/protected/admin/courses.html`
- [ ] T018 [US3] Implement `renderPopulatedStudents` and `openQuickAssign` functions in `public/protected/admin/courses.html`
- [ ] T019 [US3] Update `refreshBatchView` to call `renderPopulatedStudents` in `public/protected/admin/courses.html`

**Checkpoint**: Enrollment workflow is streamlined with quick assign tags.

---

## Phase 6: Polish & Final Validation

**Purpose**: Ensure UI consistency and responsiveness.

- [ ] T020 [P] Final audit of Tailwind classes for mobile responsiveness in `public/protected/admin/courses.html`
- [ ] T021 [P] Ensure all course card badges (Department, Credits) use consistent styling with the rest of the app
- [ ] T022 Run `quickstart.md` validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must complete before any batch data can be saved/fetched.
- **Foundational (Phase 2)**: Must complete before wiring the buttons to the modals.
- **User Stories (Phase 3-5)**: Can be implemented sequentially as they build on the same modal logic.
- **Polish (Phase 6)**: Final step.

### Parallel Opportunities

- T002 and T005 in Phase 1.
- T009 in Phase 2.
- T020 and T021 in Phase 6.

---

## Implementation Strategy

### MVP First

1. Complete Setup (Backend).
2. Complete Foundational (Grid View).
3. Complete Phase 3 (Grouped View) - This proves data flow.

### Incremental Delivery

1. Add Batch Management (Phase 4).
2. Add Quick Assign (Phase 5).
3. Final Polish (Phase 6).
