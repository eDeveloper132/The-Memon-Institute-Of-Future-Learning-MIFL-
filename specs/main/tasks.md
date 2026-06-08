---
description: "Task list for Student Activity Times in Stopwatch implementation"
---

# Tasks: Student Activity Times in Stopwatch

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

- [x] T001 Initialize design artifacts in specs/main/
- [ ] T002 [P] Backup current `public/protected/teacher/stopwatch.html` to `.bak`

## Phase 2: Foundational (Backend & Types)

**Purpose**: Create the core data layer for storing activity times.

- [x] T003 [P] Create `IActivityTime` interface in `schemas/types/activityTime.type.ts`
- [x] T004 [P] Create `activityTimeSchema` and model in `schemas/models/activityTime.model.ts`
- [x] T005 Implement `saveActivityTime`, `getActivityTimes`, `updateActivityTime`, and `deleteActivityTime` in `controllers/teacher.controller.ts`
- [x] T006 Register the 4 new API routes in `routes/teacher.routes.ts`

---

## Phase 3: User Story 1 & 2 - Target Selection & Saving (Priority: P1) 🎯 MVP

**Goal**: Enable teachers to select a student, provide an activity name, and save the stopwatch time.

**Independent Test**: Load the page, select a class, select a student, start/pause the stopwatch, enter a name, and click save. The record should appear in the database.

### Implementation for User Story 1 & 2

- [x] T007 [US1] Overhaul `public/protected/teacher/stopwatch.html` to include targeting UI (Class/Course toggles, Entity select, Student select)
- [x] T008 [US1] Implement `loadTargets` and `loadStudents` logic in `public/protected/teacher/stopwatch.html`
- [x] T009 [US2] Add 'Activity Name' input and 'Save Activity' button below the stopwatch in `public/protected/teacher/stopwatch.html`
- [x] T010 [US2] Implement `handleSaveActivity` logic to send `elapsedTime` and metadata to `POST /api/teacher/activities` in `public/protected/teacher/stopwatch.html`

**Checkpoint**: Teachers can successfully log activity times to specific students.

---

## Phase 4: User Story 3 & 4 - Listing & Editing (Priority: P2)

**Goal**: Display recent activities and allow for modifications.

**Independent Test**: The saved activity from Phase 3 appears in a list below the timer. Clicking 'Edit' allows changing the name/time. Clicking 'Delete' removes it.

### Implementation for User Story 3 & 4

- [x] T011 [US3] Add a "Recent Activities" list container to `public/protected/teacher/stopwatch.html`
- [x] T012 [US3] Implement `fetchActivities` and `renderActivities` to display the data table in `public/protected/teacher/stopwatch.html`
- [x] T013 [US4] Implement Edit modal/flow to update `activityName` and `duration` via `PATCH /api/teacher/activities/:id` in `public/protected/teacher/stopwatch.html`
- [x] T014 [US4] Implement Delete flow with confirmation via `DELETE /api/teacher/activities/:id` in `public/protected/teacher/stopwatch.html`
- [x] T015 [US4] Ensure all UI interactions use event delegation for strict CSP compliance in `public/protected/teacher/stopwatch.html`

**Checkpoint**: Teachers have full CRUD control over activity records.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T016 Run `npx tsc` to verify zero type errors across the new schemas and controllers (CONSTITUTIONAL GATE)
- [x] T017 Run quickstart.md validation to ensure end-to-end functionality.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2** is a hard blocker; the `ActivityTime` schema and API routes must exist before UI work begins.
- **Phase 3 (Saving)** must be completed before **Phase 4 (Listing/Editing)** so there is data to display and modify.

## Implementation Strategy

### MVP First (User Stories 1 & 2)
The core value is the ability to save the data. Getting the targeting dropdowns and the save payload correctly formatted and stored in the database is the primary milestone.
