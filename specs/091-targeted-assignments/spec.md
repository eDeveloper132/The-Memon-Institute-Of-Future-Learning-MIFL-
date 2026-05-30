# Feature Specification: Targeted Assignments

**Feature Branch**: `091-targeted-assignments`  
**Created**: 2026-05-30  
**Status**: Draft  
**Input**: "make a comprehensive plan to manage assignments in assignments.html to specific class students and specific course batches students."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Targeted Assignment (Priority: P1)
As a teacher, I want to create an assignment and choose whether it targets an entire class or a specific course batch.

**Acceptance Scenarios**:
1. **Given** I am creating a new assignment, **When** I select "Target Mode: Class", **Then** I see a dropdown of my classes.
2. **Given** I am creating a new assignment, **When** I select "Target Mode: Course Batch", **Then** I see a dropdown of my courses and their respective batches.
3. **Given** I submit the form, **When** the assignment is created, **Then** it is correctly linked to either the Class ID or the Course/Batch IDs in the database.

---

### User Story 2 - View Assignment Targets (Priority: P1)
As a teacher, I want to see which class or batch each assignment is targeted to in the assignment list.

**Acceptance Scenarios**:
1. **Given** a list of assignments, **When** I view an assignment card, **Then** I see the name of the target class or the course name with the specific batch name.

---

### User Story 3 - targeted Notifications (Priority: P2)
As a student, I want to receive a notification only for assignments that are targeted to my class or my specific batch.

**Acceptance Scenarios**:
1. **Given** a teacher posts an assignment to "Batch A", **When** the assignment is created, **Then** only students in "Batch A" receive a real-time notification.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Update `IAssignment` type and `Assignment` model to include an optional `batch` field.
- **FR-002**: Modify `Assignment` model to make `class` field optional if `batch` is provided.
- **FR-003**: Update `createAssignment` in `teacher.controller.ts` to handle targeting logic and room notifications.
- **FR-004**: Refactor `assignments.html` modal to support dual targeting modes with reactive dropdowns (similar to enhanced attendance).
- **FR-005**: Update `getAssignments` to populate both Class and Course/Batch information for display.

### Key Entities
- **Assignment**: Stores title, description, target (Class or Course/Batch), due date, and attachments.
- **Submission**: Linked to an Assignment and a Student.

## Success Criteria *(mandatory)*
- **SC-001**: Assignments can be successfully created for specific batches.
- **SC-002**: The UI correctly displays "Grade X-Y" or "Course Name - Batch Name" for targets.
- **SC-003**: No database validation errors when `class` is omitted in favor of a `batch`.
