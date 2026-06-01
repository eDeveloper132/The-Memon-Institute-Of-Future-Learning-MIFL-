---
description: "Actionable tasks for Student Enrollment Workflow implementation"
---

# Tasks: Student Enrollment Workflow

**Input**: Design documents from `/specs/103-student-enrollment-workflow/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/enrollment-api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure confirmation

- [x] T001 Verify project structure and existence of `public/protected/admin/oversight/` directory
- [x] T002 Ensure backend connectivity for enrollment routes in `index.ts`
- [x] T003 [P] Confirm `.env` configuration for MONGODB_URI

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic and models required for all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Update `schemas/models/class.model.ts` to include `enrollmentFee` field
- [x] T005 Update `schemas/models/course.model.ts` to include `enrollmentFee` field
- [x] T006 Create `schemas/models/enrollmentRequest.model.ts` for tracking applications
- [x] T007 [P] Implement `enrollment.controller.ts` boilerplate with basic error handling
- [x] T008 [P] Register enrollment routes in a new `routes/enrollment.routes.ts` or update existing ones

---

## Phase 3: User Story 1 - Student Enrollment Request (Priority: P1) 🎯 MVP

**Goal**: Students can browse and apply for classes/courses from their dashboard.

**Independent Test**: Log in as a student, see "Available Classes", click "Apply", and see a "Pending" badge.

### Implementation for User Story 1

- [x] T009 [US1] Implement `GET /api/enrollment/available` in `controllers/enrollment.controller.ts`
- [x] T010 [US1] Implement `POST /api/enrollment/apply` with "1 Class Max" validation in `controllers/enrollment.controller.ts`
- [x] T011 [US1] Update student dashboard `public/protected/student/index.html` to display available classes/courses
- [x] T012 [US1] Add "Apply" button logic and "Pending" status rendering in `public/protected/student/index.html`
- [x] T013 [US1] Implement real-time status update via Socket.io in `public/protected/student/index.html`

**Checkpoint**: User Story 1 (Student Application) is fully functional and testable.

---

## Phase 4: User Story 2 - Admin Approval & Fee Management (Priority: P1)

**Goal**: Admins can set fees and process enrollment requests.

**Independent Test**: Admin sets a fee in `classes.html`, then approves a request in the new `enrollment-requests.html`.

### Implementation for User Story 2

- [x] T014 [US2] Update `public/protected/admin/classes.html` UI to include an "Enrollment Fee" input field
- [x] T015 [US2] Update `public/protected/admin/courses.html` UI to include an "Enrollment Fee" input field
- [x] T016 [US2] Implement `PATCH /api/admin/enrollment/requests/:id` (Approve/Deny) in `controllers/admin.controller.ts`
- [x] T017 [US2] Create `public/protected/admin/enrollment-requests.html` for managing applications
- [x] T018 [US2] Implement student list auto-update logic upon request approval in `controllers/admin.controller.ts`

**Checkpoint**: User Story 2 (Admin Approval) is fully functional.

---

## Phase 5: User Story 3 - Request Cancellation (Priority: P2)

**Goal**: Students can cancel their own pending applications.

**Independent Test**: Student clicks "Cancel" on a pending request and the request is removed.

### Implementation for User Story 3

- [x] T019 [US3] Implement `PATCH /api/enrollment/requests/:id/cancel` in `controllers/enrollment.controller.ts`
- [x] T020 [US3] Add "Cancel Application" button to the student dashboard in `public/protected/student/index.html`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and validation

- [x] T021 [P] Documentation updates in `specs/103-student-enrollment-workflow/quickstart.md`
- [x] T022 Code cleanup and responsive UI check across all updated views
- [x] T023 Run final validation against all scenarios in `specs/103-student-enrollment-workflow/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be completed first
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational completion
- **Polish (Final Phase)**: Depends on all user stories being functional

### Parallel Opportunities

- Tasks marked [P] can run in parallel
- Models in Phase 2 (T004-T006) can be updated simultaneously
- User Stories can be worked on in parallel after Phase 2 is complete

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational logic.
2. Build Student Application UI (US1).
3. Manually approve via DB/API to verify student is added.

### Incremental Delivery

1. Foundation -> Student Application -> Admin Approval -> Cancellation -> Polish
