---
description: "Task list for Teacher Curriculum Management implementation"
---

# Tasks: Teacher Curriculum Management

**Input**: Design documents from `/specs/095-teacher-curriculum-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual E2E verification via teacher and admin dashboards.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Type definitions and global configuration

- [X] T001 [P] Define `ICurriculumModule` and update `ICourse`, `IClass` interfaces in `schemas/types/course.type.ts` and `schemas/types/class.type.ts`
- [X] T002 Update `Course` and `Class` models to include curriculum fields in `schemas/models/course.model.ts` and `schemas/models/class.model.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core backend logic that MUST be complete before UI implementation

- [X] T003 Implement `updateCourseCurriculum` controller with lock check logic in `controllers/teacher.controller.ts`
- [X] T004 Implement `updateClassCurriculum` controller with lock check logic in `controllers/teacher.controller.ts`
- [X] T005 Implement `toggleCurriculumLock` controller in `controllers/admin.controller.ts`
- [X] T006 [P] Mount curriculum update routes in `routes/teacher.routes.ts`
- [X] T007 [P] Mount curriculum lock route in `routes/admin.routes.ts`

**Checkpoint**: Backend API is ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Manage Course Curriculum (Priority: P1) 🎯 MVP

**Goal**: Teacher can manage outlines and modules for their courses.

**Independent Test**: Log in as a teacher, select a course, add modules, and verify they are saved and displayed correctly.

### Implementation for User Story 1

- [X] T008 [US1] Refactor `public/protected/teacher/curriculum.html` to introduce a tabbed interface (Course / Class / Materials)
- [X] T009 [US1] Implement Course selection and dynamic curriculum module form (add/remove module rows) in `public/protected/teacher/curriculum.html`
- [X] T010 [US1] Implement the "Save Course Curriculum" logic (calling `PATCH /api/teacher/courses/:id/curriculum`) in `public/protected/teacher/curriculum.html`

---

## Phase 4: User Story 2 - Manage Class Curriculum (Priority: P1)

**Goal**: Class teachers can manage their specific class roadmap.

**Independent Test**: Log in as a class teacher, navigate to the Class tab, and verify curriculum management works similarly to courses.

### Implementation for User Story 2

- [X] T011 [US2] Implement Class curriculum form and "Save" logic in `public/protected/teacher/curriculum.html`
- [X] T012 [US2] Ensure the Class tab is only visible to users who are assigned as a `classTeacher` in `public/protected/teacher/curriculum.html`

---

## Phase 5: User Story 3 - Admin Lock Mechanism (Priority: P1)

**Goal**: Admins can prevent further modifications to approved curricula.

**Independent Test**: Admin locks a course; teacher attempts to edit and sees disabled UI and receives 403 on API attempt.

### Implementation for User Story 3

- [X] T013 [US3] Add "Curriculum Lock" toggle to Course and Class cards/modals in `public/protected/admin/courses.html` and `public/protected/admin/classes.html`
- [X] T014 [US3] Implement UI protection in `public/protected/teacher/curriculum.html` to disable edit buttons if `isLocked` is true

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T015 [P] Add a structured "Preview" mode for students to view the curriculum in their respective dashboards
- [X] T016 Verify that file attachments (Materials) are still accessible and correctly grouped in the new tabbed view
- [X] T017 Run full E2E validation as per `quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: BLOCKS all user stories.
- **User Stories (Phase 3-5)**: P1 Priority. US1 and US2 can be developed in parallel once Phase 2 is complete. US3 requires both admin and teacher side changes.

### Parallel Opportunities

- Phase 1 tasks (T001, T002) can run in parallel.
- Controller implementation (T003, T004, T005) can run in parallel if logic is independent.
- UI tab structure (T008) can be prepared while backend work is finishing.

---

## Implementation Strategy

### MVP First (User Story 1 & 3)

1. Complete Setup and Foundational Backend.
2. Implement Course Curriculum UI (US1).
3. Implement Admin Lock (US3) to ensure security early.
4. **STOP and VALIDATE**: Verify that a teacher can define a course roadmap and an admin can lock it.

### Incremental Delivery

- Backend readiness (Phase 2).
- Course-specific roadmaps (Phase 3).
- Class-specific roadmaps (Phase 4).
- Administrative control (Phase 5).
