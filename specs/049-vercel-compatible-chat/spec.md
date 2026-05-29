# Feature Specification: Vercel-Compatible Chat System

## Overview
Refactor the existing Comprehensive Chat Messaging System to function correctly on Vercel's serverless infrastructure. The current Socket.IO implementation fails with a 404 error because Vercel does not support long-running WebSockets or persistent Node `httpServer` instances.

## User Stories
*User functionality remains identical to the previous implementation:*
- As a user (Admin, Teacher, Student, Parent), I want to send and receive direct and group messages.
- As a user, I want to receive near real-time updates and notifications without manually refreshing the entire page.
- As an administrator, I want the system to deploy smoothly to Vercel without requiring complex third-party real-time infrastructure (like Pusher) right now.

## Functional Requirements
1. **Remove Socket.IO**: Completely strip Socket.IO client and server code from the application.
2. **Serverless Polling Engine**: Implement an efficient, lightweight HTTP Short Polling mechanism.
3. **Delta Syncing**: The client should only request messages or notifications created *after* the last sync timestamp to prevent overloading the database.
4. **Adaptive Polling Rates**: The polling interval should be dynamic (e.g., poll every 3 seconds when the chat window is active, slow down to 15 seconds when idle or only checking for global notifications).

## Acceptance Criteria
- No 404 errors related to WebSockets or Socket.IO on Vercel.
- Messages sent from one browser appear in another browser within 5 seconds without manual page reload.
- The `ui-components.ts` uses standard `fetch` or `XMLHttpRequest` for syncing.
- Serverless function execution times remain low (under 2 seconds per polling request).
