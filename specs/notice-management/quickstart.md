# Quickstart: Notice Management

## Development Setup
1. **Database**: Ensure the `Notice` model is compiled by starting the server.
2. **Environment**: No new environment variables required.

## Testing the Feature

### Admin: Create a Notice
```bash
curl -X POST http://localhost:2500/api/admin/notices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -d '{
    "title": "Test Notice",
    "content": "This is a test announcement",
    "audience": ["all"],
    "isPinned": true
  }'
```

### Student: View Notices
```bash
curl -X GET http://localhost:2500/api/student/notices \
  -H "Authorization: Bearer <STUDENT_TOKEN>"
```

### Real-time
Connect via Socket.IO and listen for the `notification` event.
```javascript
socket.on('notification', (data) => {
  if (data.type === 'NEW_NOTICE') {
    console.log('New notice received:', data.title);
  }
});
```
