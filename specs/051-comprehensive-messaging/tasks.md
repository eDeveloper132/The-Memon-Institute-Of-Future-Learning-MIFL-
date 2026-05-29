---
description: "Task list for Comprehensive Messaging Enhancements"
---

# Tasks: Comprehensive Messaging Enhancements

**Input**: Design documents from `/specs/051-comprehensive-messaging/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/chat-extensions-api.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (File Upload Infrastructure)

**Purpose**: Project initialization and basic structure for new features

- [x] T001 Verify project structure and branch `051-comprehensive-messaging`
- [x] T002 Create `public/uploads/chat` directory to store attachments
- [x] T003 Update `.gitignore` to ignore the contents of `public/uploads/chat/`
- [x] T004 Install `multer` and `@types/multer` dependencies

---

## Phase 2: User Story 1 - Real-time Typing Indicators (Priority: P1)

**Goal**: Users see "typing..." when the active partner is typing.

**Independent Test**: Open two browsers. Type in one browser without sending. Verify the second browser shows a "User is typing..." indicator.

### Implementation for User Story 1

- [x] T005 [US1] Update `socket.ts` to listen for `typing` and `stopTyping` events and broadcast them as `userTyping` and `userStoppedTyping` to the appropriate receiver/group room
- [x] T006 [US1] Update `public/protected/messages.html` to emit `typing` (with debounce) and `stopTyping` on input keyup events
- [x] T007 [US1] Update `public/protected/messages.html` to listen for `userTyping`/`userStoppedTyping` and toggle a UI indicator above the chat input

**Checkpoint**: Typing indicators work in real-time.

---

## Phase 3: User Story 2 - Read Receipts & Unread Badges (Priority: P1)

**Goal**: Users can see if their messages are read, and the sidebar highlights unread conversations.

**Independent Test**: Send a message to an offline user. Log in as that user. Verify the sidebar shows an unread badge. Open the chat. Verify the original sender's UI updates to show "Read".

### Implementation for User Story 2

- [x] T008 [US2] Update `socket.ts` to handle `messagesRead` event (update MongoDB `isRead` or `readBy`) and broadcast `readReceipt`
- [x] T009 [US2] Implement `GET /api/chat/unread` in `controllers/chat.controller.ts` to return unread counts for DMs and groups
- [x] T010 [US2] Mount `GET /api/chat/unread` in `routes/chat.routes.ts`
- [x] T011 [US2] Update `public/protected/messages.html` to emit `messagesRead` when a chat is opened and has unread messages
- [x] T012 [US2] Update `public/protected/messages.html` to fetch unread counts on load and display badges in the `renderSidebar` function
- [x] T013 [US2] Update `public/protected/messages.html` to listen for `readReceipt` and update the message bubbles UI (e.g., double blue ticks)

**Checkpoint**: Unread badges and read receipts are fully functional.

---

## Phase 4: User Story 3 - File Attachments (Priority: P2)

**Goal**: Users can upload and send images or documents.

**Independent Test**: Click attachment icon, select an image, send. Verify the image appears in the chat for both users.

### Implementation for User Story 3

- [x] T014 [US3] Create `middlewares/upload.ts` to configure `multer` (storage path and file filter for images/documents)
- [x] T015 [US3] Implement `POST /api/chat/upload` in `controllers/chat.controller.ts` to return the file URL
- [x] T016 [US3] Mount `POST /api/chat/upload` in `routes/chat.routes.ts` using the multer middleware
- [x] T017 [US3] Update `socket.ts` `sendMessage` handler to accept and save the `attachments` array
- [x] T018 [US3] Update `public/protected/messages.html` to add a file input, upload logic, and attach URL to the `sendMessage` payload
- [x] T019 [US3] Update `public/protected/messages.html` message renderer to display images or link to documents

**Checkpoint**: File uploading and rendering works.

---

## Phase 5: User Story 4 - Group Editing & Admin Moderation (Priority: P2)

**Goal**: Admins can moderate chat by deleting messages, and creators/admins can edit groups.

**Independent Test**: Login as admin, delete a message, verify it disappears. Edit a group name, verify it updates.

### Implementation for User Story 4

- [x] T020 [US4] Implement `PATCH /api/chat/groups/:id` in `controllers/chat.controller.ts` (validate creator/admin)
- [x] T021 [US4] Implement `DELETE /api/chat/messages/:id` in `controllers/chat.controller.ts` (validate admin)
- [x] T022 [US4] Mount group edit and message delete endpoints in `routes/chat.routes.ts`
- [x] T023 [US4] Update `public/protected/messages.html` to add an "Edit Group" UI (reusing/modifying the create modal)
- [x] T024 [US4] Update `public/protected/messages.html` to add a delete button on message bubbles for admins, call the API, and remove the node

**Checkpoint**: Group management and message moderation work.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T025 [P] Ensure error handling is robust across new REST endpoints and UI components
- [x] T026 Run `quickstart.md` validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must run first.
- **User Stories (Phases 2-5)**: Can generally be executed in any order, as they touch different parts of the chat flow. Implementing sequentially (Phase 2 -> Phase 3 -> Phase 4 -> Phase 5) is recommended to prevent merge conflicts in `messages.html`.
- **Polish (Phase 6)**: Depends on all user stories.

### Parallel Opportunities

- Backend and Frontend tasks within a user story can theoretically be parallelized if done carefully, but sequential is safer for a single developer/agent.

---

## Implementation Strategy

### MVP First

1. Complete Setup.
2. Implement Typing Indicators (US1) - Very quick win.
3. Implement Read Receipts & Badges (US2) - High value.

### Incremental Delivery

1. Implement File Attachments (US3).
2. Implement Moderation tools (US4).
