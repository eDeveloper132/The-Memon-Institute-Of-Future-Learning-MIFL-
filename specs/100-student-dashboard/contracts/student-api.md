# Student API Contracts

All endpoints require authentication and 'student' or 'admin' role.

## Profile Management

### GET `/api/student/profile`
- **Success (200)**: `{ user: User }`

### PATCH `/api/student/profile`
- **Body**: `{ phoneNumber?: string, address?: string }`
- **Success (200)**: `{ message: 'Details updated', user: User }`

## Academic Data

### GET `/api/student/attendance`
- **Success (200)**: `{ records: Attendance[] }`

### GET `/api/student/results`
- **Success (200)**: `{ results: Grade[] }`

### POST `/api/student/assignments/:assignmentId` (Submission)
- **Behavior**: Overwrites existing submission for this student and assignment.
- **Success (201)**: `{ message: 'Assignment submitted', submission: Submission }`

### POST `/api/student/quizzes/:quizId` (Attempt)
- **Behavior**: Allows exactly one attempt. Returns 400 if already attempted.
- **Success (201)**: `{ message: 'Quiz attempt recorded', attempt: QuizAttempt }`
- **Error (400)**: `{ message: 'Quiz already attempted' }`

## Communication

### GET `/api/student/notices`
- **Success (200)**: `{ notices: Notice[] }`
- **Sorting**: Pinned notices first, then newest.

### GET `/api/student/conversations`
- **Success (200)**: `{ partners: User[] }`
