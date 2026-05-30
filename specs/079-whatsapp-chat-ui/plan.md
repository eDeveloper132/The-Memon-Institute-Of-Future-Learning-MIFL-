# Implementation Plan: WhatsApp-style Chat UI

**Branch**: `079-whatsapp-chat-ui` | **Date**: 2026-05-30 | **Spec**: [specs/079-whatsapp-chat-ui/spec.md]
**Input**: Feature specification from `/specs/079-whatsapp-chat-ui/spec.md`

## Summary
Customize `public/protected/messages.html` to implement a WhatsApp-style UI. This involves a visual overhaul of the chat list, message bubbles, and overall layout, ensuring full responsiveness across all devices.

## Technical Context
- **Tech Stack**: HTML5, Tailwind CSS, Vanilla JavaScript.
- **Backend Integration**: Socket.IO for real-time messaging, Express REST API for history and uploads.
- **Constraints**: Must maintain existing functionality without backend changes.

## Constitution Check
- [x] Smallest viable diff (UI-only change).
- [x] No hardcoded secrets.
- [x] Testable (visual and responsive verification).

## Project Structure
- `public/protected/messages.html`: The main target for customization.
- `public/components/ui-components.js`: Referenced for navbar and global styling.

## Phases

### Phase 0: Research (Done)
- Researched WhatsApp design patterns (colors, bubble shapes, responsive transitions).
- Mapped existing data model to UI requirements.

### Phase 1: Design & Contracts (Done)
- Defined UI entities and state transitions for mobile.
- Confirmed API contracts.

### Phase 2: Implementation
- **Step 1**: Implement the WhatsApp-themed CSS (custom colors, backgrounds, bubble shapes).
- **Step 2**: Refactor the Sidebar layout (avatars, last message previews, timestamps).
- **Step 3**: Refactor the Chat Window (header, scroll area, message bubbles with tails, status icons).
- **Step 4**: Implement the mobile state machine (Toggle between List and Chat views).
- **Step 5**: Polish and responsive testing.

## Complexity Tracking
- **High**: Implementing the "tails" on message bubbles using pure CSS/Tailwind (might require SVG or pseudo-elements).
- **Medium**: State-based navigation for mobile to ensure a seamless "WhatsApp" feel.
