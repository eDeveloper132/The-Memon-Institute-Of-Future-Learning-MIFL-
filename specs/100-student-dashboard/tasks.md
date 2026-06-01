---
description: "Actionable tasks for Student Dashboard implementation"
---

# Tasks: Student Dashboard

**Input**: Design documents from `/specs/100-student-dashboard/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/student-api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure confirmation

- [x] T001 Verify project structure and existence of `public/protected/student/` directory
- [x] T002 Ensure backend connectivity for student routes in `index.ts` and `routes/student.routes.ts`
- [x] T003 [P] Verify `public/components/ui-components.js` is correctly referenced across all student HTML files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic and utilities required for all user stories

**⚠️ CRITICAL**: Must be completed before User Story implementation begins

- [x] T004 [P] Implement numeric-to-letter grade derivation logic in `services/grading.service.ts` (or equivalent utility)
- [x] T005 Implement `overwrite` logic for assignment submissions in `controllers/student.controller.ts`
- [x] T006 Implement `single attempt` validation for quizzes in `controllers/student.controller.ts`
- [x] T007 Implement notice sorting logic (Pinned first, then chronological) in `controllers/student.controller.ts`

---

## Phase 3: User Story 1 - Unified Dashboard Overview (Priority: P1) 🎯 MVP

**Goal**: A centralized dashboard showing real-time summaries of attendance, fees, and assignments with a manual refresh option.

**Independent Test**: Log in as a student and confirm Attendance, Fees, and Assignments cards show correct summary data; verify the refresh button updates data in <1s.

### Implementation for User Story 1

- [x] T008 [US1] Create main dashboard layout in `public/protected/student/index.html` using Tailwind CSS and standard components
- [x] T009 [US1] Implement data fetching and display for Attendance percentage in `public/protected/student/index.html`
- [x] T010 [US1] Implement data fetching and display for Pending Fees count in `public/protected/student/index.html`
- [x] T011 [US1] Implement data fetching and display for Upcoming Assignment deadlines in `public/protected/student/index.html`
- [x] T012 [US1] Implement manual refresh button logic for all summary cards in `public/protected/student/index.html`

**Checkpoint**: MVP Dashboard Summary is functional and testable.

---

## Phase 4: User Story 2 - Academic Progress Tracking (Priority: P2)

**Goal**: Detailed views for attendance, results (with numeric scores and letter grades), and study materials.

**Independent Test**: Verify accurate record listing in Attendance, Results, and Resources pages.

### Implementation for User Story 2

- [x] T013 [P] [US2] Update `public/protected/student/registration-attendance.html` with detailed record list from `/api/student/attendance`
- [x] T014 [P] [US2] Update `public/protected/student/results.html` to display numeric scores and derived letter grades using the foundational utility
- [x] T015 [P] [US2] Update `public/protected/student/course-files.html` to list and allow downloading of course materials

**Checkpoint**: Academic tracking modules are complete and consistent with the dashboard.

---

## Phase 5: User Story 3 - Assignment Submission & Quizzes (Priority: P2)

**Goal**: Enable digital coursework through online submissions (with overwrite behavior) and interactive quizzes (single attempt).

**Independent Test**: Confirm second assignment submission overwrites the first; confirm second quiz attempt is blocked.

### Implementation for User Story 3

- [x] T016 [US3] Update `public/protected/student/assignments.html` with file upload form and status tracking (Pending/Submitted)
- [x] T017 [US3] Update `public/protected/student/quizzes.html` with quiz taking interface and attempt restriction logic

---

## Phase 6: User Story 4 - Financial Management (Priority: P3)

**Goal**: Manage tuition payments and view vouchers.

**Independent Test**: Verify fee vouchers match administrative records and show correct payment status.

### Implementation for User Story 4

- [x] T018 [US4] Update `public/protected/student/vouchers.html` to display a detailed list of fee records and their status

---

## Phase 7: User Story 5 - Communication & Notices (Priority: P3)

**Goal**: Stay informed via prioritized notices and communicate with teachers.

**Independent Test**: Verify pinned notices appear at the top; confirm real-time message delivery.

### Implementation for User Story 5

- [x] T019 [US5] Add "Latest Notices" feed to `public/protected/student/index.html` with pinned-first prioritization
- [x] T020 [US5] Ensure chat interface in `public/protected/student/messages.html` integrates with the real-time backend

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final UI refinements and validation

- [x] T021 [P] Implement "No Data" empty states for all dashboard cards and lists
- [x] T022 [P] Verify responsive behavior for all new student views (Mobile/Desktop)
- [x] T023 Run final validation against all scenarios in `specs/100-student-dashboard/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be completed first.
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories.
- **User Stories (Phase 3-7)**: All depend on Foundational completion.
  - US1 (P1) is the MVP priority.
  - US2 & US3 (P2) can follow.
  - US4 & US5 (P3) are last.
- **Polish (Final Phase)**: Depends on all user stories being functional.

### Parallel Opportunities

- Tasks marked **[P]** within the same phase can run in parallel.
- Once Foundational (Phase 2) is done, User Stories can be worked on in parallel across different files.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational logic.
2. Build the main dashboard summary in `index.html`.
3. Validate and deploy the high-level student overview.

### Incremental Delivery

1. Foundation -> US1 (Dashboard Overview) -> MVP Demo.
2. US2 (Academic Tracking) -> US3 (Submissions & Quizzes) -> Functional Core.
3. US4 (Finance) -> US5 (Communication) -> Full Feature Set.
4. Final Polish and Cross-Browser/Device verification.
