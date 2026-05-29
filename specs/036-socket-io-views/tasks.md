---
description: "Task list for Implement Socket.IO in Views"
---

# Tasks: Implement Socket.IO in Views

**Input**: Design documents from `/specs/036-socket-io-views/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify project structure and branch `036-socket-io-views`
- [x] T002 [P] Confirm `.env` has necessary Socket.IO configuration if any
- [x] T003 [P] Add Socket.IO CDN script to `public/protected/index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Implement centralized `initSocket` function in `public/components/ui-components.ts`
- [x] T005 [P] Add global `'notification'` event listener in `ui-components.ts` to show toasts
- [x] T006 [P] Implement custom event dispatching for `'receiveMessage'` in `ui-components.ts`
- [x] T007 Ensure `socket.ts` server-side setup correctly handles rooms based on `userId`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Real-time Notifications (Priority: P1) 🎯 MVP

**Goal**: Receive real-time notifications for new messages, notices, and status updates.

**Independent Test**: Trigger a notification from the server/admin panel and verify a toast appears in a parent/student view.

### Implementation for User Story 1

- [x] T008 [P] [US1] Update `controllers/admin.controller.ts` to emit `'notification'` on new notice creation
- [x] T009 [P] [US1] Update `controllers/admin.controller.ts` to emit `'notification'` on fee voucher generation
- [x] T010 [US1] Update `public/protected/parent/index.html` to call `window.initSocket(user)` and handle real-time updates
- [x] T011 [US1] Update `public/protected/student/index.html` to call `window.initSocket(user)` and handle real-time updates

**Checkpoint**: User Story 1 is functional. Notifications appear in real-time for students and parents.

---

## Phase 4: User Story 2 - Real-time Activity Updates (Priority: P1)

**Goal**: See real-time activity updates in the Admin dashboard.

**Independent Test**: Perform an action (like a student logging in or a message being sent) and see the update reflected in the Admin dashboard.

### Implementation for User Story 2

- [x] T012 [P] [US2] Update `controllers/auth.controller.ts` to emit activity events on login/logout
- [x] T013 [US2] Update `public/protected/admin/index.html` to listen for activity events and update the UI
- [x] T014 [US2] Integrate with existing Admin stats to show real-time count increments

**Checkpoint**: User Story 2 is functional. Admins see real-time updates.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T015 [P] Add connection/disconnection status indicator in the Navbar component in `ui-components.ts`
- [x] T016 Implement automatic reconnection logic with exponential backoff in `ui-components.ts`
- [x] T017 [P] Final CSP audit in `middlewares/security.ts` to ensure all Socket.IO connections are allowed
- [x] T018 Run `quickstart.md` validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3 & 4)**: Depend on Phase 2. Can proceed in parallel.
- **Polish (Phase 5)**: Depends on US1 and US2 completion.

### Parallel Opportunities

- T002 and T003 in Setup.
- T005 and T006 in Foundational.
- Phase 3 and Phase 4 can run in parallel once Phase 2 is complete.
- T015 and T017 in Polish phase.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational.
2. Complete User Story 1 (Real-time Notifications).
3. **VALIDATE**: Ensure toasts appear when notices are created.

### Incremental Delivery

1. Add User Story 2 (Admin Activity).
2. Add Polish (Reconnection logic, UI indicators).

---

## Notes

- All client-side logic should favor the CDN script to avoid Vercel 404s.
- Toasts should be consistent across all roles using the `showToast` utility.
