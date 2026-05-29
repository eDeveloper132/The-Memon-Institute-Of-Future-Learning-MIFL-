---
id: 047
title: Vercel Socket.IO 404 Explanation
stage: explainer
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: general
branch: main
user: moham
command: /sp.clarify
labels: ["vercel", "socket.io", "architecture"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - index.ts
  - vercel.json
tests_yaml:
  - none
---

### PROMPT_TEXT
teacher not able to send messages in vercel but it runs correctly in local:
polling-xhr.js:139  GET https://mifl-original.vercel.app/socket.io/?EIO=4&transport=polling&t=ybru8ccw 404 (Not Found)

### RESPONSE_TEXT
The reason Socket.IO works locally but throws a `404 Not Found` error on Vercel is due to a fundamental architectural limitation of Vercel Serverless Functions.

**Why it fails on Vercel:**
1. **Serverless execution**: Vercel does not run a traditional, persistent Node.js server. Instead, it spins up a temporary "Serverless Function" for every HTTP request.
2. **WebSockets are blocked**: Socket.IO requires a long-lived, persistent connection (a WebSocket or long-polling loop) to keep the communication channel open. Vercel automatically terminates requests that take too long and does not support WebSocket upgrades out-of-the-box.
3. **The `httpServer` bypass**: In `index.ts`, you correctly set up `const httpServer = createServer(app); const io = setupSocket(httpServer);`. Locally, you start the server listening on a port. On Vercel, however, Vercel ignores the `httpServer.listen()` block and only exports the base Express `app`. Because the Express `app` itself doesn't contain the `/socket.io/` routes (they are attached to the outer `httpServer`), Vercel returns a 404 when the client tries to reach that endpoint.

**How to solve this for production:**
Because Vercel is designed for stateless APIs and static hosting, you have two primary options:

1. **Deploy to a persistent host (Recommended for full Socket.IO)**: 
   Move the backend deployment to a platform that supports persistent Node.js servers, such as **Railway**, **Render**, **Heroku**, or a **VPS (DigitalOcean/AWS)**. This requires zero code changes.

2. **Use a managed Real-time Service**: 
   Keep the API on Vercel, but replace Socket.IO with a managed third-party service designed for serverless environments. Popular options include:
   - **Pusher Channels**
   - **Ably**
   - **Supabase Realtime**
   This requires refactoring the backend emitting logic and the frontend listener logic.

### OUTCOME
Explained the architectural limitation of Vercel regarding WebSockets and provided deployment alternatives.
