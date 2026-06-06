---
description: "Task list for Dynamic Notification Center implementation"
---

# Tasks: Dynamic Notification Center for Dashboards

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Initial prep (already partially completed by /sp.plan)

- [x] T001 Initialize design artifacts in specs/main/
- [x] T002 [P] Verify Socket.IO script presence in public/protected/index.html (already there)

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Ensure API endpoints and Socket logic are ready for dashboard integration

- [x] T003 [P] Verify GET /api/notifications behavior in controllers/notification.controller.ts
- [x] T004 Ensure NotificationService.broadcast triggers correct frontend event names in services/notification.service.ts

---

## Phase 3: User Story 1 - Admin Dynamic Feed (Priority: P1) 🎯 MVP

**Goal**: Replace hard-coded notifications in Admin Dashboard with real data

**Independent Test**: Login as Admin, create a notification, see it appear on the dashboard feed

### Implementation for User Story 1

- [x] T005 [US1] Remove static placeholder items from public/protected/admin/index.html
- [x] T006 [US1] Add a target container with ID 'systemNotificationsList' in public/protected/admin/index.html
- [x] T007 [US1] Implement fetchNotifications() function in script block of public/protected/admin/index.html
- [x] T008 [US1] Map notification types to Tailwind styles and FontAwesome icons (per research.md) in public/protected/admin/index.html
- [x] T009 [US1] Add newNotification event listener to update the feed in real-time in public/protected/admin/index.html

**Checkpoint**: Admin dashboard notifications should be fully dynamic and real-time.

---

## Phase 4: User Story 2 - Teacher Dynamic Feed (Priority: P2)

**Goal**: Add a notification feed to the Teacher Dashboard

**Independent Test**: Login as Teacher, receive a notification, verify it shows in the "Recent Notifications" section

### Implementation for User Story 2

- [x] T010 [US2] Add a "Recent Notifications" section container in public/protected/teacher/index.html
- [x] T011 [US2] Implement loadNotifications() logic in public/protected/teacher/index.html
- [x] T012 [US2] Integrate Socket.IO listener for dashboard-specific updates in public/protected/teacher/index.html

---

## Phase 5: User Story 3 - Student/Parent Feed Sync (Priority: P3)

**Goal**: Ensure Student/Parent portals also display dynamic alerts

**Independent Test**: Login as Student/Parent, verify the "Latest Notices" or alerts section uses the dynamic service

### Implementation for User Story 3

- [x] T013 [P] [US3] Review and update public/protected/student/index.html to use unified notification rendering
- [x] T014 [P] [US3] Review and update public/protected/parent/index.html to include a dynamic notification component

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T015 [P] Standardize "No notifications" empty state across all dashboards
- [x] T016 Add "Mark as Read" functionality directly from dashboard alert items
- [ ] T017 Final run of quickstart.md validation steps

---

## Dependencies & Execution Order

- **Phase 1 & 2** are completed first to stabilize the API/Socket foundation.
- **US1 (Admin)** is the MVP and should be completed and validated before US2/US3.
- **US2 and US3** can proceed in parallel once the rendering patterns from US1 are established.

## Implementation Strategy

### MVP First (User Story 1 Only)
The focus is on the Admin dashboard as it has the most prominent hard-coded technical debt. Once US1 is verified, the pattern will be copied to other dashboards.

---

## Notes
- Use `requestAnimationFrame` or `CustomEvent` listeners to avoid race conditions with the navbar component.
- Icons should follow the mapping: SYSTEM (info-circle), FEE (triangle-exclamation), ACADEMIC (book).
