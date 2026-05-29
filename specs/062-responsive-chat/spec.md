# Feature Specification: Responsive Chat Messaging

## Overview
Make the centralized chat system (`messages.html`) fully responsive and optimized for all screen sizes, specifically mobile devices.

## User Stories
- As a mobile user, I want to see my conversation list (sidebar) and then select a chat to view the messages in full-screen.
- As a mobile user, I want a "Back" button when inside a chat to return to my conversation list.
- As a mobile user, I want the chat input area to remain accessible and not be obscured by the keyboard.
- As a desktop user, I want to retain the side-by-side view (Sidebar + Chat Window).

## Requirements
- Use Tailwind CSS responsive classes (sm, md, lg, xl).
- Implement a mobile-first view-switching mechanism.
- Add a "Back to List" button in the chat header, visible only on small screens.
- Ensure modals (Create Group, Edit Group) are responsive and usable on touch devices.
- Optimize spacing and font sizes for mobile ergonomics.

## Acceptance Criteria
- On screens < 768px (mobile):
    - Initially, only the sidebar (chat list) is visible.
    - Selecting a chat hides the sidebar and shows the chat window.
    - Clicking the "Back" button in the chat header returns to the sidebar.
- On screens >= 768px (desktop):
    - Both sidebar and chat window are visible side-by-side.
    - The "Back" button is hidden.
- All chat functionalities (sending messages, attachments, deleting, editing groups) remain operational.
