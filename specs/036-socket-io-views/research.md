# Research: Socket.IO in Views

## Decision: Use Centralized `initSocket` in `ui-components.ts`
**Rationale**: Instead of repeating socket initialization logic in every HTML file, we will use the existing `ui-components.ts` (which is already included in all protected views) to provide a global `initSocket` function.
**Alternatives considered**: 
- Adding `<script>` tags to every page: Rejected due to maintenance overhead.
- Creating a separate `socket-client.js`: Rejected; `ui-components.ts` is a better place for shared UI-related logic.

## Decision: Load Socket.IO Client from CDN
**Rationale**: Vercel serverless functions do not serve the `/socket.io/socket.io.js` path correctly. Using the CDN ensures the client library is always available.
**Alternatives considered**:
- Bundling with Webpack/Vite: The project currently uses raw TypeScript/JavaScript files in `public/`, so CDN is the simplest and most effective solution.

## Decision: Addressing Vercel WebSocket Limitations
**Rationale**: Vercel's serverless functions have execution limits and do not support long-lived WebSocket connections. 
**Recommendation**: For production real-time features, a dedicated server (e.g., Railway, Heroku, or a VPS) or a managed service (e.g., Pusher, Ably) is required. For the current development/prototype phase, we will implement the logic such that it *would* work on a persistent server, and we will warn the user about Vercel's limitations.
**Alternatives considered**:
- Long polling: Still limited by serverless function timeouts.
- Server-Sent Events (SSE): Better for one-way updates, but still hits execution limits.
