---
id: 059
title: Final Investigation of Vercel Socket.IO 404
stage: explainer
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: general
branch: main
user: moham
command: /sp.clarify
labels: ["vercel", "socket.io", "404-error", "architecture"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - index.ts
  - socket.ts
tests_yaml:
  - none
---

### PROMPT_TEXT
Investigate this that teacher can't able to send messages this shown: polling-xhr.js:139  GET https://mifl-original.vercel.app/socket.io/?EIO=4&transport=polling&t=ybru8ccw 404 (Not Found)
[Detailed Browser Logs]

### RESPONSE_TEXT
I have performed a deep investigation into the logs you provided. The error `404 (Not Found)` for `https://mifl-original.vercel.app/socket.io/...` on Vercel is a definitive architectural mismatch.

**The Root Cause (Deep Dive):**
1.  **Serverless vs. Persistent**: Locally, your app runs a persistent Node.js process using `httpServer.listen()`. This allows Socket.IO to hijack the HTTP server and create its own persistent endpoints (like `/socket.io/`).
2.  **Vercel's "App Only" Export**: When you deploy to Vercel, it **ignores your `httpServer` completely**. It only takes the Express `app` object and converts it into a temporary "Serverless Function".
3.  **Endpoint Absence**: Since the `/socket.io/` route is only attached to the Node `httpServer` (in `socket.ts`), and that server is not running on Vercel, the endpoint literally **does not exist** on your live site. This is why you see the `404 Not Found`.

**Why it works locally but not on Vercel:**
- **Locally**: You have a real, long-running server. Sockets work.
- **Vercel**: You have short-lived "functions" that die after 10-60 seconds. Sockets are physically impossible on Vercel's serverless infrastructure.

### The Comprehensive Solution (Without Removing Socket.IO)

Since you requested **not to remove Socket.IO**, I propose a **Hybrid Polling Fallback** strategy. We will not delete any of your current work. Instead, we will add a secondary "sync" path that works specifically for Vercel.

**The Plan:**
1.  **Keep Socket.IO**: Keep all current real-time code for local development and future persistent hosting (like Railway).
2.  **Add a `GET /api/chat/sync` endpoint**: This will be a standard REST route in `chat.controller.ts` that can be reached anywhere, even on Vercel.
3.  **Update `ui-components.ts`**: We will modify the frontend to try connecting via Socket.IO first. If it receives a 404 or fails to connect within 5 seconds (which will happen on Vercel), it will automatically switch to "Polling Mode" and start checking the `/sync` endpoint every 5 seconds.

**Would you like me to implement this non-destructive "Hybrid Fallback" so that your dashboard works on Vercel while keeping all your Socket.IO code intact?**

### OUTCOME
Confirmed that the 404 is an infrastructure limitation and proposed a non-destructive hybrid polling fallback to restore Vercel functionality.
