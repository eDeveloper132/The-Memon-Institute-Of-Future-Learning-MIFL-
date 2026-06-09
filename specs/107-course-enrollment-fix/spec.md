# Feature Specification: Course Enrollment Fix

**Feature Branch**: `107-course-enrollment-fix`  
**Created**: 2026-06-08  
**Status**: Draft  
**Input**: User description: "Fix the issue that student can apply in academic classes but can't apply in courses."

## User Scenarios & Testing

### User Story 1 - Enroll in Specialized Course (Priority: P1)

As a student, I want to apply for enrollment in a specialized course so that I can expand my learning beyond the core curriculum.

**Why this priority**: Core functionality that is currently reported as broken.

**Independent Test**: Student logs in, views "Specialized Courses", clicks "Apply" on a course they are not in, and sees the status change to "Pending".

**Acceptance Scenarios**:

1. **Given** a student is not enrolled in Course A, **When** they click "Apply", **Then** an EnrollmentRequest is created in 'pending' status.
2. **Given** a student has a pending request for Course A, **When** they view the dashboard, **Then** Course A shows status "Pending".

---

### User Story 2 - View Enrolled Courses (Priority: P1)

As a student, I want to see which courses I am already enrolled in so that I don't try to apply for them again.

**Why this priority**: Crucial for usability and preventing duplicate applications.

**Independent Test**: Student logs in and sees "Enrolled" next to courses they are members of.

**Acceptance Scenarios**:

1. **Given** a student is in the `enrolledStudents` list of Course B, **When** they view the dashboard, **Then** Course B shows status "Enrolled".

---

### Edge Cases

- **Duplicate Application**: Prevent multiple pending applications for the same course.
- **Already Enrolled**: Prevent applying for a course the student is already a member of.
- **Course Not Found**: Handle scenarios where a course might be deleted while a student is viewing it.

## Requirements

### Functional Requirements

- **FR-001**: System MUST correctly identify if a student is enrolled in a course by checking the `enrolledStudents` field.
- **FR-002**: System MUST correctly identify if a student is enrolled in a class by checking the `students` field and `currentClass` profile field.
- **FR-003**: System MUST prevent duplicate enrollment requests for the same course/class from the same student.
- **FR-004**: System MUST prevent enrollment requests for courses/classes the student is already enrolled in.
- **FR-005**: Enrollment opportunities API MUST return accurate enrollment status ('none', 'pending', or 'enrolled').

## Success Criteria

### Measurable Outcomes

- **SC-001**: Students can successfully apply for courses, resulting in a 'pending' EnrollmentRequest.
- **SC-002**: Dashboard correctly displays 'Enrolled' status for all courses the student belongs to.
- **SC-003**: No duplicate enrollment requests can be created for the same course/student pair.
