# API Contracts: Notifications

## Get My Notifications
Retrieve a list of notifications for the authenticated user.

- **URL**: `/api/notifications`
- **Method**: `GET`
- **Query Params**:
  - `status`: `unread` | `read` | `all` (default: `all`)
- **Success Response**: `200 OK`
  ```json
  {
    "notifications": [
      {
        "_id": "...",
        "type": "SYSTEM",
        "title": "Welcome to MIFL",
        "content": "Explore your new dashboard...",
        "priority": "medium",
        "createdAt": "2026-06-06T..."
      }
    ]
  }
  ```

## Mark Notification as Read
Update the `readAt` timestamp for a single notification.

- **URL**: `/api/notifications/:id/read`
- **Method**: `PATCH`
- **Success Response**: `200 OK`

## Mark All as Read
Bulk update all unread notifications.

- **URL**: `/api/notifications/read-all`
- **Method**: `PATCH`
- **Success Response**: `200 OK`
