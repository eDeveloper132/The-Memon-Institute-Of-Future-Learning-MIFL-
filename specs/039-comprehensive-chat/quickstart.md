# Quickstart: Comprehensive Chat Implementation

## Phase 0: Schemas & Models
1.  **Create `ChatGroup` model** in `schemas/models/chatGroup.model.ts`.
2.  **Update `Message` model** in `schemas/models/message.model.ts` to include the `group` field.

## Phase 1: API Development
1.  **Create `chat.controller.ts`** with endpoints:
    - `POST /api/chat/groups`: Create a group (Teacher/Admin).
    - `GET /api/chat/groups`: Get user's groups.
    - `GET /api/chat/messages`: Fetch conversation history (scoped).
    - `GET /api/chat/contacts`: Fetch allowed DM contacts based on role/permissions.
2.  **Mount routes** in `routes/chat.routes.ts`.

## Phase 2: Socket.IO Integration
1.  **Update `socket.ts`**:
    - Handle `joinGroup` event.
    - Update `sendMessage` to detect `groupId` and emit to group rooms.
2.  **Update `ui-components.ts`**:
    - `initSocket` should automatically fetch user's groups and join them.

## Phase 3: Frontend Refactoring
1.  **Create `messages.html`** in `public/protected/` (unified for all roles).
2.  **Implement sidebar**: List recent chats (Direct and Group).
3.  **Implement search/contact picker**: Filtered by backend contact scoping.

## Testing Scenarios
1.  **Teacher Context**: Create group -> Select students from own batch -> Send message -> Verify students receive.
2.  **Student Context**: DM another student in the same batch -> Verify success.
3.  **Parent Context**: DM their child's teacher -> Verify success.
4.  **Admin Context**: View all groups -> Verify CRUD access.
