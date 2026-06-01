---
description: "Actionable tasks for Admin Dashboard Overviews implementation"
---

# Tasks: Admin Dashboard Overviews

**Input**: Design documents from `/specs/102-admin-dashboard-overviews/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/oversight-api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure confirmation

- [x] T001 Verify project structure and create `public/protected/admin/oversight/` directory
- [x] T002 Ensure backend connectivity for admin routes in `index.ts` and `routes/admin.routes.ts`
- [x] T003 [P] Verify `public/components/ui-components.js` is accessible to the new oversight views

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic and aggregation endpoints required for all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Implement `getStudentOversightData` aggregator in `controllers/admin.controller.ts`
- [x] T005 Implement `getTeacherOversightData` aggregator in `controllers/admin.controller.ts`
- [x] T006 Implement `getParentOversightData` aggregator in `controllers/admin.controller.ts`
- [x] T007 Register oversight routes in `routes/admin.routes.ts`
- [x] T008 [P] Create a shared `Oversight Header` component or template for proxy navigation

**Checkpoint**: Foundation ready - oversight data can now be fetched and displayed

---

## Phase 3: User Story 1 - Administrative Student Oversight (Priority: P1) 🎯 MVP

**Goal**: Mirror student dashboard for admins

**Independent Test**: Click "View Dashboard" for a student and see their specific attendance, fees, and assignments.

### Implementation for User Story 1

- [x] T009 [US1] Create `public/protected/admin/oversight/student.html` mirroring student dashboard layout
- [x] T010 [US1] Implement JS logic to fetch and render student oversight data from `/api/admin/oversight/student/:id`
- [x] T011 [US1] Add "View Dashboard" link/button to each student row in `public/protected/admin/students.html`

**Checkpoint**: Student oversight is fully functional and testable independently

---

## Phase 4: User Story 2 - Teacher Workflow Monitoring (Priority: P1)

**Goal**: Mirror teacher dashboard for admins

**Independent Test**: Click "View Dashboard" for a teacher and see their classes and pending grading count.

### Implementation for User Story 2

- [x] T012 [US2] Create `public/protected/admin/oversight/teacher.html` mirroring teacher dashboard layout
- [x] T013 [US2] Implement JS logic to fetch and render teacher oversight data from `/api/admin/oversight/teacher/:id`
- [x] T014 [US2] Add "View Dashboard" link/button to each teacher row in `public/protected/admin/teachers.html`

**Checkpoint**: Teacher oversight is fully functional and testable independently

---

## Phase 5: User Story 3 - Parent Context Overview (Priority: P2)

**Goal**: Mirror parent dashboard for admins

**Independent Test**: Click "View Dashboard" for a parent and see their linked children.

### Implementation for User Story 3

- [x] T015 [US3] Create `public/protected/admin/oversight/parent.html` mirroring parent dashboard layout
- [x] T016 [US3] Implement JS logic to fetch and render parent oversight data from `/api/admin/oversight/parent/:id`
- [x] T017 [US3] Add "View Dashboard" link/button to each parent row in `public/protected/admin/parents.html`

**Checkpoint**: Parent oversight is fully functional and testable independently

---

## Phase 6: User Story 4 - Unified "Proxy" Interface (Priority: P2)

**Goal**: Consistent navigation and "Return to Admin" functionality

**Independent Test**: Navigate between proxy views and return to Admin Dashboard without session loss.

### Implementation for User Story 4

- [x] T018 [US4] Integrate the Oversight Header into all oversight HTML files
- [x] T019 [US4] Ensure all actions in oversight views are "Read-Only" for admins (unless explicitly permitted)

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and validation

- [x] T020 [P] Documentation updates in `specs/102-admin-dashboard-overviews/quickstart.md`
- [x] T021 Code cleanup and responsive UI check across all oversight views
- [x] T022 Run final validation against all scenarios in `specs/102-admin-dashboard-overviews/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be completed first
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: Depend on Foundational completion
- **Polish (Final Phase)**: Depends on all user stories being functional

### User Story Dependencies

- **US1 & US2 (P1)**: Highest priority, can run in parallel after Phase 2
- **US3 & US4 (P2)**: Supportive features, run after P1 stories are stable

### Parallel Opportunities

- Aggregator implementation (T004-T006) can run in parallel if multiple developers available
- Oversight HTML creation (T009, T012, T015) can run in parallel
- Polish and documentation tasks marked [P] can run anytime after the related feature is functional

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundational aggregation logic
2. Build Student Oversight (US1)
3. Build Teacher Oversight (US2)
4. Validate that admins can see the two most critical roles' dashboards

### Incremental Delivery

1. Foundation -> Student Oversight -> MVP Demo
2. Add Teacher Oversight -> Extended Monitoring
3. Add Parent Oversight -> Full Oversight Set
4. Add Unified Proxy UI and return navigation
5. Final Polish
