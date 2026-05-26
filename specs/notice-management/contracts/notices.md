# API Contracts: Notice Management

## Admin Endpoints
`Base Path: /api/admin/notices`

### 1. List All Notices
- **Method**: `GET /`
- **Auth**: Required (Admin)
- **Response**: `200 OK`
  ```json
  {
    "notices": [
      {
        "id": "...",
        "title": "...",
        "content": "...",
        "isPinned": true,
        "createdAt": "..."
      }
    ]
  }
  ```

### 2. Create Notice
- **Method**: `POST /`
- **Auth**: Required (Admin)
- **Body**:
  ```json
  {
    "title": "Holiday Announcement",
    "content": "School will be closed...",
    "audience": ["students", "parents"],
    "targetClass": "65f... (optional)",
    "expiryDate": "2026-06-01 (optional)",
    "isPinned": true
  }
  ```
- **Response**: `201 Created`

### 3. Update Notice
- **Method**: `PATCH /:id`
- **Auth**: Required (Admin)
- **Body**: Same as Create (Partial)

### 4. Delete Notice
- **Method**: `DELETE /:id`

## User Endpoints

### 1. Student Notices
- **Method**: `GET /api/student/notices`
- **Filters**: Audience ('all', 'students') OR targetClass matching student.

### 2. Teacher Notices
- **Method**: `GET /api/teacher/notices`
- **Filters**: Audience ('all', 'teachers').
