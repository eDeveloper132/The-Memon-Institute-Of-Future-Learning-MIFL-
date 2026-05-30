# Data Model: WhatsApp-style Chat UI

## Entities

### Chat (UI Perspective)
- `type`: 'user' | 'group'
- `id`: Unique identifier (User ID or Group ID)
- `name`: Display name
- `avatar`: URL or initials
- `lastMessage`: Text of the most recent message
- `lastTimestamp`: Time of the last message
- `unreadCount`: Number of unread messages

### Message (UI Perspective)
- `id`: Unique identifier
- `content`: Text or file URL
- `senderId`: ID of the sender
- `timestamp`: Creation time
- `status`: 'sent' | 'delivered' | 'read'
- `isSentByMe`: Boolean (derived from `senderId === currentUser.id`)

## Relationships
- A **User** has many **Chats**.
- A **Chat** has many **Messages**.

## State Transitions (Mobile UI)
- **LIST_VIEW**: Show the sidebar (chat list) full width. Hide the chat window.
- **CHAT_VIEW**: Hide the sidebar. Show the chat window full width. Add a "Back" button to return to `LIST_VIEW`.
