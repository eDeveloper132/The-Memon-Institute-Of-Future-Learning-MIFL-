---
id: 027
title: Fix Socket.IO 404 Error
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: general
branch: main
user: moham
command: /sp.implement
labels: ["socket.io", "bug-fix", "vercel"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - public/components/ui-components.ts
  - public/protected/index.html
  - public/protected/parent/messages.html
tests_yaml:
  - none
---

### PROMPT_TEXT
when I reload the dashboard page of admin than browser shows me this error on console:
[Socket] Loading Socket.IO client script...
ui-components.ts:334  GET https://mifl-original.vercel.app/socket.io/socket.io.js net::ERR_ABORTED 404 (Not Found)
(anonymous) @ ui-components.ts:334
(anonymous) @ ui-components.ts:329
fetchProfile @ index.html:98
await in fetchProfile
(anonymous) @ index.html:122
index.html:1 Refused to execute script from 'https://mifl-original.vercel.app/socket.io/socket.io.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
ui-components.ts:333 Uncaught (in promise) Error: Failed to load Socket.IO script
    at script.onerror (ui-components.ts:333:43)

### RESPONSE_TEXT
I have fixed the Socket.IO 404 error by switching from a local script path to a CDN. 

The issue was that Vercel serverless functions do not serve the Socket.IO client script at `/socket.io/socket.io.js` by default. By using the official CDN (`https://cdn.socket.io/4.8.3/socket.io.min.js`), the browser can now successfully load the library.

Modified files:
1. `public/components/ui-components.ts`: Updated dynamic script loading logic.
2. `public/protected/index.html`: Updated hardcoded script tag.
3. `public/protected/parent/messages.html`: Updated hardcoded script tag.

**Note:** While this fixes the script loading error, please be aware that Socket.IO WebSockets typically require a persistent server and may not work out-of-the-box on Vercel's serverless infrastructure. You might need to use a separate server for WebSockets or a service like Pusher/Ably for real-time features in production.

### OUTCOME
Fixed the 404 error for the Socket.IO client script.
