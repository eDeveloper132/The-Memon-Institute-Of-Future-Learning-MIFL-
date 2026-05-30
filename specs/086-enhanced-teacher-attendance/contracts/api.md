# API Contract: Enhanced Teacher Attendance

## Endpoints

### 1. Get Teacher Courses
- **Method**: `GET`
- **URL**: `/api/teacher/courses`
- **Response** (200):
  ```json
  {
    "courses": [
      {
        "_id": "...",
        "title": "Physics 101",
        "batches": [
          { "_id": "...", "name": "Morning Batch", "students": ["..."] }
        ]
      }
    ]
  }
  ```

### 2. Get Attendance Data (Updated)
- **Method**: `GET`
- **URL**: `/api/teacher/attendance`
- **Query Params**:
  - `classId`: (optional)
  - `courseId`: (optional)
  - `batchId`: (optional, required if courseId present)
  - `date`: (required)
- **Response** (200):
  ```json
  {
    "students": [ { "_id": "...", "name": "..." } ],
    "records": [ { "student": "...", "status": "present" } ]
  }
  ```

### 3. Mark Attendance (Updated)
- **Method**: `POST`
- **URL**: `/api/teacher/attendance`
- **Body**:
  ```json
  {
    "classId": "...", (optional)
    "courseId": "...", (optional)
    "attendanceData": [ { "studentId": "...", "status": "present" } ],
    "date": "2026-05-30"
  }
  ```
