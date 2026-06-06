# Data Model: Notifications

## Entity: Notification
Represents a real-time or persistent alert sent to a user.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `recipient` | ObjectId (User) | The user who receives the notification | Required, indexed |
| `type` | String | Category of the notification | Enum: SYSTEM, ENROLLMENT, ACADEMIC, FEE, MESSAGE |
| `title` | String | Short headline | Required |
| `content` | String | Detailed message body | Required |
| `data` | Mixed | Metadata (e.g., entity IDs, links) | Optional |
| `priority` | String | Urgency level | Enum: low, medium, high, urgent |
| `channels` | Array<String> | Delivery methods used | Enum: db, socket, email |
| `readAt` | Date | When the user viewed the notification | Optional |
| `expiresAt` | Date | Automatic cleanup timestamp | Optional |

## Relationships
- **Notification -> User**: Belongs to a recipient.
- **Notification -> Author**: (Implicit) Could be system-generated or triggered by another user's action.
