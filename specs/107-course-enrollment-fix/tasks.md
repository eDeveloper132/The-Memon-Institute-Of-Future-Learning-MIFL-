---
description: "Task list for course enrollment fix"
---

# Tasks: Course Enrollment Fix

**Input**: Design documents from `/specs/107-course-enrollment-fix/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Setup & Foundational Testing

**Purpose**: Establish the testing baseline to confirm the bugs.

- [X] T001 [P] Create reproduction test suite in `tests/enrollment_fix.test.ts`
- [X] T002 Verify that `tests/enrollment_fix.test.ts` fails (Red state)

---

## Phase 2: Foundational Fixes (Blocking)

**Purpose**: Core infrastructure fixes that both user stories depend on.

- [X] T003 Update `getAvailableOpportunities` in `controllers/enrollment.controller.ts` to select `students` for Classes and `enrolledStudents` for Courses

**Checkpoint**: Database queries now retrieve the necessary enrollment data.

---

## Phase 3: User Story 2 - View Enrolled Courses (Priority: P1) 🎯 MVP Increment

**Goal**: Students can accurately see their enrollment status on the dashboard.

**Independent Test**: GET `/api/enrollment/available` returns `enrollmentStatus: 'enrolled'` for courses where the student is in `enrolledStudents`.

### Tests for User Story 2 ⚠️

- [X] T004 [P] [US2] Add unit test case in `tests/enrollment_fix.test.ts` for status detection logic

### Implementation for User Story 2

- [X] T005 [US2] Refactor `formatItem` in `controllers/enrollment.controller.ts` to correctly check `item.students` (Class) and `item.enrolledStudents` (Course)

**Checkpoint**: US2 is complete. Students can now see their enrollment status correctly.

---

## Phase 4: User Story 1 - Enroll in Specialized Course (Priority: P1) 🎯 MVP Increment

**Goal**: Students can successfully apply for courses with proper validation.

**Independent Test**: POST `/api/enrollment/apply` for a course creates a pending `EnrollmentRequest` and prevents duplicates.

### Tests for User Story 1 ⚠️

- [X] T006 [P] [US1] Add unit test case in `tests/enrollment_fix.test.ts` for duplicate application prevention
- [X] T007 [P] [US1] Add unit test case in `tests/enrollment_fix.test.ts` for "already enrolled" prevention

### Implementation for User Story 1

- [X] T008 [US1] Implement validation in `applyForEnrollment` in `controllers/enrollment.controller.ts` to check for existing pending requests for the specific course
- [X] T009 [US1] Implement validation in `applyForEnrollment` in `controllers/enrollment.controller.ts` to check if the student is already enrolled in the target course
- [X] T010 [US1] Add general `targetType` validation in `applyForEnrollment`

**Checkpoint**: US1 is complete. Course application is now robust and secure.

---

## Phase 5: Polish & Validation

**Purpose**: Final quality assurance and system integrity.

- [X] T011 [P] Run `npx tsc` to verify zero type errors (CONSTITUTIONAL GATE)
- [X] T012 Run all tests in `tests/` to ensure no regressions
- [X] T013 [P] Final manual verification of the enrollment dashboard UI flow

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Must be completed first to provide the "Red" state.
- **Phase 2 (Foundational)**: Blocks US1 and US2 implementation as it provides the necessary data.
- **Phase 3 (US2)**: Can be implemented after Phase 2.
- **Phase 4 (US1)**: Can be implemented after Phase 2. US1 and US2 are independent but share the same controller.
- **Phase 5 (Polish)**: Final step after all stories are implemented.

### Parallel Opportunities

- T001 (Test Setup) can be prepared while researching.
- T004, T006, T007 (Individual test cases) can be written in parallel once the test suite structure (T001) is ready.
- Phase 3 and Phase 4 implementation can be done together as they modify the same controller file.

---

## Implementation Strategy

### MVP First (Full Fix)

1. Establish failing tests (Phase 1).
2. Fix data selection (Phase 2).
3. Fix status viewing (Phase 3).
4. Fix application logic (Phase 4).
5. Validate (Phase 5).

This fix is small enough that the entire package constitutes the MVP for "Course Enrollment".
