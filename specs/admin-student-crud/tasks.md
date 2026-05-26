# Tasks: Admin Student CRUD Fixes

**Input**: Design documents from `/specs/admin-student-crud/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included as per the "Test-First" principle.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Verify project structure and environment for admin-student-crud fixes

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 [P] Create integration test file for user management in `tests/admin_users.test.ts`
- [X] T003 [P] Verify `User` model sparse indices for `studentId` in `schemas/models/user.model.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Password Hashing Fix (Priority: P1) 🎯 MVP

**Goal**: Fix password hashing issue when admin updates a student.

**Independent Test**: Use Supertest to update a user's password and verify they can still log in with the new password.

### Tests for User Story 1

- [X] T004 [P] [US1] Write failing integration test for password hashing on update in `tests/admin_users.test.ts`

### Implementation for User Story 1

- [X] T005 [US1] Refactor `updateUser` to use `findById` and `.save()` to trigger hashing hook in `controllers/admin.controller.ts`
- [X] T006 [US1] Verify password update hashing test passes in `tests/admin_users.test.ts`

**Checkpoint**: Password hashing fix is fully functional and verified.

---

## Phase 4: User Story 2 & 3 - Enhanced Student Listing (Priority: P2)

**Goal**: Enhance student listing with class and parent population.

**Independent Test**: Fetch students via `GET /api/admin/users?role=student` and verify `currentClass` and `parent` fields are populated objects.

### Tests for User Story 2

- [X] T007 [P] [US2] Write failing integration test for student list population in `tests/admin_users.test.ts`

### Implementation for User Story 2 & 3

- [X] T008 [US2] Enhance `getAllUsers` logic to populate `currentClass` and `parent` in `controllers/admin.controller.ts`
- [X] T009 [US3] Add manual population/handling for `studentId` updates in `controllers/admin.controller.ts`
- [X] T010 [US2] Verify student listing population test passes in `tests/admin_users.test.ts`

**Checkpoint**: Student listing and student-specific fields are correctly populated and verified.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T011 [P] Ensure error handling in `updateUser` correctly reports duplicate `studentId` or `email` errors in `controllers/admin.controller.ts`
- [X] T012 [P] Run final validation against `quickstart.md` verification steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3+)**: Depend on Phase 2 completion.
  - US1 (Hashing Fix) is the priority.
  - US2/US3 (Population) follows.

### Parallel Opportunities

- T002 and T003 can be done in parallel.
- T011 and T012 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (Hashing Fix).
3. **STOP and VALIDATE**: Ensure password updates work safely.

### Incremental Delivery

1. Add User Story 2/3 for population.
2. Final Polish.
