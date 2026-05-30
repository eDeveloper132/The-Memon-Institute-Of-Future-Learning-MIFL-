---
description: "Task list for Targeted Assignments implementation"
---

# Tasks: Targeted Assignments

**Input**: Design documents from `/specs/091-targeted-assignments/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual verification in teacher and student dashboards.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: UI state and global style initialization

- [X] T001 Initialize targeting state variables (mode, selectedCourse, selectedBatch) in `public/protected/teacher/assignments.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core schema and model updates that MUST be complete before ANY user story implementation

- [X] T002 [P] Update `IAssignment` interface in `schemas/types/assignment.type.ts` to add optional `batch` field and make `class` optional
- [X] T003 Update `Assignment` model in `schemas/models/assignment.model.ts` to add `batch` field and update field requirements

**Checkpoint**: Foundation ready - backend logic and UI implementation can now begin.

---

## Phase 3: User Story 1 - Create Targeted Assignment (Priority: P1) 🎯 MVP

**Goal**: Teacher can target assignments to a Class or a specific Batch.

**Independent Test**: Create an assignment for a specific batch and verify it is correctly saved in the database with the batch ID.

### Implementation for User Story 1

- [X] T004 [US1] Refactor "Post New Assignment" modal to include Target Mode selector (Standard Class / Course Batch) in `public/protected/teacher/assignments.html`
- [X] T005 [US1] Implement dynamic dropdown logic in the modal (reuse `fetchTeacherCourses`/`fetchTeacherClasses` patterns) in `public/protected/teacher/assignments.html`
- [X] T006 [US1] Update `createAssignment` controller in `controllers/teacher.controller.ts` to handle the new `batch` field and optional `class`
- [X] T007 [US1] Update form submission logic in `public/protected/teacher/assignments.html` to send the correct target IDs based on selected mode

**Checkpoint**: User Story 1 complete - Assignments can now be targeted to batches.

---

## Phase 4: User Story 2 - View Assignment Targets (Priority: P1)

**Goal**: Assignment list displays the specific target (Class or Batch).

**Independent Test**: View the assignment grid and verify cards show "Course Title - Batch Name" for batch-targeted assignments.

### Implementation for User Story 2

- [X] T008 [US2] Update `getAssignments` controller in `controllers/teacher.controller.ts` to deep populate the `course.batches` to retrieve batch names
- [X] T009 [US2] Update `renderAssignments` in `public/protected/teacher/assignments.html` to display the specific target name on the assignment card

**Checkpoint**: User Story 2 complete - Targets are clearly visible in the dashboard.

---

## Phase 5: User Story 3 - Targeted Notifications (Priority: P2)

**Goal**: Only relevant students receive real-time notifications.

**Independent Test**: Post an assignment to a batch and verify that only students in that batch receive a Socket.IO notification.

### Implementation for User Story 3

- [X] T010 [US3] Update notification logic in `createAssignment` (controllers/teacher.controller.ts) to emit to the appropriate room or filtered student set

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T011 [P] Ensure error handling in the UI modal displays clear messages if targeting data fails to load in `public/protected/teacher/assignments.html`
- [X] T012 Run `quickstart.md` validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: BLOCKS all User Stories.
- **User Stories (Phase 3-5)**: Must complete Phase 2 first. US1 is the primary dependency for US2 and US3.

### Parallel Opportunities

- T002 and T003 can be developed together.
- Phase 2 backend work can technically happen in parallel with Phase 3 UI layout (T004) if different files are handled.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundational schema updates.
2. Implement the new targeted creation UI (US1).
3. Update the display logic to show targets (US2).
4. **STOP and VALIDATE**: Verify end-to-end creation and display flow.

### Incremental Delivery

- Backend readiness (Phase 2).
- Targeted creation capability (Phase 3).
- Display and awareness (Phase 4).
- Real-time notification refinement (Phase 5).
