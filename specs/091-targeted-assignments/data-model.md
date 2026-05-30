# Data Model: Targeted Assignments

## Entities

### Assignment (Updated)
- `title`: String
- `description`: String
- `course`: ObjectId (Ref: Course)
- `class`: ObjectId (Ref: Class, Optional)
- `batch`: ObjectId (Internal ref within Course, Optional)
- `teacher`: ObjectId (Ref: User)
- `dueDate`: Date
- `maxPoints`: Number

## Relationships
- An **Assignment** is created by one **Teacher**.
- An **Assignment** targets either one **Class** OR one **Course Batch**.
- A **Submission** belongs to one **Assignment** and one **Student**.

## Validation Rules
- `createAssignment`:
  - MUST have either `classId` OR `batchId`.
  - `courseId` is always required for categorization.
  - `dueDate` must be in the future.
