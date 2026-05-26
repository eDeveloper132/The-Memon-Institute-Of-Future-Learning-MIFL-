# API Contracts: Department Retrieval

## Get All Departments
- **Method**: `GET /api/admin/departments`
- **Auth**: Admin only
- **Response**:
  ```json
  {
    "departments": [
      {
        "_id": "...",
        "name": "Science",
        "code": "SCI"
      }
    ]
  }
  ```
