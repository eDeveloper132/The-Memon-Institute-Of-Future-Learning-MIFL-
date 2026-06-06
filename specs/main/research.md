# Research: Dynamic Notifications for Dashboards

## Decision: Unified Dashboard Feed
We will use the existing `Notification` model and `getNotifications` endpoint to populate dashboard feeds. Instead of creating a separate "Action Items" system, we will encourage the backend to generate `SYSTEM` or `FEE` type notifications when certain thresholds are met or events occur.

## Rationale
- **Consistency**: The navbar bell and the dashboard feed will stay in sync.
- **Real-time**: We can leverage existing Socket.IO listeners.
- **Simplicity**: No new models or complex aggregation logic for now.

## Findings

### 1. Notification Types to UI Mapping
We will map `INotification['type']` to Tailwind classes and icons:
- `SYSTEM`: `bg-blue-50 border-blue-400`, `fa-info-circle`
- `FEE`: `bg-yellow-50 border-yellow-400`, `fa-triangle-exclamation`
- `ENROLLMENT`: `bg-green-50 border-green-400`, `fa-user-plus`
- `ACADEMIC`: `bg-indigo-50 border-indigo-400`, `fa-book`
- `MESSAGE`: `bg-gray-50 border-gray-400`, `fa-comment`

### 2. API Role-Based System Alerts
The Admin needs to see notifications that might not be assigned to them as a "recipient" but are "System-wide".
- **Current state**: `getNotifications` only returns notifications where `recipient === userId`.
- **Proposed change**: For Admins, we should allow fetching notifications where `type === 'SYSTEM'` regardless of recipient, OR ensure system-wide alerts are sent to all Admin users.
- **Decision**: For now, we will ensure that system-wide alerts (like fee warnings) are created with Admin users as recipients.

### 3. Frontend Implementation Pattern
Each dashboard will have a dedicated `loadNotifications()` function that:
1. Fetches from `/api/notifications`.
2. Filters or formats the list for the dashboard view.
3. Listens for the `newNotification` CustomEvent (already dispatched by `ui-components.ts`'s socket listener).

## Alternatives Considered

### Option A: Derive from Stats
Instead of using the Notification system, we could add "alerts" to the `/api/admin/stats` response.
- **Rejected because**: It makes the stats endpoint bloated and misses the real-time push capability of the dedicated notification service.

### Option B: Separate "System Alerts" Collection
Create a `SystemAlert` model for things like "Server maintenance" or "Database backup failed".
- **Rejected because**: YAGNI. The `Notification` model with a `type: 'SYSTEM'` and a null or Admin-role recipient (or broadcast) covers this well enough for the current scale.
