# Research: Student Dashboard

## Findings

### 1. Existing Infrastructure
- **Frontend Stack**: Tailwind CSS (CDN), FontAwesome 6, Custom Web Components (`ui-navbar`, `ui-card`, `ui-spinner`).
- **Communication**: REST API for data fetching, Socket.IO for real-time notifications/chat.
- **Backend Controllers**: `student.controller.ts` provides endpoints for all academic and financial modules.

### 2. Current Dashboard State
- `/protected/index.html`: A multi-role entry point.
- `public/protected/student/index.html`: Primary student dashboard (to be implemented).

## Clarified Decisions

### 1. Behavior & Constraints
- **Assignment Submissions**: Multiple submissions are allowed, but each new submission **overwrites** the previous one. This simplifies grading and storage.
- **Quiz Attempts**: Strictly **one attempt** per quiz. This ensures academic integrity for assessments.
- **Notice Prioritization**: Dashboard notices are sorted by **Pinned (top)** and then **Newest (chronological)**. This ensures critical alerts stay visible.

### 2. Data Representation
- **Grading**: Both Assignments and Exams use **Numeric Scores (0-100)**. Letter grades (A, B, C...) are **derived** from these numeric scores for display.
- **Dashboard Freshness**: Data is fetched on **page load**. A **manual refresh** button will be provided to trigger updates without a full reload.

### 3. UI/UX Patterns
- **Manual Refresh**: Will update summary data (Attendance, Fees, Assignments) in under 1 second (SC-005).
- **Consistency**: All student views will use the standard `ui-navbar` and shared styles from `ui-components.js`.

## Decisions
- **Decision**: Specialize `public/protected/student/index.html` for a dedicated student experience.
- **Rationale**: Keeps the multi-role entry point simple and provides a focused workspace for students.
- **Decision**: Implement overwrite logic in `controllers/student.controller.ts` (if not already present).
- **Rationale**: Aligns with the clarified specification.
