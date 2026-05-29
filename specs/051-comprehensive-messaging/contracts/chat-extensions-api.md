# API Contracts: Comprehensive Messaging Features

## Group Editing (PATCH)
- **Route**: `PATCH /api/chat/groups/:id`
- **Description**: Allows the creator or an admin to update group details or modify the member list.
- **Payload**:
  ```json
  {
    "name": "Updated Name",
    "description": "Updated Description",
    "members": ["id1", "id2"] 
  }
  ```

## Message Deletion (DELETE)
- **Route**: `DELETE /api/chat/messages/:id`
- **Description**: Admin-only route to delete inappropriate messages.
- **Response (200)**: `{ "message": "Message deleted" }`

## Unread Counts (GET)
- **Route**: `GET /api/chat/unread`
- **Description**: Returns the count of unread messages per partner or group.
- **Response (200)**:
  ```json
  {
    "dmUnread": { "partnerId1": 2, "partnerId2": 5 },
    "groupUnread": { "groupId1": 10 }
  }
  ```

## File Upload (POST)
- **Route**: `POST /api/chat/upload`
- **Description**: Accepts `multipart/form-data`. Uploads file to local disk or cloud and returns URL.
- **Response (201)**: `{ "url": "/uploads/filename.jpg" }`
