# Tasks: Fix Student Curriculum Visibility

## Phase 1: Setup

- [x] T001 Verify project compiles with `npx tsc` before starting changes.

## Phase 2: User Story 1 (Enable Curriculum Visibility for Students)

**Goal**: Implement a secure backend endpoint to aggregate a student's curriculum data and update the frontend to consume it, resolving the 403 Forbidden errors.

- [x] T002 [US1] Implement `getMyRoadmaps` logic in `controllers/student.controller.ts` to fetch the student's enrolled courses and current class, populating their curriculum sections.
- [x] T003 [US1] Register `GET /api/student/roadmaps` mapping to `getMyRoadmaps` in `routes/student.routes.ts`.
- [x] T004 [US1] Refactor `loadData` in `public/protected/student/curriculum.html` to fetch data from `/api/student/roadmaps` instead of the admin endpoints, and map the response to the existing UI rendering logic.

## Phase 3: Polish & Cross-Cutting

- [x] T005 Run final verification with `npx tsc` to ensure no TypeScript compilation errors were introduced.

## Dependencies

- Phase 2 depends on Phase 1.
- Phase 3 depends on Phase 2.

## Parallel Execution

- T002 and T004 can theoretically be implemented in parallel, but sequential execution (Backend -> Frontend) is recommended to ensure the API contract is solid before modifying the client consumption.

## Implementation Strategy

1. **Backend First**: Implement the data aggregation logic in the student controller. This ensures the data is strictly limited to what the logged-in user (`req.user.id`) is permitted to see.
2. **Frontend Integration**: Update `curriculum.html` to point to the new endpoint, simplifying its internal logic (removing the need to client-side filter all courses) while keeping the visual rendering functions intact.
