---
id: 056
title: Integrate Sanity for Chat Attachments
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: comprehensive-messaging
branch: main
user: moham
command: /sp.implement
labels: ["sanity", "upload", "serverless", "cloud-storage"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - package.json
  - .env.example
  - middlewares/upload.ts
  - controllers/chat.controller.ts
tests_yaml:
  - none
---

### PROMPT_TEXT
upload pdf files or any such files on sanity not save this in any directory

### RESPONSE_TEXT
I have successfully integrated **Sanity.io Assets** as the primary storage for chat attachments (PDFs, images, etc.), replacing the local directory storage. This solution is fully compatible with Vercel's read-only filesystem.

Key changes:
1.  **Dependencies**: Installed `@sanity/client` to handle API communication.
2.  **Middleware Update**: Refactored `middlewares/upload.ts` to use `memoryStorage`. Files are now held in temporary memory (buffer) rather than being written to the server's hard drive.
3.  **Controller Update**: Enhanced `controllers/chat.controller.ts` to initialize a Sanity client and modified `uploadAttachment` to stream the file buffer directly to Sanity's Asset API. The resulting permanent CDN URL is then stored in your MongoDB `Message` records.
4.  **Security**: Maintained file filters to ensure only safe MIME types (PDF, Images, DOC) are uploaded.

### ACTION REQUIRED
Please add the following to your `.env` file (replacing the values if they are different from what you provided):
```env
SANITY_PROJECT_ID=ieaejerj
SANITY_DATASET=mifl-dataset786
SANITY_API_TOKEN=skopjmM0luAXSjfI3AloYu1NhvJ082ZkOApxuIyFSgQvjbV39JD5wbivdYAXMqLiYogYFDH8qGNV95APMg6Gs84P6gNeM1Xh4yJCnK7EJpYz3YQDN1EtaQtU45GegX5XJqnB6ex2YNZ8vIAyVWb7yGx1nv53Pwjtq3q94wINC1wgoFFr6NfT
```

### OUTCOME
Chat attachments are now permanently stored in Sanity.io and served via their high-performance CDN, resolving all Vercel storage issues.
