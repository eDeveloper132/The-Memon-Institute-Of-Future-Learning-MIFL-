# Teacher API Contracts

## Dashboard & Stats

### GET `/api/teacher/stats`
- **Description**: Returns an overview of teacher activities.
- **Success (200)**:
  ```json
  {
    "classesCount": 3,
    "totalStudents": 120,
    "pendingGrading": 15,
    "avgFeedback": 4.8
  }
  ```

## Student Monitoring

### GET `/api/teacher/students/:studentId/summary`
- **Description**: Returns a student dashboard summary from a teacher's perspective.
- **Success (200)**:
  ```json
  {
    "attendance": "92%",
    "recentGrades": [...],
    "pendingAssignments": [...]
  }
  ```

## Grading

### PATCH `/api/teacher/assignments/grade/:submissionId`
- **Description**: Record a grade for a submission.
- **Body**:
  ```json
  {
    "grade": 85,
    "comments": "Great work!"
  }
  ```

## Curriculum

### PATCH `/api/teacher/courses/:id/curriculum`
- **Description**: Update course curriculum sections.
- **Body**:
  ```json
  {
    "curriculumSections": [...]
  }
  ```
