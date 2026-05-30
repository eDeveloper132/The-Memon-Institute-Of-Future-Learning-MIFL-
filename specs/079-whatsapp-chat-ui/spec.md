# Feature Specification: WhatsApp-style Chat UI

**Feature Branch**: `079-whatsapp-chat-ui`  
**Created**: 2026-05-30  
**Status**: Draft  
**Input**: "customize messages.html and make it more attractive, beautifull and whatsapp design typed. Make responsive it for any devices."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Attractive Interface (Priority: P1)
As a user, I want the chat interface to look like WhatsApp so that it feels familiar and intuitive.

**Acceptance Scenarios**:
1. **Given** I am on the messages page, **When** I view the chat list, **Then** I see avatars, last message previews, and timestamps in a clean layout.
2. **Given** I am in a conversation, **When** I see message bubbles, **Then** they have distinct colors (green for sent, white for received) and tailored shapes with "tails".

---

### User Story 2 - Full Responsiveness (Priority: P1)
As a mobile user, I want the chat to work perfectly on my phone without horizontal scrolling.

**Acceptance Scenarios**:
1. **Given** I am on a mobile device, **When** I open the messages page, **Then** I see the chat list full screen.
2. **Given** I select a chat on mobile, **When** the conversation opens, **Then** the chat list is hidden and the conversation takes the full screen with a back button.

---

### User Story 3 - Visual Polish (Priority: P2)
As a user, I want the chat to have high-quality icons, smooth transitions, and a pleasant color palette.

**Acceptance Scenarios**:
1. **Given** I hover over chat items or buttons, **When** I interact with them, **Then** I see subtle animations and color changes.
2. **Given** I am chatting, **When** I see the "typing" indicator, **Then** it is visually integrated and subtle.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Implement a dual-pane layout for desktop (sidebar + chat window).
- **FR-002**: Implement a single-pane state machine for mobile (Chat List <-> Active Chat).
- **FR-003**: Apply WhatsApp-specific styling:
    - Chat background with subtle pattern/texture.
    - Tailored message bubbles with specific colors (#dcf8c6 for outgoing, #ffffff for incoming).
    - Status icons (double ticks, read receipts).
- **FR-004**: Ensure all existing features (file upload, group creation, search) are preserved and restyled.

### Success Criteria *(mandatory)*
- **SC-001**: Page is fully responsive from 320px to 1920px width.
- **SC-002**: UI resembles WhatsApp Web/Mobile design language.
- **SC-003**: Performance remains high (<100ms for UI transitions).
