---
description: "Task list for Advanced University-Level Curriculum implementation"
---

# Tasks: Advanced University-Level Curriculum

**Input**: Design documents from `/specs/099-advanced-curriculum/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual visual verification in teacher and student dashboards.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Global style and utility initialization

- [X] T001 [P] Initialize advanced curriculum CSS utilities (typography, borders, shadow-inner) in `public/protected/teacher/curriculum.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core backend schema and controller updates for rich data support

- [X] T002 Update `curriculumModuleSchema` to include `learningObjectives` (Array) and `resources` (Array of objects) in `schemas/models/course.model.ts` and `schemas/models/class.model.ts`
- [X] T003 Update `updateCourseCurriculum` controller to process the new rich data structure (Objectives, Resources) in `controllers/teacher.controller.ts`
- [X] T004 Update `updateClassCurriculum` controller to process the new rich data structure in `controllers/teacher.controller.ts`

**Checkpoint**: Backend foundation is ready - advanced UI implementation can now begin.

---

## Phase 3: User Story 1 - Advanced Course Syllabus (Priority: P1) 🎯 MVP

**Goal**: Professional course syllabus management with weekly modules and outcomes.

**Independent Test**: select a course, add a module with objectives and a resource link, save, and verify data persistence in the database.

### Implementation for User Story 1

- [X] T005 [US1] Implement "University Level" styling for the Course Syllabus header and academic outline section in `public/protected/teacher/curriculum.html`
- [X] T006 [US1] Refactor the module form to support dynamic lists for "Learning Objectives" and "Required Resources" in `public/protected/teacher/curriculum.html`
- [X] T007 [US1] Implement the "Course Path" vertical timeline display for weekly modules in `public/protected/teacher/curriculum.html`

**Checkpoint**: User Story 1 complete - Teachers can now create comprehensive university-grade syllabi.

---

## Phase 4: User Story 2 - Distinct Class Management (Priority: P1)

**Goal**: Dedicated interface for class-wide roadmaps.

**Independent Test**: Switch to the Class tab and verify that the UI focus shifts to class-level milestones and iconography.

### Implementation for User Story 2

- [X] T008 [US2] Overhaul the Class Roadmap tab to use distinct "Pastoral Care" and "Milestone" iconography in `public/protected/teacher/curriculum.html`
- [X] T009 [US2] Separate the UI state logic to ensure Class Roadmap data doesn't leak into Course views in `public/protected/teacher/curriculum.html`

---

## Phase 5: User Story 3 - Professional Preview Mode (Priority: P2)

**Goal**: Visual assurance for teachers via a student-view simulator.

**Independent Test**: Click "Preview as Student" and verify a modal opens showing a high-fidelity, formatted syllabus.

### Implementation for User Story 3

- [X] T010 [US3] Implement the full-screen "Public Syllabus Preview" modal with professional typography in `public/protected/teacher/curriculum.html`
- [X] T011 [US3] Build the read-only rendering logic to format the rich module data (Objectives/Links) for the preview view in `public/protected/teacher/curriculum.html`

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T012 [P] Add smooth CSS transitions between curriculum tabs and during module row additions in `public/protected/teacher/curriculum.html`
- [X] T013 [P] Implement shimmer loading states for curriculum data fetching to enhance perceived performance in `public/protected/teacher/curriculum.html`
- [X] T014 Run full E2E validation as per `quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: BLOCKS all User Stories.
- **User Stories (Phase 3-5)**: Must complete Phase 2 first. US1 and US2 are P1 priority and should be finished before US3.

### Parallel Opportunities

- Phase 2 backend work can technically happen in parallel with Phase 3 UI layout design (T005) if handled in separate turns.

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundational schema updates.
2. Implement the rich syllabus builder for Courses.
3. **STOP and VALIDATE**: Verify that a teacher can build a professional course roadmap.

### Incremental Delivery

- Backend readiness (Phase 2).
- Advanced course management (Phase 3).
- Specialized class roadmaps (Phase 4).
- High-fidelity preview (Phase 5).
