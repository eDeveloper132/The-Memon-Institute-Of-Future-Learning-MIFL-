# Data Model: Notification Management & Role Transitions

## 1. Notification Model (`schemas/models/notification.model.ts`)

Represents a persistent notification for a user.

| Field | Type | Description |
|-------|------|-------------|
| `recipient` | ObjectId (User) | The user receiving the notification. |
| `type` | String (Enum) | e.g., 'SYSTEM', 'ENROLLMENT', 'ACADEMIC', 'FEE', 'MESSAGE'. |
| `title` | String | Short title of the notification. |
| `content` | String | Full text content. |
| `data` | Object | Arbitrary payload for frontend actions (e.g., `{ requestId: '...' }`). |
| `priority` | String (Enum) | 'low', 'medium', 'high', 'urgent'. |
| `channels` | [String] | List of channels attempted/used: 'db', 'socket', 'email'. |
| `readAt` | Date | Timestamp when the user read it. |
| `createdAt` | Date | Creation timestamp. |
| `expiresAt` | Date | (Optional) When to auto-archive/delete. |

## 2. Role Change Log Model (`schemas/models/roleChangeLog.model.ts`)

Tracks every automated or manual role transition.

| Field | Type | Description |
|-------|------|-------------|
| `user` | ObjectId (User) | The user whose role changed. |
| `oldRole` | String | Previous role. |
| `newRole` | String | New role assigned. |
| `trigger` | String | What triggered the change (e.g., 'ENROLLMENT_APPROVAL', 'MANUAL_UPDATE'). |
| `changedBy` | ObjectId (User) | (Optional) Admin who approved/initiated. |
| `reason` | String | (Optional) Detailed reason. |
| `createdAt` | Date | Timestamp of change. |

## 3. User Model Extensions (`schemas/models/user.model.ts`)

Updates to the `User` schema to support notification preferences.

| Field | Type | Description |
|-------|------|-------------|
| `notificationPrefs` | Object | `{ email: boolean, socket: boolean, inApp: boolean }`. |
| `status` | String | (Optional) More granular than role, e.g., 'active', 'suspended', 'graduated'. |

## 4. State Transitions (Role Engine)

### Enrollment Workflow
1. `User` (role: 'student', but no class) applies -> `status: 'applicant'`.
2. Admin approves -> `role: 'student'`, `status: 'active'`, `currentClass: targetId`.
3. Log created in `RoleChangeLog`.
4. Notification sent to user.
