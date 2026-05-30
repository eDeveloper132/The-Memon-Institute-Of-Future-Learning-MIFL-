# API Contract: Targeted Assignments

## Endpoints

### 1. Create Assignment
- **Method**: `POST`
- **URL**: `/api/teacher/assignments`
- **Body**:
  ```json
  {
    "title": "Assignment 1",
    "description": "Do this task",
    "course": "COURSE_ID",
    "class": "CLASS_ID", (optional if batch present)
    "batch": "BATCH_ID", (optional if class present)
    "dueDate": "2026-06-01",
    "maxPoints": 100
  }
  ```

### 2. Get Assignments
- **Method**: `GET`
- **URL**: `/api/teacher/assignments`
- **Response**: Array of assignments with populated `course`, `class`, and `batch` info (where applicable).

### 3. Student Notifications
- **Room**: `class:CLASS_ID` or `course:COURSE_ID`
- **Payload**: Includes `batchId` if specific to a batch.
