# API Contract: Student Notices

## GET /api/student/notices
Retrieves a filtered list of notices for the authenticated student.

### Response (200 OK)
```json
{
  "notices": [
    {
      "_id": "6a...",
      "title": "Final Exam Schedule",
      "content": "Full schedule attached...",
      "type": "exam",
      "isPinned": true,
      "attachments": ["https://.../exam.pdf"],
      "createdAt": "2026-06-01T10:00:00Z"
    }
  ]
}
```

### Errors
- **401**: Unauthorized
- **403**: Forbidden (Non-student role)

## POST /api/admin/notices (Existing)
Updated to include `type` field in payload.

### Request Body
```json
{
  "title": "String",
  "content": "String",
  "audience": ["students"],
  "targetClass": "ObjectId (Optional)",
  "type": "academic | exam | holiday | event | admin",
  "isPinned": "Boolean",
  "expiryDate": "Date (Optional)"
}
```
