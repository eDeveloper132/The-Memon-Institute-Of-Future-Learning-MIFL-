---
description: "Task list for Vercel-Compatible Chat System"
---

# Tasks: Vercel-Compatible Chat System

**Input**: Design documents from `/specs/049-vercel-compatible-chat/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/chat-sync-api.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Backend Cleanup)

**Purpose**: Strip out the incompatible Socket.IO implementation

- [ ] T001 Verify project structure and branch `049-vercel-compatible-chat`
- [ ] T002 Delete `socket.ts`
- [ ] T003 Remove Socket.IO setup, middleware (`req.io`), and HTTP server wrapping from `index.ts`
- [ ] T004 Remove `socket.io` dependency using `npm uninstall socket.io`

---

## Phase 2: Foundational (The Polling API)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T005 Create `pollingLimiter` in `middlewares/rateLimiter.ts` specifically for the sync endpoint (relaxed limits)
- [ ] T006 Implement `syncData` endpoint in `controllers/chat.controller.ts` (returns new messages and notices based on `?since=TIMESTAMP`)
- [ ] T007 Mount `GET /api/chat/sync` in `routes/chat.routes.ts` and apply the `pollingLimiter`
- [ ] T008 Remove `req.io` emit logic from `sendMessage` in `controllers/chat.controller.ts`
- [ ] T009 [P] Remove `req.io` emit logic from `login` and `logout` in `controllers/auth.controller.ts`
- [ ] T010 [P] Remove `req.io` emit logic from `create` notice and voucher generation in `controllers/admin.controller.ts`

**Checkpoint**: Backend is fully free of Socket.IO and the new REST polling endpoint is active.

---

## Phase 3: User Story 1 - Real-Time Messages & Notifications via Polling (Priority: P1) 🎯 MVP

**Goal**: As a user, I want to send and receive direct/group messages and notifications near real-time without manual refresh.

**Independent Test**: Open two browsers. Send a message in one. Verify the other browser receives it within 5 seconds via network polling.

### Implementation for User Story 1

- [ ] T011 [US1] Refactor `public/components/ui-components.ts`: Remove `initSocket` and CDN injection, implement `startSyncEngine(user)` using `setInterval` and `fetch('/api/chat/sync')`
- [ ] T012 [US1] Update `startSyncEngine` in `ui-components.ts` to dispatch `newMessage` and `notification` CustomEvents when deltas are received
- [ ] T013 [US1] Update `public/protected/index.html` to call `startSyncEngine(user)` instead of `initSocket`
- [ ] T014 [US1] Update `public/protected/admin/index.html` to call `startSyncEngine(user)` instead of `initSocket`
- [ ] T015 [US1] Update `public/protected/teacher/index.html` to call `startSyncEngine(user)` instead of `initSocket`

**Checkpoint**: The background polling engine is running on all dashboards.

---

## Phase 4: User Story 2 - Unified Chat Interface Refactor (Priority: P1)

**Goal**: The main messaging view functions purely on REST and custom events without sockets.

**Independent Test**: Send a message in `messages.html` and verify the UI updates optimistically, and incoming messages from the sync engine are appended.

### Implementation for User Story 2

- [ ] T016 [US2] Update `public/protected/messages.html`: Remove socket listeners and setup event listeners for the `newMessage` CustomEvent dispatched by the sync engine
- [ ] T017 [US2] Update `public/protected/messages.html`: Refactor the `messageForm.onsubmit` to use standard `fetch('/api/chat/messages', { method: 'POST' })` and optimistically append the sent message to the UI

**Checkpoint**: The chat interface is fully functional using the new polling architecture.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T018 [P] Update connection status indicator in `ui-components.ts` to reflect polling health (e.g., green if last fetch succeeded, red if fetch failed)
- [ ] T019 [P] Implement adaptive polling rate in `ui-components.ts` (e.g., fast poll when `messages.html` is open, slow poll otherwise)
- [ ] T020 Run `quickstart.md` validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Run first to clean the slate.
- **Foundational (Phase 2)**: Depends on Phase 1 cleanup.
- **User Stories (Phase 3 & 4)**: Must follow sequentially (need the engine running before refactoring the chat UI).
- **Polish (Phase 5)**: Can be done anytime after Phase 3.

### Parallel Opportunities

- T009 and T010 can be done anytime during Phase 2.
- Phase 3 HTML updates (T013, T014, T015) can be done in parallel once T011 is complete.
- Polish tasks T018 and T019 can be done in parallel.

---

## Implementation Strategy

### MVP First

1. Complete Setup + Foundational (Backend).
2. Complete Phase 3 (Frontend Polling Engine).
3. Complete Phase 4 (Chat UI).
4. Verify chat works perfectly across two windows.
