# Data Model: UI State

This feature introduces purely ephemeral UI state management on the client side.

## UI States

| State | Mobile Behavior | Desktop Behavior |
|-------|-----------------|------------------|
| `LIST` | Sidebar Visible, Chat Hidden | Both Visible |
| `CHAT` | Sidebar Hidden, Chat Visible | Both Visible |

## Responsive Classes Strategy (Tailwind)

- **Main Container**: `p-4 md:p-8` (reduced padding on mobile)
- **Sidebar**: `w-full md:w-80`
- **Chat Window**: `w-full md:flex-1`
- **Header "Back" Button**: `md:hidden`
