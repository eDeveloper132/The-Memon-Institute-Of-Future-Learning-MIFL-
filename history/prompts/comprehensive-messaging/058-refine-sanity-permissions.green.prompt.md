---
id: 058
title: Refine Sanity Uploads and Permissions
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: comprehensive-messaging
branch: main
user: moham
command: /sp.implement
labels: ["sanity", "bug-fix", "permissions", "upload"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - middlewares/upload.ts
  - controllers/chat.controller.ts
tests_yaml:
  - none
---

### PROMPT_TEXT
[Log Output showing 403 Insufficient Permissions from Sanity and Invalid File Type from Multer]

### RESPONSE_TEXT
I have refined the upload system to provide better diagnostics and more efficient asset handling in Sanity.

1.  **Broader File Support**: Updated `middlewares/upload.ts` to explicitly allow `image/jpg` and `image/webp`. I also added a detailed console warning that logs exactly which MIME type was blocked, helping us debug "Invalid file type" errors in the future.
2.  **Smart Asset Tagging**: Modified `controllers/chat.controller.ts` to dynamically switch between Sanity's `image` and `file` asset types based on the file's MIME type. This allows Sanity to provide optimized previews for images while handling PDFs/DOCs as general files.
3.  **Permission Diagnostics**: The `403 Forbidden` error in your logs (`Insufficient permissions; permission "create" required`) confirms that the Sanity API Token provided does not have write access.

### ACTION REQUIRED: Fix Sanity Token
The current token is likely a "Viewer" token. To fix the `403` error:
1.  Go to [Sanity Manage](https://www.sanity.io/manage).
2.  Select your project (`ieaejerj`).
3.  Go to **API** -> **Tokens**.
4.  Create a **new token** with the **"Editor"** or **"Administrator"** role.
5.  Update the `SANITY_API_TOKEN` in your `.env` file and restart the server.

### OUTCOME
Improved upload diagnostics and asset categorization. Ready for use once the correct Sanity API Token is applied.
