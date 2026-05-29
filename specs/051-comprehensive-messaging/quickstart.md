# Quickstart: Comprehensive Messaging Implementation

## Phase 1: Real-time Indicators (Socket.IO)
1. **Update `socket.ts`**:
   - Add listeners for `typing`, `stopTyping`, and `messagesRead`.
   - Broadcast these events to the appropriate receiver or group room.
2. **Update `messages.html`**:
   - Add keyup listeners to the message input to emit `typing` with a debounce.
   - Listen for `userTyping` and show a "User is typing..." indicator above the chat box.

## Phase 2: Read Receipts
1. **Frontend**: When opening a chat or receiving a message while the chat is active, emit `messagesRead`.
2. **Backend (`socket.ts`)**: Upon receiving `messagesRead`, update the MongoDB `Message` documents (setting `isRead = true` or pushing to `readBy`). Then emit `readReceipt`.
3. **Frontend Sidebar**: Add an endpoint `GET /api/chat/unread` to fetch unread counts and display badges in the sidebar.

## Phase 3: File Uploads
1. **Backend**: Install `multer` (`npm install multer`). Create `POST /api/chat/upload` to handle multipart data, save to a `public/uploads/chat` folder, and return the URL.
2. **Frontend**: Add a paperclip icon next to the send button. On click, open file dialog. On select, upload to REST endpoint, then emit `sendMessage` with the returned URL in the `attachments` array. Render attachments in the message bubble.

## Phase 4: Group CRUD & Admin Moderation
1. **Backend**: Implement `PATCH /api/chat/groups/:id` (check if creator or admin).
2. **Backend**: Implement `DELETE /api/chat/messages/:id` (admin only).
3. **Frontend**: Add "Edit Group" modal and "Delete Message" trash can icon (visible only to admins).
