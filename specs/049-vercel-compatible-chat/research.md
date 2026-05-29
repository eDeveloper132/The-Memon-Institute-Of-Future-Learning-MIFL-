# Research: Serverless Real-Time Alternatives

## Problem Statement
The current chat uses Socket.IO. On Vercel, requests to `/socket.io/` return 404 because Vercel Serverless Functions do not run a persistent HTTP server and do not support WebSocket upgrades.

## Alternatives Evaluated

### 1. Server-Sent Events (SSE)
- **Pros**: Unidirectional real-time stream using standard HTTP.
- **Cons**: Vercel has execution timeouts (e.g., 10s or 60s max). SSE keeps the connection open, which will hit the timeout limit and kill the serverless function, causing instability and high execution billing.
- **Verdict**: Rejected.

### 2. Third-Party Managed WebSockets (Pusher, Ably)
- **Pros**: True real-time WebSockets, offloads connection management to a dedicated service.
- **Cons**: Requires creating external accounts, managing new API keys, and vendor lock-in. Overkill for the immediate goal of getting the existing code working on Vercel.
- **Verdict**: Rejected for MVP, but recommended as a future upgrade if chat volume grows significantly.

### 3. HTTP Short Polling (Delta Sync)
- **Pros**: 100% compatible with Vercel's stateless, short-lived function architecture. Very easy to implement using standard REST APIs.
- **Cons**: Introduces a slight delay (e.g., 3-5 seconds) and increases the number of HTTP requests hitting the server.
- **Verdict**: **ACCEPTED**. To mitigate the cons, we will implement "Delta Syncing" (only fetching records newer than `lastSyncTimestamp`) and Adaptive Polling (slowing down the poll rate when the user is inactive).

## Decision: Adaptive HTTP Short Polling
We will replace `socket.emit` with standard `fetch('.../messages', { method: 'POST' })` and replace `socket.on('receiveMessage')` with a `setInterval` loop that hits a new `GET /api/chat/sync?since=TIMESTAMP` endpoint.
