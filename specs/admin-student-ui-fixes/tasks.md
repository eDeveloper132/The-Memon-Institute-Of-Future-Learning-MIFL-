# Tasks: Admin Student UI Fixes

**Input**: Design documents from `/specs/admin-student-ui-fixes/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are included as per the project constitution's "Test-First" principle (manual verification as per quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Project initialization

- [X] T001 Verify project structure and environment for admin-student-ui-fixes in `public/protected/admin/students.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core scoping fixes that MUST be complete before user stories can be fully functional

- [X] T002 Refactor `closeModal`, `openEditModal`, and `confirmDelete` to be explicitly assigned to `window` in `public/protected/admin/students.html`
- [X] T003 Ensure `allStudents` state is reliably populated after `fetchStudents` in `public/protected/admin/students.html`

**Checkpoint**: Foundation ready - UI actions can now be reliably triggered

---

## Phase 3: User Story 1 & 2 - Registration Modal Refinement (Priority: P1) 🎯 MVP

**Goal**: Simplify the registration form and fix its close button.

**Independent Test**: Click "Add Student", verify missing fields, fill and submit, verify modal closes. Re-open and verify "X" button works.

### Implementation for User Story 1 & 2

- [X] T004 [US1] Remove `studentId` and `status` fields from `addStudentModal` in `public/protected/admin/students.html`
- [X] T005 [US1] Ensure `addStudentForm` submission handles the checkbox for `isEmailVerified` correctly in `public/protected/admin/students.html`
- [X] T006 [US2] Fix `closeModal('addStudentModal')` trigger and ensure form reset in `public/protected/admin/students.html`

**Checkpoint**: Registration is simplified and the modal behaves correctly.

---

## Phase 4: User Story 3 - Edit Modal Fix (Priority: P2)

**Goal**: Restore the ability to open the edit modal and save changes.

**Independent Test**: Click the edit icon on a row, verify modal opens with data, update a field, and save.

### Implementation for User Story 3

- [X] T007 [US3] Verify `openEditModal` correctly identifies the student from `allStudents` and populates the form in `public/protected/admin/students.html`
- [X] T008 [US3] Ensure `editStudentForm` submission correctly handles the `PATCH` request and partial updates in `public/protected/admin/students.html`

**Checkpoint**: Student profiles can now be edited and saved.

---

## Phase 5: User Story 4 - Delete Action Fix (Priority: P3)

**Goal**: Restore the functionality of the delete student button.

**Independent Test**: Click the delete icon, confirm the prompt, and verify the row is removed.

### Implementation for User Story 4

- [X] T009 [US4] Fix `confirmDelete` to correctly call the `DELETE` API and refresh the list in `public/protected/admin/students.html`

**Checkpoint**: Students can now be deleted from the system.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: UI/UX improvements

- [X] T010 [P] Add form validation feedback (toasts) for all actions in `public/protected/admin/students.html`
- [X] T011 [P] Run `quickstart.md` validation steps and verify all UI interactions are responsive in `public/protected/admin/students.html`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3+)**: Depend on Phase 2 completion.
  - Phase 3 (Registration) is the MVP priority.
  - Phase 4 (Edit) and Phase 5 (Delete) follow.

### Parallel Opportunities

- T010 and T011 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (Registration Refinement).
3. **STOP and VALIDATE**: Ensure adding students is easy and the modal closes properly.

### Incremental Delivery

1. Add User Story 3 for editing.
2. Add User Story 4 for deletion.
3. Final Polish.
