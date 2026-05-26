# Tasks: Admin Teacher Attendance Customization

**Input**: Design documents from `/specs/admin-teacher-attendance-customization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are included as per the project constitution's "Test-First" principle.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Project initialization

- [X] T001 Verify project structure and environment for admin-teacher-attendance-customization in `public/protected/admin/teacher-attendance.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data layer updates required for all user stories

- [X] T002 [P] Update `IAttendance` interface to include `checkIn` and `checkOut` in `schemas/types/attendance.type.ts`
- [X] T003 [P] Update `attendanceSchema` to include `checkIn` and `checkOut` fields in `schemas/models/attendance.model.ts`
- [X] T004 Ensure `class` field is optional for teacher roles in `schemas/models/attendance.model.ts`
- [X] T005 [P] Create integration test boilerplate in `tests/attendance.test.ts`

**Checkpoint**: Data layer is ready - backend logic can now be implemented

---

## Phase 3: User Story 1 - Viewing Attendance (Priority: P1) 🎯 MVP

**Goal**: Admin can view teacher attendance for any date with precise timestamps.

**Independent Test**: Select a date on the dashboard and verify the list shows correct status and actual check-in/out times.

### Tests for User Story 1

- [X] T006 [P] [US1] Write failing integration tests for precise timestamp retrieval in `tests/attendance.test.ts`

### Implementation for User Story 1

- [X] T007 [US1] Refactor `getSystemAttendance` in `controllers/admin.controller.ts` to include `checkIn` and `checkOut` in the response
- [X] T008 [US1] Ensure `getSystemAttendance` populates teacher names and IDs correctly in `controllers/admin.controller.ts`
- [X] T009 [US1] Update table rendering logic in `public/protected/admin/teacher-attendance.html` to display `checkIn` and `checkOut` times
- [X] T010 [US1] Verify precise timestamp retrieval tests pass in `tests/attendance.test.ts`

**Checkpoint**: Viewing functionality is functional and verified.

---

## Phase 4: User Story 3 - Advanced Filtering (Priority: P2)

**Goal**: Filter teacher attendance by name, status, and date.

**Independent Test**: Use the search bar and status dropdown to filter the attendance list.

### Implementation for User Story 3

- [X] T011 [US3] Port the search and status filter UI bar from `students.html` to `public/protected/admin/teacher-attendance.html`
- [X] T012 [US3] Implement `filterAndRender` logic to support real-time filtering in `public/protected/admin/teacher-attendance.html`

**Checkpoint**: Admins can now filter the attendance logs effectively.

---

## Phase 5: User Story 2 - Manual Attendance Recording (Priority: P3)

**Goal**: Admin can add attendance records with custom dates and times.

**Independent Test**: Click "Record Attendance", choose a teacher and a past date/time, and verify the record appears in the list.

### Tests for User Story 2

- [X] T013 [P] [US2] Write failing integration tests for manual record creation with custom timestamps in `tests/attendance.test.ts`

### Implementation for User Story 2

- [X] T014 [US2] Create a new `manualRecordAttendance` method in `controllers/admin.controller.ts` to handle `POST` requests with custom timestamps
- [X] T015 [US2] Register the `POST /api/admin/attendance` route in `routes/admin.routes.ts`
- [X] T016 [US2] Implement the "Add Attendance" modal with `datetime-local` inputs in `public/protected/admin/teacher-attendance.html`
- [X] T017 [US2] Connect the modal form to the manual record API in `public/protected/admin/teacher-attendance.html`
- [X] T018 [US2] Verify manual recording tests pass in `tests/attendance.test.ts`

**Checkpoint**: Manual attendance recording is active.

---

## Phase 6: Polish & Security

**Purpose**: UX improvements and CSP compliance

- [X] T019 Refactor `teacher-attendance.html` to remove all inline event handlers for CSP compliance
- [X] T020 [P] Add success/error toasts for all actions in `public/protected/admin/teacher-attendance.html`
- [X] T021 [P] Run `quickstart.md` validation steps and verify visual consistency

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3+)**: Depend on Phase 2 completion.
  - Phase 3 (Viewing) is the MVP priority.
  - Phase 4 (Filtering) and Phase 5 (Recording) follow.

### Parallel Opportunities

- T002, T003, and T005 can be done in parallel.
- T020 and T021 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (Viewing Attendance).
3. **STOP and VALIDATE**: Ensure Admin can view existing records with times.

### Incremental Delivery

1. Add User Story 3 for better directory management.
2. Add User Story 2 for manual entry flexibility.
3. Final Polish and Security.
