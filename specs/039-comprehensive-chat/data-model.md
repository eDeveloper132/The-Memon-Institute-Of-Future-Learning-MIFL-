# Data Model: Comprehensive Chat System

## New Entity: `ChatGroup`
Stores metadata for group conversations.

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Display name of the group |
| `description` | String | Optional group description |
| `creator` | ObjectId (User) | Teacher or Admin who created the group |
| `members` | [ObjectId (User)] | List of users in the group |
| `classBatch` | { classId: ObjectId, batchName: String } | Link to origin class/batch (if applicable) |
| `isArchived` | Boolean | Soft delete status |

## Updated Entity: `Message`
Supports both direct and group messaging.

| Field | Type | Description |
|-------|------|-------------|
| `sender` | ObjectId (User) | REQUIRED: The message author |
| `receiver` | ObjectId (User) | OPTIONAL: Target user for Direct Messages |
| `group` | ObjectId (ChatGroup) | OPTIONAL: Target group for Group Chats |
| `content` | String | REQUIRED: Message text |
| `attachments` | [String] | List of file URLs |
| `isRead` | Boolean | DM specific: track if receiver read it |
| `readBy` | [ObjectId (User)] | Group specific: track which members read it |

## Permission Scoping Logic

- **Teacher DM List**:
  - `role: admin`
  - `role: teacher`
  - `role: student` WHERE `student.currentClass` teaching by THIS teacher.
  - `role: parent` WHERE `parent.child.currentClass` teaching by THIS teacher.

- **Student DM List**:
  - `role: teacher`
  - `role: admin`
  - `role: student` WHERE `student.batch` EQUALS `this.student.batch`.

- **Parent DM List**:
  - `role: teacher` WHERE `teacher` teaches `parent.child`.
  - `role: admin`
