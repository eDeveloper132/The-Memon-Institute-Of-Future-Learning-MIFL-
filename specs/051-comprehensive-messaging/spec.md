# Feature Specification: Comprehensive Messaging Enhancements

## Overview
Enhance the existing centralized chat messaging system (which uses Socket.IO) with comprehensive features. We are explicitly **keeping Socket.IO** as the real-time engine. The focus is on enriching the chat experience, improving UI/UX, and adding advanced messaging capabilities that leverage our established Socket.IO infrastructure.

## User Stories
- As a user, I want to see a read-receipt or "seen" status for my direct messages so I know when the recipient has read them.
- As a user, I want to see a "typing..." indicator when the other person is typing a message to me.
- As a user, I want to be able to upload and send file attachments (images, PDFs) in my chats.
- As a user, I want unread message badges in my sidebar to quickly identify conversations that need my attention.
- As a teacher/admin, I want the ability to edit group details (name, description) or remove members from groups I created.
- As an admin, I want to be able to delete inappropriate messages across the system.

## Functional Requirements
1. **Typing Indicators**: Implement `typing` and `stopTyping` Socket.IO events.
2. **Read Receipts**: Implement `markAsRead` functionality and broadcast the update via Socket.IO. Update the DB `isRead` flag for DMs and `readBy` array for Groups.
3. **Unread Badges**: Calculate unread message counts upon fetching sidebar contacts/groups and display them in the UI.
4. **File Attachments**: Add an upload endpoint (e.g., using `multer` for local storage or a cloud provider) and attach the resulting URLs to the `Message` object.
5. **Group Management Editing**: Add `PATCH /api/chat/groups/:id` to update group details or members.
6. **Message Deletion**: Add `DELETE /api/chat/messages/:id` for admins to moderate chat.

## Acceptance Criteria
- Socket.IO remains fully integrated and functional.
- "Typing..." text appears above the chat input when the active partner is typing.
- Unread messages are distinctly highlighted in the sidebar.
- Users can upload files and view them as links/images in the chat window.
- Admins can successfully delete a message and the UI updates accordingly.
