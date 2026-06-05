---
description: "Actionable tasks for Frontend Notice Boards Integration"
---

# Tasks: Frontend Notice Boards

**Input**: Design documents from `/specs/106-frontend-notices-integration/`
**Prerequisites**: plan.md, spec.md, research.md

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)

## Phase 1: Setup & Foundational

**Purpose**: Update backend models and verify routing to support the new frontend logic.

- [x] T001 Update `schemas/models/notice.model.ts` to include `'admins'` in the `audience` enum
- [x] T002 Update `controllers/teacher.controller.ts` to add `createNotice` and `deleteNotice` endpoints
- [x] T003 Update `routes/teacher.routes.ts` to expose the new notice endpoints
- [x] T004 Update `controllers/admin.controller.ts` to ensure `getNotices` and `createNotice` handle 'teachers', 'parents', and 'all' audiences correctly.

**Checkpoint**: Backend is ready to support the new frontend role-specific capabilities.

---

## Phase 2: User Story 1 - Global Notification Dropdown (Priority: P1) 🎯 MVP

**Goal**: Add a real-time notification bell and dropdown to the main navigation bar.

**Independent Test**: Login as any user, click the bell icon, see unread notifications. Click one to mark it as read.

### Implementation for User Story 1

- [x] T005 [US1] Update `public/components/ui-components.ts` `UINavbar` template to include a Bell icon button with a notification badge.
- [x] T006 [US1] Update `public/components/ui-components.ts` `UINavbar` template to include a hidden dropdown container for notifications.
- [x] T007 [US1] Add logic in `UINavbar` to fetch `/api/notifications?status=unread` on load and populate the dropdown.
- [x] T008 [US1] Add click event listener to the bell icon to toggle the dropdown visibility.
- [x] T009 [US1] Add click event listeners to individual notification items in the dropdown to call `PATCH /api/notifications/:id/read` and remove them from the list.
- [x] T010 [US1] Update the socket `notification` event listener in `initSocket` to increment the badge count and prepend to the dropdown.

**Checkpoint**: Global notification bell is functional across all pages.

---

## Phase 3: User Story 2 - Admin Notice Board (Priority: P1)

**Goal**: Create a dedicated view for Admins to manage and send system-wide notices.

**Independent Test**: Login as Admin, navigate to Notices, create a notice targeting 'teachers'.

### Implementation for User Story 2

- [x] T011 [P] [US2] Create or update `public/protected/admin/notices.html` with Tailwind structure for displaying notices.
- [x] T012 [US2] Add a "Create Notice" modal/form in `public/protected/admin/notices.html` with Audience selection ('all', 'teachers', 'parents', 'students').
- [x] T013 [US2] Implement JS logic in `public/protected/admin/notices.html` to fetch and render notices from `/api/admin/notices`.
- [x] T014 [US2] Implement JS logic in `public/protected/admin/notices.html` to handle form submission to `POST /api/admin/notices`.
- [x] T015 [US2] Implement JS logic in `public/protected/admin/notices.html` to handle notice deletion.

**Checkpoint**: Admin Notice Board is fully functional.

---

## Phase 4: User Story 3 - Teacher Notice Board (Priority: P2)

**Goal**: Create a dedicated view for Teachers to send notices to their students or admins.

**Independent Test**: Login as Teacher, navigate to Notices, create a notice targeting a specific class.

### Implementation for User Story 3

- [x] T016 [P] [US3] Create or update `public/protected/teacher/notices.html` with Tailwind structure.
- [x] T017 [US3] Add a "Create Notice" modal/form in `public/protected/teacher/notices.html` with Audience selection ('admins', 'students').
- [x] T018 [US3] Add a Class selection dropdown to the form that populates dynamically based on the teacher's assigned classes.
- [x] T019 [US3] Implement JS logic to fetch and render notices from `/api/teacher/notices`.
- [x] T020 [US3] Implement JS logic to handle form submission to `POST /api/teacher/notices`.
- [x] T021 [US3] Implement JS logic to handle deletion of authored notices.

**Checkpoint**: Teacher Notice Board is fully functional.

---

## Phase 5: User Story 4 - Student Notice Board (Priority: P2)

**Goal**: Provide a read-only view for students to see notices relevant to them.

**Independent Test**: Login as Student, navigate to Notices, view a list of notices without create/delete options.

### Implementation for User Story 4

- [x] T022 [P] [US4] Update `public/protected/student/notices.html` to ensure it only has a read-only view structure.
- [x] T023 [US4] Implement JS logic to fetch and render notices from `/api/student/notices`.

**Checkpoint**: Student Notice Board is functional.

---

## Phase 6: User Story 5 - Parent Notice Board (Priority: P3)

**Goal**: Provide a read-only view for parents to see system notices.

**Independent Test**: Login as Parent, navigate to Notices, view a list of notices.

### Implementation for User Story 5

- [x] T024 [P] [US5] Create or update `public/protected/parent/notices.html` with a read-only view structure.
- [x] T025 [US5] Ensure backend `parent.controller.ts` and `parent.routes.ts` have a `getNotices` endpoint (if missing, add it).
- [x] T026 [US5] Implement JS logic to fetch and render notices from `/api/parent/notices`.

**Checkpoint**: Parent Notice Board is functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and linking.

- [x] T027 Ensure all `ui-components.ts` links point to the correct `notices.html` files for each role.
- [x] T028 Validate styling consistency across all 4 notice boards.

---

## Dependencies & Execution Order

- **Phase 1 (Backend)**: Must be completed first to support the UI.
- **Phase 2 (Global UI)**: Can be done immediately after Phase 1.
- **Phases 3-6 (Role UI)**: Can be done in parallel once Phase 1 is complete.
- **Phase 7 (Polish)**: Final step.

## Implementation Strategy

### MVP First (US1 & US2)
1. Complete Backend tweaks (Phase 1).
2. Implement Global Notification Dropdown (US1) so users can actually see notifications being sent.
3. Implement Admin Notice Board (US2) to have a way to generate notices.
4. **VALIDATE**: Admin sends a notice, it appears in the UINavbar dropdown.

### Incremental Delivery
1. Add Teacher Notice Board (US3) so teachers can communicate with classes.
2. Add Student Notice Board (US4) so students have a dedicated page to read history.
3. Add Parent Notice Board (US5).
