---
description: "Task list for Enhanced Teacher Attendance implementation"
---

# Tasks: Enhanced Teacher Attendance

**Input**: Design documents from `/specs/086-enhanced-teacher-attendance/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual verification via teacher dashboard.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: UI state initialization

- [X] T001 [P] Define `activeMode` ('class' vs 'batch') and new state variables in `public/protected/teacher/attendance.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core backend infrastructure that MUST be complete before ANY user story can be implemented

- [X] T002 Implement `getTeacherCourses` controller in `controllers/teacher.controller.ts` (returns courses with embedded batches)
- [X] T003 Update `getAttendanceData` in `controllers/teacher.controller.ts` to handle `courseId` and `batchId` query parameters
- [X] T004 Update `markAttendance` in `controllers/teacher.controller.ts` to support optional `courseId` in body and Attendance record
- [X] T005 [P] Mount `GET /courses` route in `routes/teacher.routes.ts`

**Checkpoint**: Backend API is ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Attendance Mode Selection (Priority: P1) 🎯 MVP

**Goal**: Teacher can choose between "Full Class" and "Course Batch" attendance.

**Independent Test**: Switch between modes and verify the correct dropdowns appear/disappear.

### Implementation for User Story 1

- [X] T006 [US1] Add Mode Toggle (Standard Class / Course Batch) and dynamic dropdown containers in `public/protected/teacher/attendance.html`
- [X] T007 [US1] Implement `fetchTeacherCourses` and populate the Course dropdown in `public/protected/teacher/attendance.html`
- [X] T008 [US1] Implement batch dropdown population logic based on selected Course in `public/protected/teacher/attendance.html`

**Checkpoint**: At this point, the selection UI is fully functional.

---

## Phase 4: User Story 2 - Batch Student Loading (Priority: P1)

**Goal**: Correct students are loaded when a batch is selected.

**Independent Test**: Select a batch and verify only enrolled students appear in the table.

### Implementation for User Story 2

- [X] T009 [US2] Update `loadStudents` function to send `courseId` and `batchId` when in 'batch' mode in `public/protected/teacher/attendance.html`
- [X] T010 [US2] Update student list rendering logic to clear the table correctly when switching modes in `public/protected/teacher/attendance.html`

**Checkpoint**: At this point, batch-wise student loading is operational.

---

## Phase 5: User Story 3 - Bulk Saving (Priority: P1)

**Goal**: Save attendance for the selected batch.

**Independent Test**: Mark attendance for a batch, save, and refresh to see if data persists.

### Implementation for User Story 3

- [X] T011 [US3] Update `saveAttendance` to include `courseId` in the request body if in batch mode in `public/protected/teacher/attendance.html`

**Checkpoint**: All core user stories are complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T012 [P] Add visual feedback (loading shimmers) during student loading in `public/protected/teacher/attendance.html`
- [X] T013 [P] Add Socket.IO room join logic for specific courses (`course:${courseId}`) in `public/protected/teacher/attendance.html`
- [X] T014 Run full E2E validation as per `quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001. BLOCKS all user stories.
- **User Stories (Phase 3-5)**: Priority order P1. Must complete Phase 2 first.

### Parallel Opportunities

- T002, T003, T004 (Backend logic) can technically be developed in parallel if in different files, but here they are in the same controller so they should be sequential or handled carefully.
- T006 and Phase 2 can happen in parallel by different developers.

---

## Implementation Strategy

### MVP First (User Story 1, 2 & 3)

1. Complete Foundational Backend.
2. Implement Selection UI (US1).
3. Implement Loading & Saving (US2 & US3).
4. **STOP and VALIDATE**: Verify that batch attendance can be marked and saved.

### Incremental Delivery

- Backend readiness (Phase 2).
- Selection interface (Phase 3).
- Full data flow (Phase 4 & 5).
- UI Polish (Phase 6).
