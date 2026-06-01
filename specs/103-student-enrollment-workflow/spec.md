# Feature Specification: Student Enrollment Workflow

**Feature Branch**: `103-student-enrollment-workflow`  
**Created**: 2026-06-01  
**Status**: Draft  
**Input**: Student self-enrollment in classes and courses with admin approval, fee management, and multi-course/single-class restrictions.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student Enrollment Request (Priority: P1)

As a student, I want to see available classes and courses on my dashboard and apply for enrollment so that I can join academic programs.

**Why this priority**: Core functionality of the feature.

**Independent Test**: Student logs in, sees a list of classes/courses they are not yet in, and clicks "Enroll".

**Acceptance Scenarios**:

1. **Given** I am not enrolled in any class, **When** I click "Apply" on a class, **Then** my request status should show as "Pending".
2. **Given** I am already enrolled in 1 class, **When** I view other classes, **Then** the "Apply" button should be disabled for classes.
3. **Given** I am enrolled in 1 course, **When** I view other courses, **Then** I should still be able to click "Apply" for a second course.

---

### User Story 2 - Admin Approval & Fee Management (Priority: P1)

As an admin, I want to set fees for classes and courses and approve or deny student enrollment requests so that I can manage institutional revenue and student placement.

**Why this priority**: Necessary for the workflow to complete.

**Independent Test**: Admin sets a fee for a course, then goes to a "Requests" page to approve a student's application.

**Acceptance Scenarios**:

1. **Given** a student has a "Pending" request, **When** I click "Approve", **Then** the student should be automatically added to the class/course student list.
2. **Given** I am editing a course in `courses.html`, **When** I enter a fee amount and save, **Then** the fee should be persisted in the database.

---

### User Story 3 - Request Cancellation (Priority: P2)

As a student, I want to cancel my pending enrollment application if I change my mind so that I don't get enrolled accidentally.

**Why this priority**: Important for student autonomy and reducing administrative clutter.

**Independent Test**: Student clicks "Cancel" on a "Pending" request and verifies it is removed.

---

### Edge Cases

- **Double Enrollment**: Preventing a student from applying for the same class/course twice while a request is pending.
- **Role Permissions**: Ensuring teachers or parents cannot approve enrollment requests.
- **Database Consistency**: Handling cases where a class/course is deleted while requests are pending.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Admin MUST be able to set a `fee` for any Class or Course.
- **FR-002**: Student MUST be able to view classes/courses available for enrollment.
- **FR-003**: System MUST restrict students to exactly ONE active class enrollment at a time.
- **FR-004**: System MUST allow students to enroll in MULTIPLE courses.
- **FR-005**: System MUST track enrollment applications via a "Pending" state.
- **FR-006**: Student MUST be able to cancel a "Pending" enrollment request.
- **FR-007**: Admin MUST be able to "Approve" or "Deny" enrollment requests.
- **FR-008**: Upon "Approve", the student MUST be automatically added to the target entity's student list.

### Key Entities *(include if feature involves data)*

- **EnrollmentRequest**:
    - `student`: Ref User
    - `targetType`: 'Class' | 'Course'
    - `targetId`: ObjectId
    - `status`: 'pending' | 'approved' | 'denied' | 'cancelled'
    - `appliedAt`: Date
- **Class/Course**:
    - `enrollmentFee`: Number (New Field)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of approved requests result in immediate and correct student list updates.
- **SC-002**: 100% of students are blocked from applying to a second class if already in one.
- **SC-003**: Admin can set fees for classes and courses in under 1 minute.
- **SC-004**: Dashboard UI reflects enrollment status changes (Pending -> Enrolled) in real-time or upon refresh.
