# Specification: Student Notice Board

## Problem Statement
Students need a centralized and intuitive "Notice Board" on their dashboard to stay informed about school-wide announcements and class-specific updates. Currently, the interface is basic and lacks categorization, search, and a clear distinction between different types of updates (e.g., Exams, Holidays, General).

## Goals
- Provide a rich, categorized view of notices on the student dashboard.
- Enable full-text search and category filtering for notices.
- Support file attachments (already in model, but need UI integration).
- Ensure pinned notices remain prominently at the top.

## User Stories
### US1: Dashboard Widget (P1)
As a student, I want to see a "Notice Board" widget on my main dashboard that highlights pinned notices and the 3 most recent updates with type-specific icons.

### US2: Full Notice Page (P1)
As a student, I want to click "View All" to navigate to a dedicated Notice Board page where I can search for notices and filter them by category (e.g., Academic, Administrative, Events).

### US3: Notice Details & Attachments (P2)
As a student, I want to click on a notice to see the full content and download any attached files.

### US4: Real-time Updates (P3)
As a student, I want to receive a real-time notification (toast) when a new notice relevant to me is posted.

## Functional Requirements
- **Filtering**: Notices must be filtered by the student's assigned class or the "all students" audience.
- **Categorization**: Extend the notice model to include categories (e.g., `Exam`, `Holiday`, `Event`, `Academic`).
- **Search**: Implement client-side or server-side full-text search on the Full Notice Page.
- **UI/UX**: Use a modern, responsive card-based layout with distinct styles for pinned items.

## Technical Constraints
- Must use existing `Notice` model but may require schema extension for categories.
- Backend filtering logic must remain performant.
- Frontend must adhere to existing Tailwind CSS / UI Components standards.
