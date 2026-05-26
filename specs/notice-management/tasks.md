# Tasks: Notice Management

**Input**: Design documents from `/specs/notice-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included as per the project constitution's "Test-First" principle.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Verify project structure and environment for feature development

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 [P] Create integration test boilerplate in `tests/notices.test.ts` (using supertest)
- [X] T003 Ensure `Notice` model indices are correct in `schemas/models/notice.model.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Admin CRUD (Priority: P1) 🎯 MVP

**Goal**: Allow administrators to create, list, update, and delete notices.

**Independent Test**: Use Postman or curl to hit `/api/admin/notices` with an admin token and verify CRUD operations.

### Tests for User Story 1

- [X] T004 [P] [US1] Write failing integration tests for Admin CRUD in `tests/notices.test.ts`

### Implementation for User Story 1

- [X] T005 [US1] Implement `crudNotices` logic in `controllers/admin.controller.ts`
- [X] T006 [US1] Register notice routes in `routes/admin.routes.ts`
- [X] T007 [US1] Verify Admin CRUD tests pass

**Checkpoint**: Admin CRUD is fully functional and testable independently.

---

## Phase 4: User Story 2 - User Viewing (Priority: P2)

**Goal**: Allow Students and Teachers to view relevant and unexpired notices.

**Independent Test**: Log in as a student/teacher and verify `GET /api/[role]/notices` returns filtered results.

### Tests for User Story 2

- [X] T008 [P] [US2] Write failing integration tests for Student/Teacher retrieval in `tests/notices.test.ts`

### Implementation for User Story 2

- [X] T009 [US2] Implement `getNotices` for students in `controllers/student.controller.ts`
- [X] T010 [US2] Register notice route in `routes/student.routes.ts`
- [X] T011 [US2] Implement `getNotices` for teachers in `controllers/teacher.controller.ts`
- [X] T012 [US2] Register notice route in `routes/teacher.routes.ts`
- [X] T013 [US2] Verify User Viewing tests pass

**Checkpoint**: Students and Teachers can view relevant notices.

---

## Phase 5: User Story 3 - Real-time Notifications (Priority: P3)

**Goal**: Emit a socket event when a new notice is published.

**Independent Test**: Connect a socket client and verify receipt of `notification` event on notice creation.

### Implementation for User Story 3

- [X] T014 [US3] Add `req.io.emit` broadcast to the create notice endpoint in `controllers/admin.controller.ts`
- [X] T015 [US3] Verify real-time notification with a manual socket test

**Checkpoint**: Real-time notifications are active.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T016 [P] Verify parent-side notice retrieval alignment in `controllers/parent.controller.ts`
- [X] T017 [P] Run `quickstart.md` validation steps
- [X] T018 Code cleanup and final verification of expiry/pinned logic

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3+)**: Depend on Phase 2 completion.
  - US1 (Admin CRUD) is the priority.
  - US2 (Viewing) and US3 (Socket) can follow.

### Parallel Opportunities

- T002 and T003 can be done in parallel.
- T016 and T017 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (Admin CRUD).
3. **STOP and VALIDATE**: Ensure Admin can manage notices.

### Incremental Delivery

1. Add User Story 2 for viewing.
2. Add User Story 3 for real-time updates.
3. Final Polish.
