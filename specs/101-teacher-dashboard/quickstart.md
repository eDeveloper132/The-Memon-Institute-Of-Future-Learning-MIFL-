# Quickstart: Teacher Dashboard

## Development Setup

1. **Role Requirement**: Ensure your user has the `role: 'teacher'` or `role: 'admin'`.
2. **Assignments**: Populate some sample assignments and student submissions in the database.
3. **Attendance**: Ensure some attendance records exist across multiple dates for at least one class to see the analytics.
4. **Socket Integration**: Ensure `socket.ts` is running for real-time notifications.

## Verification Scenarios

### 1. Dashboard Load & Command Center
- Log in as a teacher.
- Verify summary cards (Classes, Students, Pending Grading) load correct data.
- Check "My Schedule" renders the list of assigned classes with direct links to mark attendance.

### 2. Student Performance Monitoring (View as Student)
- From "My Schedule" or "Results", click the "View Progress" icon for a student.
- Verify the `student-view.html` loads with the student's name, overall attendance, and recent academic history.

### 3. Interactive Grading
- Navigate to "Assignments" and click the "Submissions" button on an assignment card.
- Review student work, click "Grade Now", enter a numeric score and feedback.
- Confirm the student's status updates to "Graded" and the student receives a real-time notification.

### 4. Attendance Analytics
- Navigate to "Class Attendance".
- Select a class.
- Verify the "Attendance Summary" cards appear, showing avg. attendance and "At-Risk" counts (below 75%).
- Ensure at-risk students are highlighted in red within the student list.

### 5. Curriculum Studio
- Go to "Curriculum".
- Edit a course syllabus or class roadmap.
- Verify the "Architecture Last Refined" timestamp updates upon selection.
