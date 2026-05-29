---
id: 055
title: Fix Vercel Read-Only Filesystem Crash
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: comprehensive-messaging
branch: main
user: moham
command: /sp.implement
labels: ["bug-fix", "vercel", "multer", "serverless"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - middlewares/upload.ts
tests_yaml:
  - none
---

### PROMPT_TEXT
vercel function returns this: 2026-05-29 15:20:10.578 [error] Error: ENOENT: no such file or directory, mkdir '/var/task/public/uploads/chat'
    at Object.mkdirSync (node:fs:1349:26)
    ...

### RESPONSE_TEXT
I have fixed the crash occurring on Vercel deployment caused by the attempt to write to a read-only directory.

In a Vercel serverless environment, the filesystem is read-only except for the `/tmp` directory. The previous code was trying to create and write to `public/uploads/chat`, which is blocked. I have refactored `middlewares/upload.ts` to:
1. Detect if the app is running on Vercel.
2. Redirect uploads to the `/tmp` directory when in production/Vercel.
3. Wrap the directory creation logic in a `try-catch` block to ensure that even if directory creation fails, the serverless function does not crash on startup.

**Important Note:** Files uploaded to `/tmp` on Vercel are **ephemeral** and will be deleted once the serverless function instance finishes. For a permanent messaging system in production, I highly recommend integrating a cloud storage provider like **Cloudinary**, **AWS S3**, or **Uploadcare**.

### OUTCOME
Resolved the Vercel deployment crash by moving temporary file handling to the /tmp directory and adding robust error handling to the upload middleware.
