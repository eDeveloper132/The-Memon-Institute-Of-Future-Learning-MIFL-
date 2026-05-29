---
description: "Task list for Comprehensive Centralized Chat Messaging System"
---

# Tasks: Comprehensive Centralized Chat System

**Input**: Design documents from `/specs/039-comprehensive-chat/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/chat-api.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify project structure and branch `039-comprehensive-chat`
- [x] T002 Create `schemas/types/chatGroup.type.ts` for TypeScript interfaces
- [x] T003 Create `schemas/models/chatGroup.model.ts` based on data-model.md
- [x] T004 Update `schemas/models/message.model.ts` to include optional `group` reference and `readBy` array

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 Create `controllers/chat.controller.ts` with basic structure
- [x] T006 Create `routes/chat.routes.ts` and mount it in `index.ts` under `/api/chat`
- [x] T007 Update `socket.ts` to handle joining `group:{groupId}` rooms
- [x] T008 Update `socket.ts` `sendMessage` listener to handle `groupId` and emit to group rooms
- [x] T009 Create `public/protected/messages.html` as the unified frontend view (copying layout from parent/messages.html as a starting point)
- [x] T010 [P] Update navigation components in `public/components/ui-components.ts` to point all roles' "Messages" links to `/protected/messages.html`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Group Management (Priority: P1) 🎯 MVP

**Goal**: Teachers can create chat groups for selected students in their class batches. Admins can manage all groups.

**Independent Test**: Login as a teacher, create a group with students from an assigned class, and verify the group appears in the sidebar.

### Implementation for User Story 1

- [x] T011 [US1] Implement `createGroup` endpoint in `controllers/chat.controller.ts` (validate teacher's class access)
- [x] T012 [US1] Implement `getUserGroups` endpoint in `controllers/chat.controller.ts`
- [x] T013 [US1] Add frontend UI in `messages.html` to open a "Create Group" modal
- [x] T014 [US1] Implement frontend logic in `messages.html` to fetch and render the user's groups in the sidebar

**Checkpoint**: Teachers and Admins can create and view groups.

---

## Phase 4: User Story 2 - Role-Scoped Contacts (Priority: P1)

**Goal**: Users can see a list of allowed contacts for Direct Messaging based on complex role rules.

**Independent Test**: Login as a parent and verify the contact list only shows teachers of their children and admins.

### Implementation for User Story 2

- [x] T015 [US2] Implement `getAllowedContacts` endpoint in `controllers/chat.controller.ts` with scoping logic from data-model.md
- [x] T016 [US2] Update `messages.html` frontend to fetch and display the allowed contacts list (combining groups and DMs in the sidebar)

**Checkpoint**: Users only see contacts they are permitted to message.

---

## Phase 5: User Story 3 - Messaging & History (Priority: P1)

**Goal**: Users can view history and send messages in both groups and DMs.

**Independent Test**: Send a message in a group; verify other members receive it in real-time. Open a chat and verify historical messages load correctly.

### Implementation for User Story 3

- [x] T017 [US3] Implement `getChatHistory` endpoint in `controllers/chat.controller.ts` (handle both `partnerId` and `groupId` with permission checks)
- [x] T018 [US3] Implement `sendMessage` REST endpoint in `controllers/chat.controller.ts` (fallback)
- [x] T019 [US3] Update `messages.html` frontend to fetch and render chat history when a contact or group is selected
- [x] T020 [US3] Update frontend socket logic in `messages.html` to handle sending/receiving group messages

**Checkpoint**: Full chat functionality (historical + real-time) is working for both DMs and groups.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T021 [P] Implement unread message indicators (frontend UI + basic state tracking)
- [x] T022 [P] Clean up deprecated route references (e.g., removing `getAdminChatHistory`, `getAdminConversations` from `admin.controller.ts` if fully replaced by unified chat)
- [x] T023 Run `quickstart.md` validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3, 4, 5)**: Must follow sequentially for easiest integration, though T015 could theoretically parallelize with T011.
- **Polish (Phase 6)**: Depends on all user stories.

### Parallel Opportunities

- T010 can be done anytime after T009.
- Polish tasks T021 and T022 can run in parallel.

---

## Implementation Strategy

### MVP First

1. Complete Setup + Foundational.
2. Build the unified `messages.html` UI.
3. Implement `getAllowedContacts` (US2) to get the sidebar working.
4. Implement `getChatHistory` and real-time socket events (US3).
5. Add Group creation last (US1).
