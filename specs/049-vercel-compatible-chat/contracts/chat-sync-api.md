# API Contracts: Serverless Chat Sync

## Endpoint: Sync Deltas (Polling)
- **Route**: `GET /api/chat/sync`
- **Query Params**:
  - `since`: (Optional) ISO 8601 Timestamp. If provided, returns only data created *after* this time. If omitted, returns data from the last 1 hour.
- **Description**: Lightweight endpoint designed to be hit every 3-10 seconds by the client to fetch new messages and system notifications.
- **Response (200)**:
  ```json
  {
    "newMessages": [
      {
         "_id": "...", 
         "sender": { "_id": "...", "name": "...", "profilePicture": "..." },
         "receiver": "...", // If DM
         "group": "...", // If Group
         "content": "...",
         "createdAt": "2026-05-28T14:30:00.000Z"
      }
    ],
    "newNotices": [
      {
         "_id": "...",
         "title": "...",
         "content": "...",
         "createdAt": "2026-05-28T14:31:00.000Z"
      }
    ],
    "timestamp": "2026-05-28T14:31:05.000Z" // The exact server time when query executed
  }
  ```

## Updates to existing endpoints
- `POST /api/chat/messages`: Will no longer use Socket.IO fallback. It will just save to MongoDB and return 201. The receiving client will pick it up on their next polling cycle.
- `POST /api/auth/login` and `POST /api/auth/logout`: Remove Socket.IO activity emitting. Activity will either be dropped or transitioned to a DB-backed status indicator.
