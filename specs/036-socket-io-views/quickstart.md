# Quickstart: Socket.IO in Views

## Implementation Steps

1. **Verify CDN Loading**: Ensure `https://cdn.socket.io/4.8.3/socket.io.min.js` is included in all protected view HTML files.
2. **Centralize Client Logic**: Update `public/components/ui-components.ts` to include a robust `initSocket(user)` function.
3. **Register Listeners**:
   - Add a global listener for `'notification'` to show a `showToast`.
   - Add a custom event dispatcher (e.g., `document.dispatchEvent`) for `'receiveMessage'` so specific pages (like chat) can listen to it.
4. **Trigger Init**: Ensure every dashboard page calls `window.initSocket(user)` after fetching the profile in its `<script type="module">` block.

## Testing
- Open two different browsers/tabs.
- Log in as an Admin in one and a Parent in the other.
- Create a Notice as Admin.
- Verify the Parent receives a real-time toast notification.
