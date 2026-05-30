# Quickstart: WhatsApp Chat UI

## Development Setup
1. Open `public/protected/messages.html`.
2. Ensure Tailwind CSS is loaded.
3. Review `ui-components.js` for existing navbar integration.

## Key CSS Classes to Add
- `.whatsapp-bg`: Background with pattern.
- `.bubble-in`: White background, rounded with left tail.
- `.bubble-out`: Light green (#dcf8c6) background, rounded with right tail.
- `.sidebar-item-active`: WhatsApp grey hover/active state.

## Mobile Responsive State
- Use a `currentView` variable in JS to toggle between 'list' and 'chat'.
- On resize, reset to 'list' if width < 768px.
