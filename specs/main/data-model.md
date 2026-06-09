# Data Model & Contracts

No schema changes are required for this fix. The curriculum schema is already correctly storing the data.

## API Contracts

### 1. Get Student Roadmaps (New)
- **Method**: `GET`
- **URL**: `/api/student/roadmaps`
- **Authentication**: Required (Student)
- **Response**:
  ```json
  {
    "myClass": {
      "_id": "...",
      "name": "...",
      "classOutline": "...",
      "classCurriculumSections": [...]
    },
    "myCourses": [
      {
        "_id": "...",
        "title": "...",
        "outline": "...",
        "curriculumSections": [...]
      }
    ]
  }
  ```
