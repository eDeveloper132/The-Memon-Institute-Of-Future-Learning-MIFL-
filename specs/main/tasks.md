---
description: "Task list for Standalone Material Uploads via Sanity implementation"
---

# Tasks: Standalone Material Uploads via Sanity

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

- [x] T001 Initialize design artifacts in specs/main/
- [ ] T002 [P] Backup current `public/protected/staff/index.html` and `public/protected/student/course-files.html`

## Phase 2: Foundational (Backend & Types)

**Purpose**: Update the core data layer to support dual-targeting for materials.

- [x] T003 [P] Update `IMaterial` interface to make `course` optional and add optional `class` reference in `schemas/types/material.type.ts`
- [x] T004 [P] Update `materialSchema` to make `course` optional and add optional `class` reference in `schemas/models/material.model.ts`
- [x] T005 Update `uploadMaterial` logic to support optional course/class references and validation in `controllers/teacher.controller.ts`

---

## Phase 3: User Story 1 - Teacher Resource Hub (Priority: P1) 🎯 MVP

**Goal**: Transform the Staff Inventory placeholder into a fully functional Material Upload Hub.

**Independent Test**: Teacher can navigate to the Resource Hub, select a target (Course or Class), select a PDF file, upload it, and see a success toast.

### Implementation for User Story 1

- [x] T006 [US1] Redesign `public/protected/staff/index.html` to include a Material Upload form
- [x] T007 [US1] Implement radio toggles (Course vs Class) and dynamic dropdown population in `public/protected/staff/index.html`
- [x] T008 [US1] Integrate Sanity upload flow (`POST /api/teacher/materials/upload`) into the submit action in `public/protected/staff/index.html`
- [x] T009 [US1] Send full payload to `POST /api/teacher/materials` upon successful Sanity upload in `public/protected/staff/index.html`

**Checkpoint**: Teachers can upload standalone PDFs/DOCX files targeting specific classes or courses.

---

## Phase 4: User Story 2 - Student Material Visibility (Priority: P2)

**Goal**: Ensure students can see both course-level and class-level materials in their dashboard.

**Independent Test**: Student logs in and sees a recently uploaded class-level PDF in their "Course Files" section.

### Implementation for User Story 2

- [x] T010 [US2] Update `getMyMaterials` to query using an `$or` condition for both enrolled courses and current class in `controllers/student.controller.ts`
- [x] T011 [US2] Update material rendering to gracefully handle both course-level and class-level items in `public/protected/student/course-files.html`

**Checkpoint**: Students have access to all targeted materials.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T012 Run `npx tsc` to verify zero type errors (CONSTITUTIONAL GATE)
- [x] T013 Verify the file upload UI provides clear loading states and error handling in `public/protected/staff/index.html`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2** is a hard blocker for all UI implementation as it defines the data contract.
- **US1 (Teacher)** should be completed first to allow for data creation before testing the **US2 (Student)** view.

## Implementation Strategy

### MVP First (User Story 1 Only)
The primary value is in enabling the upload. Once teachers can save standalone materials targeted to a class or course (US1), the MVP is technically achievable, though US2 is required for end-to-end functionality.
