# Implementation Plan: Student Notice Board

## Technical Context
- The system already has a basic notice board.
- Backend filtering by audience and class is already implemented.
- We need to introduce categorization and improve the UI.

## Constitution Check
- **Minimal Diffs**: Refactor existing components rather than rewriting.
- **Security**: Ensure students cannot access notices intended for parents/teachers only.
- **Styling**: Maintain consistency with the blue-themed admin/student dashboards.

## Gate Evaluation
- [x] Schema extension planned.
- [x] UI mockups (conceptualized in user stories).
- [x] Search strategy defined.

## Phase 0: Foundations & Research
- [x] Research completed (see `research.md`).
- [ ] Update `Notice` model with `type` field in `schemas/models/notice.model.ts`.

## Phase 1: Backend Updates
- Update `controllers/admin.controller.ts` to support the new `type` field during creation/update.
- Update `controllers/student.controller.ts` to ensure the `type` field is returned in the API response.

## Phase 2: Frontend Refinement (Dashboard)
- Update the `updateNotices` function in `public/protected/student/index.html`.
- Map types to icons:
    - `academic` -> `fa-book`
    - `exam` -> `fa-file-pen`
    - `holiday` -> `fa-calendar-day`
    - `event` -> `fa-star`
    - `admin` -> `fa-bullhorn` (default)
- Update styling for pinned items.

## Phase 3: Full Notice Board Page
- Update `public/protected/student/notices.html`.
- Add a search input and category filter dropdown.
- Implement attachment rendering and download links.
- Use a robust card layout similar to the admin dashboard.

## Phase 4: Validation
- Perform validation according to `quickstart.md`.
- Verify real-time toast updates via Socket.IO.
