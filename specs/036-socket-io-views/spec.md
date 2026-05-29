# Feature Specification: Implement Socket.IO in Views

## Overview
Implement real-time updates using Socket.IO across various views in the application (Admin, Teacher, Student, Parent).

## User Stories
- As a user, I want to receive real-time notifications for new messages, notices, and status updates without reloading the page.
- As an admin, I want to see real-time activity updates.

## Requirements
- Load Socket.IO client from CDN in all protected views.
- Initialize socket connection upon user login.
- Listen for 'notification' events and show toasts.
- Listen for 'receiveMessage' events in chat views.
- Handle disconnection and reconnection gracefully.

## Acceptance Criteria
- Socket.IO client script loads successfully in all dashboard pages.
- Real-time toasts appear when a 'notification' event is emitted by the server.
- No 404 errors for socket.io.js.
- CSP allows socket.io connections.
