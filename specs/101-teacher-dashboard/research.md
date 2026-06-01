# Research: Teacher Dashboard

## Findings

### 1. Existing Teacher Features
- **Attendance**: Functional but needs better data visualization on the dashboard.
- **Assignments**: Core logic exists; grading workflow can be streamlined with a dedicated modal/side panel.
- **Curriculum**: Robust implementation; can be integrated into the dashboard as a quick-link.
- **Results**: Exams and grades are manageable; adding student-specific summaries is the next logical step.

### 2. Integration with Student Dashboard
- The teacher needs a "read-only" or "administrative" view of the Student Dashboard.
- Decision: Create `student-view.html` which takes a `studentId` as a query param and fetches data from student-related endpoints, but from a teacher's authorization context.

### 3. Real-time Notifications
- Already using Socket.io for messaging.
- Decision: Extend this to notify teachers when an assignment is submitted or a student's attendance falls below a threshold.

### 4. Technical Constraints
- The project uses standard web components.
- Rationale: Reuse `ui-card` and `ui-navbar` for consistent UI/UX.

## Decisions

- **Decision**: Specialized `student-view.html` for teachers.
- **Rationale**: Provides a granular view of student performance without cluttering the teacher's primary dashboard.
- **Decision**: Implement a "Pending Grading" aggregator.
- **Rationale**: Helps teachers prioritize tasks by highlighting exactly what needs attention.
- **Decision**: Use existing `teacher.controller.ts` for all logic.
- **Rationale**: Keeps teacher-related operations centralized.
