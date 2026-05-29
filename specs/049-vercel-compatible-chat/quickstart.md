# Quickstart: Vercel-Compatible Chat Implementation

## Phase 1: Backend Cleanup
1. **Remove Socket.IO**:
   - `npm uninstall socket.io` (Optional but good practice).
   - Delete `socket.ts`.
   - Remove socket setup and middleware from `index.ts`.
   - Remove `req.io` usage in `controllers/chat.controller.ts`, `auth.controller.ts`, `admin.controller.ts`.

## Phase 2: The Polling API
1. **Add Sync Endpoint**:
   - Create `syncData` controller in `chat.controller.ts`.
   - Add `GET /api/chat/sync` to `chat.routes.ts`.
   - Adjust `middlewares/rateLimiter.ts` to skip or increase limits for `/api/chat/sync`.

## Phase 3: Frontend Polling Engine
1. **Refactor `ui-components.ts`**:
   - Remove CDN script injection for Socket.IO.
   - Replace `initSocket` with `startSyncEngine(user)`.
   - Use `setInterval` to call `/api/chat/sync?since=TIMESTAMP`.
   - On response, dispatch `newMessage` or `notification` CustomEvents.
2. **Update Dashboards & Views**:
   - Change `initSocket(user)` calls to `startSyncEngine(user)` in all `index.html` and `messages.html` files.
   - `messages.html`: When sending a message, rely purely on the REST POST response to append the message locally.

## Testing
- Deploy to Vercel (or test locally).
- Open two browsers. Send a message from User A.
- User B should see the message appear within 3 seconds without a manual refresh, and no 404 errors should appear in the Network tab.
