---
description: "Task list for Parent Management feature implementation"
---

# Tasks: Parent Management

**Input**: Design documents from `/specs/070-parent-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual verification is preferred as per the plan. No automated tests were explicitly requested in the spec.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Add "Parents" to the `admin` links array in `public/components/ui-components.ts`
- [X] T002 [P] Add a "Parent Management" quick-access card to the admin dashboard in `public/protected/admin/index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core backend infrastructure that MUST be complete before user story UI implementation

- [X] T003 Implement `linkParentToStudents` controller in `controllers/admin.controller.ts` (syncs `parent`, `parentName`, `parentContact` on Students)
- [X] T004 Mount `POST /api/admin/parents/link` in `routes/admin.routes.ts`
- [X] T005 Update `getAllUsers` in `controllers/admin.controller.ts` to support fetching students linked to a parent when `role=parent` is requested

**Checkpoint**: Backend API is ready - UI implementation can now begin.

---

## Phase 3: User Story 1 - Create Parent Account (Priority: P1) 🎯 MVP

**Goal**: Admin can create a new parent account.

**Independent Test**: Create a parent via the new UI or API and verify they appear in the user list with role 'parent'.

### Implementation for User Story 1

- [X] T006 [P] [US1] Create `public/protected/admin/parents.html` by copying and adapting the `students.html` template
- [X] T007 [US1] Implement "Add Parent" modal form and API integration (calling `POST /api/admin/users`) in `public/protected/admin/parents.html`
- [X] T008 [US1] Add basic form validation and success/error toasts in `public/protected/admin/parents.html`

**Checkpoint**: User Story 1 complete - Parent accounts can now be created via UI.

---

## Phase 4: User Story 2 - Link Parent to Students (Priority: P1)

**Goal**: Admin can link a parent to one or more students.

**Independent Test**: Select a parent, select students in the modal, and verify the link is persisted in the database and shown on the student's profile.

### Implementation for User Story 2

- [X] T009 [US2] Implement "Link Students" modal with a searchable/filterable student list in `public/protected/admin/parents.html`
- [X] T010 [US2] Implement the linking logic to call `POST /api/admin/parents/link` in `public/protected/admin/parents.html`
- [X] T011 [US2] Implement a view to see currently linked students for each parent in `public/protected/admin/parents.html`

**Checkpoint**: User Story 2 complete - Parents and students can now be linked.

---

## Phase 5: User Story 3 - Manage Parents UI (Priority: P2)

**Goal**: Full CRUD and list management for parents.

**Independent Test**: List all parents, edit parent details, and delete a parent (verifying students are unlinked).

### Implementation for User Story 3

- [X] T012 [P] [US3] Implement parent list table with pagination/search in `public/protected/admin/parents.html`
- [X] T013 [US3] Implement "Edit Parent" functionality (linking to generic `PATCH /api/admin/users/:id`) in `public/protected/admin/parents.html`
- [X] T014 [US3] Implement "Delete Parent" functionality (including confirmation and unlinking logic check) in `public/protected/admin/parents.html`

**Checkpoint**: All user stories functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T015 [P] Ensure `public/protected/admin/students.html` correctly displays the linked parent's name in the student table
- [X] T016 Conduct a full end-to-end walkthrough of the Parent Management flow
- [X] T017 Run `quickstart.md` validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: BLOCKS Phase 3 and 4.
- **User Stories (Phase 3-5)**: 
  - US1 (Phase 3) is a prerequisite for US2 (Phase 4) because you need a parent to link students to.
  - US3 (Phase 5) adds management features but is lower priority (P2).

### Parallel Opportunities

- T001 and T002 (Setup) can run in parallel.
- T006 (UI Template) can be worked on in parallel with Phase 2 backend work.
- Once Phase 2 is done, UI logic for different modals can proceed semi-independently.

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Setup + Foundational Backend.
2. Complete US1: Create Parent.
3. Complete US2: Link Students.
4. **STOP and VALIDATE**: Verify a parent can be created and linked to students.

### Incremental Delivery

- Each phase delivers a functional piece of the parent management system.
- US3 completes the management lifecycle (edit/delete/list).
