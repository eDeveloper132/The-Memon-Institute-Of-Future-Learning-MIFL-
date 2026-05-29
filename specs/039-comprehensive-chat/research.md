# Research: Comprehensive Centralized Chat System

## Decision: Separate `ChatGroup` model
**Rationale**: Direct messages are one-to-one, while groups are one-to-many. A separate `ChatGroup` model will store metadata (name, creator, members) and handle scoped permissions more efficiently.
**Alternatives considered**:
- Adding a `groupId` field to `Message`: Feasible, but managing membership and group metadata within the `Message` model becomes messy.

## Decision: Scoped Querying for Members
**Rationale**: To fulfill the requirements of "class batch selected students", we need to perform lookups in the `Class` model. When a teacher creates a group, the frontend will provide students from the teacher's assigned `batches`.
**Verification**: We must verify that the teacher is indeed the `classTeacher` for the selected class/batch.

## Decision: Dual Message Handling (Direct vs Group)
**Rationale**:
- **Direct Message**: `sender` + `receiver` (User ID).
- **Group Message**: `sender` + `group` (ChatGroup ID).
We will update the `Message` schema to support an optional `group` field.

## Decision: Dynamic Room Management in Socket.IO
**Rationale**: Users will automatically join rooms for each `ChatGroup` they belong to upon `initSocket`. 
- Private room: `user:{userId}`
- Group rooms: `group:{groupId}`
- Role rooms (already implemented): `role:{role}`

## Decision: Parent-Teacher Relationship Mapping
**Rationale**: Parents can DM teachers of their children. We will verify this by finding the child (student) linked to the parent and checking the student's `currentClass` and the class's `classTeacher`.
