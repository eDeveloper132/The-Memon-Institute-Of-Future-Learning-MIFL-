# API Contracts: Courses

## Create Course
- **URL**: `/api/admin/courses`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Advanced Physics",
    "code": "PHYS202",
    "credits": 3.5,
    "department": "...",
    "teacher": "...",
    "enrollmentFee": 5000
  }
  ```

## Update Course
- **URL**: `/api/admin/courses/:id`
- **Method**: `PATCH`
- **Body**:
  ```json
  {
    "title": "Advanced Physics Updated",
    "credits": 4.0
  }
  ```
