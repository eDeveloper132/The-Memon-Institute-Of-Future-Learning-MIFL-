# API Contract: Teacher Curriculum Management

## Endpoints

### 1. Update Course Curriculum
- **Method**: `PATCH`
- **URL**: `/api/teacher/courses/:id/curriculum`
- **Auth**: Teacher/Admin
- **Body**:
  ```json
  {
    "outline": "Course overview...",
    "curriculum": [
      { "title": "Module 1", "description": "...", "duration": "Week 1", "order": 1 }
    ]
  }
  ```
- **Response (200)**: `{ "message": "Curriculum updated", "course": { ... } }`
- **Response (403)**: `{ "message": "Curriculum is locked for modification" }`

### 2. Update Class Curriculum
- **Method**: `PATCH`
- **URL**: `/api/teacher/classes/:id/curriculum`
- **Auth**: Class Teacher/Admin
- **Body**:
  ```json
  {
    "classOutline": "Class roadmap...",
    "classCurriculum": [
      { "title": "Term 1", "description": "...", "duration": "Month 1", "order": 1 }
    ]
  }
  ```
- **Response (200)**: `{ "message": "Class curriculum updated", "class": { ... } }`

### 3. Toggle Curriculum Lock (Admin Only)
- **Method**: `PATCH`
- **URL**: `/api/admin/curriculum/lock`
- **Auth**: Admin
- **Body**:
  ```json
  {
    "type": "course" | "class",
    "id": "ObjectId",
    "isLocked": boolean
  }
  ```
- **Response (200)**: `{ "message": "Status updated" }`
