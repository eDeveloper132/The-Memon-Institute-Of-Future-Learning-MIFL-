# Tasks: Price Section Management (PKR)

**Input**: Design documents from `/specs/104-price-section-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested; manual validation via `quickstart.md` is prioritized.

**Organization**: Tasks are grouped by user story (Course Price, Class Price, PKR Display) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Agent context update and environment preparation.

- [x] T001 Update agent context by running `.specify/scripts/powershell/update-agent-context.ps1 -AgentType gemini`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure.
*Note: No blocking prerequisites identified for this feature as models and controllers already exist.*

---

## Phase 3: User Story 1 - Course Enrollment Fee (Priority: P1) 🎯 MVP

**Goal**: Admin can set course fee in PKR during registration/editing and view it in PKR on the course card.

**Independent Test**: Register a new course with an enrollment fee of 5000, verify it appears as "Rs. 5000" on the dashboard card.

### Implementation for User Story 1

- [x] T002 [P] [US1] Add `enrollmentFee` input field (type="number") to `courseForm` in `public/protected/admin/courses.html`
- [x] T003 [P] [US1] Update `openModal` function in `public/protected/admin/courses.html` to populate the `enrollmentFee` input from the course object in edit mode
- [x] T004 [P] [US1] Update `renderCourses` in `public/protected/admin/courses.html` to display the fee using PKR format (`Rs. ${c.enrollmentFee}`) on the course cards
- [x] T005 [P] [US1] Update `window.updateFee` in `public/protected/admin/courses.html` to use "PKR" in the prompt message and display "Rs." prefix in the success toast/updated card

**Checkpoint**: User Story 1 (Courses) should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Class Enrollment Fee (Priority: P1)

**Goal**: Admin can set class fee in PKR during creation and view it in PKR on the class card.

**Independent Test**: Create a new academic class with an enrollment fee of 10000, verify it appears as "Rs. 10000" on the dashboard card.

### Implementation for User Story 2

- [x] T006 [P] [US2] Add `enrollmentFee` input field (type="number") to `addClassForm` in `public/protected/admin/classes.html`
- [x] T007 [P] [US2] Update `renderClasses` in `public/protected/admin/classes.html` to display the fee using PKR format (`Rs. ${c.enrollmentFee}`) on the class cards
- [x] T008 [P] [US2] Update `window.updateFee` in `public/protected/admin/classes.html` to use "PKR" in the prompt message and display "Rs." prefix in the success toast/updated card

**Checkpoint**: User Story 2 (Classes) should be fully functional and testable independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verification and final adjustments.

- [x] T009 [P] Run full validation of the Price Section Management according to `specs/104-price-section-management/quickstart.md`
- [x] T010 Perform code cleanup and ensure consistent PKR formatting (e.g., "Rs." spacing) across all modified files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **User Stories (Phase 3 & 4)**: Can proceed in parallel as they touch different files (`courses.html` vs `classes.html`).
- **Polish (Phase 5)**: Depends on completion of Phase 3 and 4.

### Parallel Opportunities

- Phase 3 tasks (T002-T005) can be implemented together in `courses.html`.
- Phase 4 tasks (T006-T008) can be implemented together in `classes.html`.
- Phase 3 and Phase 4 are independent and can be worked on concurrently.

---

## Implementation Strategy

### MVP First (Courses)
1. Complete Phase 3: User Story 1 (Courses) to deliver immediate value for course management.
2. Validate course fee creation and display.

### Incremental Delivery
1. Add User Story 1 → Test independently → Deliver.
2. Add User Story 2 → Test independently → Deliver.
3. Perform final polish.
