# Data Model: Comprehensive Messaging Enhancements

The existing schema for `Message` already supports what we need based on the previous phase (it has `group`, `receiver`, `isRead`, and `readBy` fields). We just need to implement the endpoints and logic to utilize them properly.

## Entity Updates Summary

### `Message`
- `isRead`: Boolean (defaults to `false`). Updated when the receiver views the chat.
- `readBy`: Array of ObjectIds. Updated when a group member views the chat.
- `attachments`: Array of Strings (URLs). Populated when a file upload occurs.

### `ChatGroup`
- No schema changes required, but we will add PATCH and DELETE endpoints to manage the existing fields (`name`, `description`, `members`).

## Socket Events

- `typing`: Client sends `{ receiverId: string, groupId?: string }`
- `stopTyping`: Client sends `{ receiverId: string, groupId?: string }`
- `userTyping`: Server broadcasts `{ userId: string, name: string, groupId?: string }`
- `userStoppedTyping`: Server broadcasts `{ userId: string, groupId?: string }`
- `messagesRead`: Client sends `{ messageIds: string[], groupId?: string }`
- `readReceipt`: Server broadcasts `{ messageIds: string[], readBy: string }`
