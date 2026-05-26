# Tasks: Admin Teacher Management Improvements

**Input**: Design documents from `/specs/admin-teacher-management/`
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

- [ ] T001 Verify project structure and environment for admin-teacher-management in `public/protected/admin/teachers.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core scoping fixes that MUST be complete before user stories can be fully functional (CSP Fix)

- [ ] T002 Refactor `closeModal`, `openEditModal`, and `confirmDelete` to be explicitly assigned to `window` in `public/protected/admin/teachers.html`
- [ ] T003 Ensure `allTeachers` state is reliably populated after `fetchTeachers` in `public/protected/admin/teachers.html`
- [ ] T004 Implement event delegation on `teacherTableBody` for action buttons (Edit/Delete) in `public/protected/admin/teachers.html`

**Checkpoint**: Foundation ready - UI actions can now be reliably triggered without CSP violations

---

## Phase 3: User Story 1 - Registration Refinement (Priority: P1) 🎯 MVP

**Goal**: Simplify the teacher registration form and fix its behavior.

**Independent Test**: Click "Add Teacher", verify simplified fields (no Staff ID/Status), fill and submit, verify modal closes and teacher appears in list.

### Implementation for User Story 1

- [ ] T005 [US1] Remove `employeeId` and `status` fields from `addTeacherModal` in `public/protected/admin/teachers.html`
- [ ] T006 [US1] Update `addTeacherForm` submission handler to use `addEventListener` and handle `isEmailVerified` checkbox in `public/protected/admin/teachers.html`
- [ ] T007 [US1] Fix modal close behavior and form reset for `addTeacherModal` in `public/protected/admin/teachers.html`

**Checkpoint**: Teacher registration is simplified and functional.

---

## Phase 4: User Story 2, 3 & 4 - Management & Filtering (Priority: P2)

**Goal**: Implement the full edit modal and advanced filtering parity.

**Independent Test**: Use the new filter bar to search and filter teachers. Use the edit modal to update designation and reset password.

### Implementation for User Story 2, 3 & 4

- [ ] T008 [US4] Add "Verification" filter dropdown to the filter bar in `public/protected/admin/teachers.html`
- [ ] T009 [US4] Update `filterAndRender` logic to support Search, Status, and Verification filters in `public/protected/admin/teachers.html`
- [ ] T010 [US4] Update row rendering to include verification badges and improved layout in `public/protected/admin/teachers.html`
- [ ] T011 [US2/3] Implement the "Edit Teacher Profile" modal HTML with fields for Designation and Department in `public/protected/admin/teachers.html`
- [ ] T012 [US2/3] Update `openEditModal` and `editTeacherForm` submission to handle all teacher-specific fields including optional password reset in `public/protected/admin/teachers.html`

**Checkpoint**: Teacher management has full feature parity with student management.

---

## Phase 5: Polish & Consistency

**Purpose**: Final verification and UX alignment

- [ ] T013 [P] Add success/error toasts for all teacher management actions in `public/protected/admin/teachers.html`
- [ ] T014 [P] Run `quickstart.md` validation steps and verify visual consistency between student and teacher panels

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3+)**: Depend on Phase 2 completion.
  - Phase 3 (Registration) is the MVP priority.
  - Phase 4 (Full Management) follows.

### Parallel Opportunities

- T013 and T014 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (Registration Refinement).
3. **STOP and VALIDATE**: Ensure adding teachers works correctly and is CSP-safe.

### Incremental Delivery

1. Add User Story 2, 3, & 4 for full management and filtering.
2. Final Polish.
