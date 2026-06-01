# Data Model: Student Dashboard

The Student Dashboard aggregates data from multiple existing entities with specific clarified behaviors.

## Primary Entities

### User (Student)
- **Fields**: `name`, `email`, `phoneNumber`, `address`, `role`, `currentClass`.
- **Relationships**: Belongs to one `Class`, enrolled in multiple `Course`s.

### Attendance
- **Fields**: `student`, `course`, `date`, `status` ('present', 'absent', etc.).

### Grade / Exam
- **Fields**: `student`, `exam`, `marksObtained` (Numeric), `totalMarks` (Numeric), `grade` (Derived Letter), `comments`.
- **Clarification**: Letter grades are derived from `marksObtained` on behalf of the numeric score.

### Assignment / Submission
- **Fields**: `assignment`, `student`, `content`, `attachments`, `submittedAt`, `score` (Numeric), `grade` (Derived Letter).
- **Clarification**: 
    - Submitting an assignment **overwrites** any previous submission for the same task.
    - Grading uses numeric scores with derived letter grades.

### Quiz / QuizAttempt
- **Fields**: `quiz`, `student`, `score` (Numeric), `attemptedAt`.
- **Clarification**: Each quiz allows exactly **one attempt** per student.

### Fee
- **Fields**: `student`, `amount`, `dueDate`, `status` ('paid', 'pending').

### Notice
- **Fields**: `title`, `content`, `targetClass`, `isPinned`, `createdAt`.
- **Clarification**: Dashboard feed displays **pinned notices first**, then newest.

### Message
- **Fields**: `sender`, `receiver`, `content`, `isRead`.
