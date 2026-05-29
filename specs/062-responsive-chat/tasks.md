---
description: "Task list for Making messages.html responsive"
---

# Tasks: Responsive Chat Messaging

**Input**: Design documents from `/specs/062-responsive-chat/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `- [ ] [ID] [P?] [Story] Description`

---

## Phase 1: Foundational Layout Refactor

**Purpose**: Update the core HTML/CSS structure to support responsiveness.

- [ ] T001 Update main container classes for responsiveness in `public/protected/messages.html`
- [ ] T002 Refactor Sidebar classes to be full-width on mobile in `public/protected/messages.html`
- [ ] T003 Refactor Chat Window classes to be hidden on mobile by default in `public/protected/messages.html`
- [ ] T004 Adjust `h-[calc(100vh-120px)]` to be more robust for mobile viewports in `public/protected/messages.html`

---

## Phase 2: Mobile Navigation & View Switching

**Purpose**: Implement the logic to toggle between list and chat views on small screens.

- [ ] T005 [P] Add "Back to List" button to the chat header in `public/protected/messages.html`
- [ ] T006 Implement `toggleMobileView(view)` helper function in `public/protected/messages.html`
- [ ] T007 Update `selectChat()` to trigger `toggleMobileView('chat')` in `public/protected/messages.html`
- [ ] T008 Attach click listener to "Back" button to trigger `toggleMobileView('list')` in `public/protected/messages.html`

---

## Phase 3: UI/UX Mobile Optimization

**Purpose**: Refine the visual experience for touch devices.

- [ ] T009 [P] Reduce main section padding (`p-8` to `p-4 md:p-8`) in `public/protected/messages.html`
- [ ] T010 [P] Optimize "Create Group" button layout for small screens in `public/protected/messages.html`
- [ ] T011 Ensure modals (Create/Edit Group) have responsive widths in `public/protected/messages.html`
- [ ] T012 Adjust chat bubble spacing and avatar sizes for mobile in `public/protected/messages.html`

---

## Phase 4: Polish & Final Validation

**Purpose**: Final checks and cross-story consistency.

- [ ] T013 [P] Final audit of Tailwind classes to ensure no regressions in desktop view
- [ ] T014 Run `quickstart.md` validation scenarios on various simulated device sizes

---

## Dependencies & Execution Order

1. **Phase 1**: Must complete before view-switching logic.
2. **Phase 2**: Core functional requirement for mobile users.
3. **Phase 3**: Visual improvements.

---

## Implementation Strategy

### MVP First
- Complete Phase 1 and Phase 2. This gives a functional mobile chat experience where users can actually navigate.

### Final Polish
- Complete Phase 3 and Phase 4 for a professional finish.
