# Research: Student Enrollment Workflow

## Findings

### 1. Existing Enrollment Logic
- **Classes**: Enrollment is currently managed by admins by directly adding student IDs to the `students` array in the `Class` model.
- **Courses**: Similar to classes, students are added to the `enrolledStudents` array in the `Course` model.
- **Restriction**: There is no hard-coded restriction in the schema or controllers that prevents a student from being in multiple classes. This must be implemented at the application level.

### 2. Fee Management
- **Current State**: No `enrollmentFee` field exists in `Class` or `Course` models.
- **Decision**: Add `enrollmentFee: { type: Number, default: 0 }` to both models.
- **Rationale**: Enables monetization and budget tracking.

### 3. Request Workflow
- **Current State**: No mechanism for students to "request" anything.
- **Decision**: Implement a new `EnrollmentRequest` model.
- **Alternatives Considered**: 
    - Adding a `pendingStudents` array to Class/Course: Rejected because it's harder to track meta-data like `appliedAt` or `status` per student.
    - Adding an `applications` array to User: Rejected because it makes it harder for admins to query all pending requests across the system.

### 4. Student Dashboard Integration
- The current student dashboard shows their *current* enrollment.
- It needs a new section: "Join New Class/Course" which lists available items.
- Items should show: Title, Teacher, Fee, and an "Apply" button.

## Decisions

- **Decision**: Standardize on a single `EnrollmentRequest` entity for both classes and courses.
- **Rationale**: Simplifies the admin approval UI and backend processing.
- **Decision**: Enforce "1 Class Max" in the enrollment submission controller.
- **Rationale**: Prevents illegal states before they reach the database.
