---
description: "Task list for WhatsApp-style Chat UI implementation"
---

# Tasks: WhatsApp-style Chat UI

**Input**: Design documents from `/specs/079-whatsapp-chat-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Manual visual and responsive verification preferred. No automated tests requested in the spec.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: UI configuration and global styles

- [X] T001 Add WhatsApp-specific CSS variables and Tailwind utilities (e.g., colors, backgrounds) to the `<style>` block in `public/protected/messages.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI logic for state-based layout

- [X] T002 Implement the `toggleMobileView` helper function and state variable in the script section of `public/protected/messages.html`
- [X] T003 Refactor the main layout container (`main` and its direct children) to support state-driven visibility for mobile in `public/protected/messages.html`

**Checkpoint**: Basic state machine is ready for UI populating.

---

## Phase 3: User Story 1 - Attractive Interface (Priority: P1) 🎯 MVP

**Goal**: Familiar WhatsApp look for chat list and messages.

**Independent Test**: Open the page on desktop and verify chat list styling and message bubble colors/shapes match WhatsApp design.

### Implementation for User Story 1

- [X] T004 [US1] Restyle Sidebar items (avatars, name/role layout, last message preview, unread badges) in `public/protected/messages.html`
- [X] T005 [US1] Apply a subtle chat background pattern to the message area (`#messageArea`) in `public/protected/messages.html`
- [X] T006 [US1] Refactor message bubble templates in `renderMessages` and `appendMessage` to use WhatsApp colors and corner "tails" in `public/protected/messages.html`

**Checkpoint**: At this point, the UI should look like WhatsApp on desktop.

---

## Phase 4: User Story 2 - Full Responsiveness (Priority: P1)

**Goal**: Mobile state navigation (State Machine).

**Independent Test**: Open on mobile, select a chat, verify the list disappears and chat opens. Click back and verify list returns.

### Implementation for User Story 2

- [X] T007 [US2] Update `selectChat` function to trigger `toggleMobileView('chat')` in `public/protected/messages.html`
- [X] T008 [US2] Add and wire up the "Back" button in the active chat header for mobile view in `public/protected/messages.html`
- [X] T009 [US2] Ensure search bar and "Create Group" buttons transition correctly on small screens in `public/protected/messages.html`

**Checkpoint**: The application is now fully functional and easy to use on mobile devices.

---

## Phase 5: User Story 3 - Visual Polish (Priority: P2)

**Goal**: Smooth transitions and status indicators.

**Independent Test**: Send a message and verify the appearance of double-ticks. Observe smooth entry/exit of the typing indicator.

### Implementation for User Story 3

- [X] T010 [US3] Add status icon logic (double-ticks) to the `renderMessages` output in `public/protected/messages.html`
- [X] T011 [US3] Restyle the typing indicator into a subtle, non-intrusive WhatsApp-style bubble in `public/protected/messages.html`
- [X] T012 [US3] Add CSS transitions to the sidebar/chat panel for smoother view switching in `public/protected/messages.html`

**Checkpoint**: All user stories functional with high visual fidelity.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T013 Verify that existing features (file uploads, group editing) are visually consistent with the new UI in `public/protected/messages.html`
- [X] T014 Run validation scenarios from `quickstart.md` and `spec.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001. BLOCKS all User Stories.
- **User Stories (Phase 3-5)**:
  - US1 (Phase 3) and US2 (Phase 4) are P1 and should be prioritized. They can be worked on in parallel once Phase 2 is complete.
  - US3 (Phase 5) adds polish and should be done last.

### Parallel Opportunities

- T004, T005 can run in parallel within US1 phase.
- Once Foundational logic is done, styling (US1) and navigation wiring (US2) can technically proceed in parallel by different developers (if applicable).

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundational state logic.
2. Complete US1 (Look & Feel).
3. Complete US2 (Mobile navigation).
4. **STOP and VALIDATE**: Ensure basic chat works and looks right on all devices.

### Incremental Delivery

- Phase 3 delivers the "WhatsApp Look".
- Phase 4 delivers the "WhatsApp Feel" on mobile.
- Phase 5 delivers "Premium Polish".
