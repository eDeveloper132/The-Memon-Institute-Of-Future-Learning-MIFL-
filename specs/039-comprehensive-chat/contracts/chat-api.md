# API Contracts: Comprehensive Chat System

## Endpoint: Get Allowed Contacts
- **Route**: `GET /api/chat/contacts`
- **Description**: Returns a list of users the current user is allowed to DM, based on the scoping rules defined in the data model.
- **Response (200)**:
  ```json
  {
    "contacts": [
      { "_id": "...", "name": "...", "role": "...", "profilePicture": "..." }
    ]
  }
  ```

## Endpoint: Create Chat Group
- **Route**: `POST /api/chat/groups`
- **Description**: Creates a new group. Verifies teacher's authority over the selected class/batch.
- **Payload**:
  ```json
  {
    "name": "Math 101 Discussion",
    "description": "...",
    "members": ["userId1", "userId2"],
    "classId": "...", // Optional
    "batchName": "..." // Optional
  }
  ```
- **Response (201)**: Returns created `ChatGroup` object.

## Endpoint: Get Chat History
- **Route**: `GET /api/chat/messages`
- **Query Params**:
  - `partnerId`: (Optional) ID of user for DM history.
  - `groupId`: (Optional) ID of group for group history.
- **Description**: Retrieves messages sorted chronologically. Ensures user has permission to view the conversation.

## Endpoint: Send Message (Fallback to Socket)
- **Route**: `POST /api/chat/messages`
- **Description**: While Socket.IO handles real-time delivery, a REST endpoint is useful for initial posting or clients with disabled WebSockets.
- **Payload**:
  ```json
  {
    "receiver": "...", // If DM
    "groupId": "...", // If Group
    "content": "..."
  }
  ```
