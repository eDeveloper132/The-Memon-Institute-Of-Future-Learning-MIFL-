# Research: Student Notice Board

## Decision: Schema Extension
We will add a `type` field to the `Notice` model to support categorization.
- **Values**: `academic`, `exam`, `holiday`, `event`, `admin`
- **Default**: `admin`
- **Rationale**: Categorization allows for better UI representation (icons/colors) and filtering.

## Decision: Search Strategy
Since the number of active notices for a student is typically low (< 50), we will implement **Client-side Search** on the full notice page for instant feedback.
- **Logic**: Filter the local `allNotices` array based on title and content matches.

## Decision: Attachment Handling
Notices can already contain `attachments` (array of strings/URLs). We will:
- Display an "Attachment" section in the notice card.
- Provide download links for each file.

## Findings: Existing API
The current `GET /api/student/notices` in `controllers/student.controller.ts` already performs filtering by `audience` and `targetClass`. We will update it to also include the new `type` field and handle populated author data if needed.

## Alternatives Considered
- **Server-side Search**: Rejected for now to minimize API calls during fast typing.
- **Read-status tracking**: Considered but deferred to P2 to maintain MVP focus.
