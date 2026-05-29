# Data Model: Serverless Polling Optimizations

The existing data models (`User`, `Message`, `ChatGroup`, `Notice`) remain structurally the same. However, to support efficient polling on Vercel without overloading MongoDB, we must rely heavily on timestamp-based queries.

## Entities Involved

### `Message`
Must be queryable by `createdAt`.
- **Existing Index**: `{ group: 1, createdAt: -1 }` and `{ sender: 1, receiver: 1, createdAt: -1 }` are already optimized for this.

### `Notice` (for system notifications)
Must be queryable by `createdAt`.

## Polling Payload Structure

To minimize bandwidth and execution time, the sync endpoint will return multiple arrays of deltas:

```typescript
interface SyncDeltaResponse {
  newMessages: IMessage[];
  newNotices: INotice[];
  timestamp: string; // The server time to be used for the next 'since' query
}
```

## Security & Rate Limiting
Because polling generates many requests:
1. The `sync` endpoint should be excluded from the strict `generalLimiter` (which limits to 200 reqs/15 min). It needs its own relaxed limiter (e.g., `pollingLimiter`: 1000 reqs/15 min) or we bypass rate limiting for this specific internal heartbeat.
2. Queries must be strictly limited using `.limit(50)` to prevent massive payload sizes if a user goes offline and comes back.
