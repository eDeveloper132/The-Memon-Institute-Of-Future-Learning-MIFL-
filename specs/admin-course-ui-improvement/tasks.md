# Tasks: Admin Course UI Improvement

**Input**: Design documents from `/specs/admin-course-ui-improvement/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are included as per the project constitution's "Test-First" principle (manual verification as per quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Project initialization

- [X] T001 Verify project structure and environment for admin-course-ui-improvement in `public/protected/admin/courses.html`

---

## Phase 2: Foundational (Backend)

**Purpose**: Core data retrieval API required for the dropdown

- [X] T002 Implement `crudDepartments.getAll` method in `controllers/admin.controller.ts` to fetch all departments
- [X] T003 [P] Register the `GET /api/admin/departments` route in `routes/admin.routes.ts`

**Checkpoint**: Backend API is ready - can be verified via manual request or Postman.

---

## Phase 3: User Story 1 - Department Selection UI (Priority: P1) 🎯 MVP

**Goal**: Admin can see a list of departments in the "Department" dropdown.

**Independent Test**: Open the "Add Course" modal and verify the dropdown is populated with actual department names from the database.

### Implementation for User Story 1

- [X] T004 [US1] Implement `fetchDepartments` function in the script block of `public/protected/admin/courses.html`
- [X] T005 [US1] Call `fetchDepartments` during the `init()` sequence in `public/protected/admin/courses.html`
- [X] T006 [US1] Replace the manual Department ID text input with a `<select name="department" id="departmentSelect">` element in `public/protected/admin/courses.html`
- [X] T007 [US1] Update the dropdown population logic to map API data to `<option>` tags in `public/protected/admin/courses.html`

**Checkpoint**: Dropdown is dynamically populated and visible.

---

## Phase 4: User Story 2 - Integration & Persistence (Priority: P1)

**Goal**: Selecting a department and saving correctly links the course.

**Independent Test**: Register a new course using the dropdown and verify it appears in the table with the correct department name.

### Implementation for User Story 2

- [X] T008 [US2] Verify the `addForm.onsubmit` logic in `public/protected/admin/courses.html` correctly captures the selected department ID
- [X] T009 [US2] Ensure the course listing table in `public/protected/admin/courses.html` still displays the populated department name correctly

**Checkpoint**: Full end-to-end course registration with department selection is functional.

---

## Phase 5: Polish & Validation

**Purpose**: Visual consistency and final verification

- [X] T010 [P] Apply Tailwind styling to the new `<select>` element in `public/protected/admin/courses.html` to match other inputs
- [X] T011 [P] Run `quickstart.md` validation steps and verify visual consistency with the rest of the Admin panel
