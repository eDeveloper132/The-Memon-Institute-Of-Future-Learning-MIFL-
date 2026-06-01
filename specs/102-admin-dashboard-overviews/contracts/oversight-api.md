# Admin Oversight API Contracts

All endpoints require `authenticate` and `authorize('admin')`.

## Oversight Data Aggregation

### GET `/api/admin/oversight/student/:id`
- **Success (200)**:
  ```json
  {
    "student": User,
    "attendance": "95%",
    "results": [...],
    "assignments": [...],
    "fees": [...]
  }
  ```

### GET `/api/admin/oversight/teacher/:id`
- **Success (200)**:
  ```json
  {
    "teacher": User,
    "stats": {
        "classesCount": 3,
        "totalStudents": 120,
        "pendingGrading": 15
    },
    "classes": [...]
  }
  ```

### GET `/api/admin/oversight/parent/:id`
- **Success (200)**:
  ```json
  {
    "parent": User,
    "children": [
        {
            "student": User,
            "summary": {
                "attendance": "90%",
                "recentGrade": "A"
            }
        }
    ]
  }
  ```
