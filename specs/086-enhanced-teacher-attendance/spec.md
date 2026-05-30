# Feature Specification: Enhanced Teacher Attendance

**Feature Branch**: `086-enhanced-teacher-attendance`  
**Created**: 2026-05-30  
**Status**: Draft  
**Input**: "make a plan to get attendance based on class students and courses batch wise students in attendance.html in teacher dashboard"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Attendance Mode Selection (Priority: P1)
As a teacher, I want to choose whether I am marking attendance for an entire class or a specific course batch.

**Acceptance Scenarios**:
1. **Given** I am on the Attendance page, **When** I view the selection header, **Then** I see options for "Class" and "Course Batch".
2. **Given** I select "Class", **When** I use the dropdown, **Then** I see classes where I am the class teacher.
3. **Given** I select "Course Batch", **When** I select a course, **Then** a second dropdown appears showing the batches for that course.

---

### User Story 2 - Batch Student Loading (Priority: P1)
As a teacher, I want the student list to automatically update based on the selected batch.

**Acceptance Scenarios**:
1. **Given** I have selected a specific Batch for a Course, **When** the students are fetched, **Then** only students enrolled in that specific batch are displayed in the table.
2. **Given** existing attendance records for that batch on the selected date, **When** the page loads, **Then** the previous statuses are pre-filled.

---

### User Story 3 - Bulk Saving (Priority: P1)
As a teacher, I want to save the attendance for the entire batch with one click.

**Acceptance Scenarios**:
1. **Given** I have marked several students in a batch as "Absent", **When** I click "Save Attendance", **Then** those records are persisted in the database linked to the specific Course ID.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Backend MUST provide an endpoint for teachers to fetch courses they teach, including batch info.
- **FR-002**: `getAttendanceData` MUST support fetching students by `batchId` within a `courseId`.
- **FR-003**: `markAttendance` MUST store the `course` ID in the attendance record when marking by batch.
- **FR-004**: UI MUST provide a reactive way to switch between "Full Class" and "Course Batch" modes.

### Key Entities
- **Class**: Represents a group of students (Grade/Section).
- **Course**: Represents a subject, which can contain multiple **Batches**.
- **Attendance**: Stores the status of a student for a specific date, optionally linked to a Class or Course.

## Success Criteria *(mandatory)*
- **SC-001**: Teachers can successfully mark attendance for a course batch.
- **SC-002**: Switching modes resets the student list and clears the table.
- **SC-003**: No "Uncaught ReferenceError" or 404 errors during selection or saving.
