# Research: Comprehensive Messaging Features

## Decision: Read Receipts Strategy
**Rationale**: For Direct Messages, a simple `isRead` boolean is sufficient. When a user opens a DM, we will emit a `markAsRead` event for all unread messages from that sender. For Groups, we use an array of ObjectIds (`readBy`). 
**Alternatives**: Using a separate `ReadReceipt` collection. Rejected as overkill; embedded arrays are fast enough for typical class-sized groups (e.g., 30-50 members).

## Decision: Typing Indicators via Socket.IO
**Rationale**: Socket.IO is excellent for ephemeral state like typing indicators. The client will emit `typing` on keypress (debounced) and `stopTyping` after a few seconds of inactivity or upon message send.
**Implementation Detail**: The server will broadcast `userTyping` to the specific `groupId` room or the `partnerId` personal room.

## Decision: File Upload Handling
**Rationale**: Sending large base64 strings through Socket.IO can cause memory issues and latency. We will use standard HTTP REST with `multer` to upload the file to an `uploads/` directory (or cloud storage if configured later), and then send the resulting URL via the Socket.IO `sendMessage` event.
**Security**: Restrict file types to common documents (PDF, DOCX) and images (JPG, PNG) to prevent malicious uploads.
