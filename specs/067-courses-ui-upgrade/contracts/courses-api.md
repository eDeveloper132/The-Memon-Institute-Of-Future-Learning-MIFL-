# API Contracts: Course Batches

## Endpoint: Update Course Batches
- **Route**: `PATCH /api/admin/coursebatches/:id`
- **Description**: Updates the batches array for a specific course.
- **Payload**:
  ```json
  {
    "batches": [
      {
        "name": "Morning Batch",
        "students": ["userId1", "userId2"]
      }
    ]
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Batches updated",
    "course": { ... }
  }
  ```

## Endpoint: Get All Courses (Updated)
- **Route**: `GET /api/admin/courses`
- **Description**: Returns all courses with populated teacher, department, and batch students.
- **Response (200)**:
  ```json
  {
    "courses": [
      {
        "title": "...",
        "batches": [
          {
            "name": "...",
            "students": [ { "_id": "...", "name": "..." } ]
          }
        ]
      }
    ]
  }
  ```
