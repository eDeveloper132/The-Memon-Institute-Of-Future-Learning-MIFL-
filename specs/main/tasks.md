---
description: "Task list for Daily Curriculum Schedules implementation"
---

# Tasks: Daily Curriculum Schedules

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

- [x] T001 Initialize design artifacts in specs/main/
- [x] T002 [P] Backup current curriculum files to `.bak` extension in `public/protected/teacher/` and `public/protected/student/`

## Phase 2: Foundational (Backend & Types)

**Purpose**: Update the core data layer to support nested daily schedules.

- [x] T003 [P] Add `IDaySchedule` interface and update `ICurriculumModule` in `schemas/types/course.type.ts`
- [x] T004 Update `curriculumModuleSchema` to include `daySchedules` array in `schemas/models/course.model.ts`
- [x] T005 Update `curriculumModuleSchema` to include `daySchedules` array in `schemas/models/class.model.ts`

---

## Phase 3: User Story 1 - Teacher Day Editor (Priority: P1) 🎯 MVP

**Goal**: Enable teachers to add and manage daily schedules within the Curriculum IDE.

**Independent Test**: Add a "Monday" schedule to a milestone, save, and verify data persists.

### Implementation for User Story 1

- [x] T006 [US1] Implement `renderDays(secIdx, modIdx)` helper function in `public/protected/teacher/curriculum.html`
- [x] T007 [US1] Update `createModuleRow` to include the "+ Add Day" action and container for daily entries in `public/protected/teacher/curriculum.html`
- [x] T008 [US1] Create `createDayRow(secIdx, modIdx, dayIdx)` element generator for the nested editor in `public/protected/teacher/curriculum.html`
- [x] T009 [US1] Update `scrapeCurriculum` to traverse and capture the new `daySchedules` data from the DOM in `public/protected/teacher/curriculum.html`

**Checkpoint**: Teachers can now architect day-by-day learning paths in the IDE.

---

## Phase 4: User Story 2 - Student Schedule View (Priority: P2)

**Goal**: Display the daily breakdown of milestones on the Student Roadmap.

**Independent Test**: Load the student roadmap and see "Monday - Topic" listed under the relevant week.

### Implementation for User Story 2

- [x] T010 [US2] Update `renderRoadmap` logic to include a nested daily timeline under each module in `public/protected/student/curriculum.html`
- [x] T011 [US2] Implement conditional rendering to show "Flexible Schedule" if no days are defined in `public/protected/student/curriculum.html`
- [x] T012 [US2] Add visual indicators (icons/badges) for specific days (e.g., Monday, Wednesday) in `public/protected/student/curriculum.html`

**Checkpoint**: Students have clear, daily visibility into their academic journey.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T013 [P] Standardize "Day of Week" dropdown options and validation in the Teacher IDE.
- [x] T014 Run `npx tsc` to verify zero type errors (CONSTITUTIONAL GATE)
- [x] T015 Run quickstart.md validation for the entire Teacher -> Student flow.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2** is a hard blocker for all UI implementation as it defines the data contract.
- **US1 (Teacher)** should be completed first to allow for data creation before testing the **US2 (Student)** view.

## Implementation Strategy

### MVP First (User Story 1 Only)
The primary value is in the planning tool. Once teachers can save daily data (US1), the MVP is complete, even if the student view is still a simple list.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- **MANDATORY**: Run `npx tsc` after every task or logical group. ZERO errors allowed for commit/push.
- Use the existing "Ghost Controls" pattern for daily entries to keep the UI clean.
