# Research: WhatsApp-style Chat UI

## Findings

### Current UI State
- Uses Tailwind CSS.
- Two-pane layout on desktop, hidden panels on mobile.
- Basic message bubbles without tails or WhatsApp colors.
- Functionality is complete (Socket.IO, file uploads, group chat).

### WhatsApp Design Patterns
- **Colors**:
    - App Bar / Header: #075e54 (Dark Green) or #ededed (Light Gray in Web).
    - Background: #e5ddd5 (with subtle pattern).
    - Sent Bubble: #dcf8c6.
    - Received Bubble: #ffffff.
- **Message Bubbles**:
    - Rounded corners with a small "tail" on the top outer corner.
    - Status icons (single tick, double tick, blue double tick).
    - Timestamps integrated inside the bubble (bottom right).
- **Sidebar**:
    - Avatars on the left.
    - Chat name, last message preview, and timestamp.
    - Unread count in a green circle.
- **Responsiveness**:
    - State-based navigation on mobile: "Chat List" view and "Conversation" view.
    - Smooth transitions between views.

## Decisions

### 1. CSS Framework
- **Decision**: Continue using **Tailwind CSS**.
- **Rationale**: The project already uses it extensively, and it's perfect for building custom UI patterns like WhatsApp bubbles.

### 2. Layout Strategy
- **Decision**: Use a **state-driven UI** for mobile responsiveness.
- **Rationale**: This allows for a clean transition between the chat list and the active conversation on small screens, mirroring the native WhatsApp experience.

### 3. Visual Assets
- **Decision**: Use **FontAwesome** (already integrated) and CSS-based patterns for the background.
- **Rationale**: Minimizes external dependencies and keeps the page light.

## Alternatives Considered
- **Using a UI Library (like Headless UI or DaisyUI)**: Rejected to maintain consistency with the existing Vanilla JS + Tailwind approach in the project.

## Unknowns & Clarifications
- None. The existing backend API already provides all necessary data (timestamps, sender/receiver info, status).
