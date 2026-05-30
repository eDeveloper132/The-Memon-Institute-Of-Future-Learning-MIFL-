# API Contract: Chat UI Interactions

The following existing endpoints are used to populate the WhatsApp-style UI.

## Endpoints

### 1. Get Chat List
- **Method**: `GET`
- **URLs**: `/api/chat/contacts` and `/api/chat/groups`
- **Response**: Array of users and groups.
- **UI Usage**: Populates the sidebar list.

### 2. Get Message History
- **Method**: `GET`
- **URL**: `/api/chat/messages`
- **Query Params**: `partnerId` or `groupId`
- **Response**: Array of message objects.
- **UI Usage**: Populates the conversation window.

### 3. Send Message
- **Method**: `Socket.IO` Event `sendMessage`
- **Payload**: `{ sender, receiver/groupId, content, attachments }`
- **UI Usage**: Triggers bubble creation and status update.

### 4. Upload File
- **Method**: `POST`
- **URL**: `/api/chat/upload`
- **Body**: `FormData` (file)
- **Response**: `{ url }`
- **UI Usage**: Used when clicking the paperclip icon.
