# Data Model: Teacher Dashboard

The Teacher Dashboard interacts with several core entities to manage the academic lifecycle.

## Primary Entities

### User (Teacher)
- `role`: 'teacher'
- `classesTaught`: List of `Class` references.
- `coursesAssigned`: List of `Course` references.

### Class
- `classTeacher`: Reference to a `User`.
- `students`: List of `User` references (role='student').
- `classCurriculumSections`: List of objectives/sections for this class.

### Course
- `teacher`: Reference to a `User`.
- `curriculumSections`: List of academic objectives.

### Assignment
- `teacher`: The creator.
- `class`: Targeted group.
- `submissions`: Links to student work.

### Submission
- `student`: The author.
- `grade`: Numeric score.
- `status`: 'pending', 'submitted', 'graded', 'late'.

### Attendance
- `teacher`: The marker.
- `course`: Context.
- `records`: List of students and their status for a date.

### Exam / Grade
- `exam`: Reference to the assessment.
- `student`: The candidate.
- `obtainedMarks`: Numeric result.
- `grade`: Derived letter grade.
