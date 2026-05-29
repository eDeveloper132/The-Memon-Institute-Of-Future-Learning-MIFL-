# Data Model & Events: Socket.IO in Views

## Existing Entities Involved
- **User**: Used for identification and joining rooms.
- **Message**: Data structure for real-time chat.
- **Notice**: Data structure for real-time announcements.

## Socket.IO Events

### Client -> Server
- `join`: Sent by the client with `userId` to join a private room for personal notifications and messages.
- `sendMessage`: Sent by the client to send a new message.

### Server -> Client
- `receiveMessage`: Emitted to the receiver's room when a new message is sent.
- `notification`: Emitted globally or to specific rooms for system-wide or personal updates (e.g., "New Notice Posted", "Fee Voucher Generated").
- `messageSent`: Confirmation emitted to the sender.
