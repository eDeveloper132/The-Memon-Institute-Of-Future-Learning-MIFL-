# Research: Notice Management

## Technical Unknowns

### 1. Attachment Handling
- **Decision**: For the initial implementation, `attachments` will be stored as an array of strings representing URLs (e.g., from an S3-compatible storage or public server).
- **Rationale**: The existing model already uses `[String]`. Handling multi-part file uploads is out of scope for the core CRUD logic and can be added later as a separate service integration.
- **Alternatives Considered**: 
  - Base64 encoding in DB (Rejected: increases DB size significantly).
  - GridFS (Rejected: overkill for simple document attachments).

### 2. Socket Event Naming & Payload
- **Decision**: Event name: `notification`. Payload: `{ type: 'NEW_NOTICE', title, content, id }`.
- **Rationale**: Aligns with existing patterns in `admin.controller.ts` where `req.io.emit('notification', ...)` is used for fee vouchers.
- **Alternatives Considered**: 
  - `newNotice` event (Rejected: inconsistent with existing general `notification` pattern).

### 3. Audience Filtering for Students
- **Decision**: Use `$or` query: `{ audience: 'all' }`, `{ audience: 'students' }`, or `{ targetClass: studentClassId }`.
- **Rationale**: Efficiently captures all notices a student should see using indexed fields.

## Best Practices
- **Indexing**: Ensure `audience`, `targetClass`, and `expiryDate` are indexed.
- **Expiry Logic**: Use `$or: [{ expiryDate: { $exists: false } }, { expiryDate: { $gte: new Date() } }]` to filter active notices.
