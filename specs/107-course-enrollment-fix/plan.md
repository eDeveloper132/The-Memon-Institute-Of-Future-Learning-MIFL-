# Implementation Plan - Fix Course Enrollment Issues

Students can currently apply for academic classes but encounter issues when applying for courses. Research revealed that the enrollment status for courses is often incorrectly displayed as 'none' even when enrolled, and the application logic lacks necessary checks for courses.

## Objective
Fix the enrollment logic to correctly identify and display enrollment status for both classes and courses, and ensure robust application validation.

## Proposed Changes

### 1. Controllers

#### `controllers/enrollment.controller.ts`
- **`getAvailableOpportunities`**:
    - Update `Class.find().select(...)` to include `students`.
    - Update `Course.find().select(...)` to include `enrolledStudents`.
    - Refactor `formatItem` to:
        - Use `item.students` for `Class` types.
        - Use `item.enrolledStudents` for `Course` types.
        - Ensure both are checked correctly.
- **`applyForEnrollment`**:
    - Refactor to handle both `Class` and `Course` validation uniformly.
    - For `Class`:
        - Check `student.currentClass`.
        - Check for pending `Class` requests.
    - For `Course`:
        - Check if student is in `target.enrolledStudents`.
        - Check for pending request for the *specific* course.
    - Add general validation for `targetType` ('Class' | 'Course').

### 2. Verification Plan

#### Automated Tests
- Create a new test file `tests/enrollment_fix.test.ts` to verify:
    - `getAvailableOpportunities` returns 'enrolled' status for students in `enrolledStudents` (Course) or `students` (Class).
    - `applyForEnrollment` prevents duplicate pending requests for the same Course.
    - `applyForEnrollment` prevents applying for a Course if already enrolled.
    - `applyForEnrollment` prevents applying for a Class if `currentClass` is set.

#### Manual Verification
- Log in as a student and verify that enrolled courses show "Enrolled" on the dashboard.
- Verify that pending course applications show "Pending".
- Verify that clicking "Apply" for a course creates a request and updates UI to "Pending".
- Log in as admin and verify the course enrollment request is visible and can be processed.
