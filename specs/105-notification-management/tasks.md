---
description: "Actionable tasks for Notification Management & Role Changing"
---

# Tasks: Notification Management System

**Input**: Design documents from `/specs/105-notification-management/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, contracts/

## Format: `- [x] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `schemas/models/notification.model.ts` following data-model.md
- [x] T002 [P] Create `schemas/models/roleChangeLog.model.ts` following data-model.md
- [x] T003 [P] Create `services/notification.service.ts` boilerplate
- [x] T004 [P] Create `services/role.service.ts` boilerplate

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 Update `schemas/models/user.model.ts` to include `notificationPrefs` and `status` fields
- [x] T006 [P] Create `controllers/notification.controller.ts` boilerplate
- [x] T007 Create `routes/notification.routes.ts` and export the router
- [x] T008 Register `notification.routes.ts` in `index.ts` under `/api/notifications`

**Checkpoint**: Foundation ready - service and route structure established.

---

## Phase 3: User Story 1 - Centralized Notification Service (Priority: P1) 🎯 MVP

**Goal**: Implement the unified sending logic for all notification channels.

**Independent Test**: Call `NotificationService.send()` and verify entry in DB, message on Socket, and (mocked) email sent.

### Tests for User Story 1

- [x] T009 [P] [US1] Create unit tests for `NotificationService` in `tests/notification.service.test.ts`
- [x] T010 [P] [US1] Create mock for `mailService` in `tests/notification.service.test.ts`

### Implementation for User Story 1

- [x] T011 [US1] Implement `NotificationService.send` to save notification to MongoDB in `services/notification.service.ts`
- [x] T012 [US1] Implement Socket.io emission logic in `NotificationService.send` using `req.io` (or shared io instance) in `services/notification.service.ts`
- [x] T013 [US1] Implement Email logic in `NotificationService.send` by calling `mailService` in `services/notification.service.ts`
- [x] T014 [US1] Add channel filtering based on `User.notificationPrefs` in `NotificationService.send`

**Checkpoint**: Centralized sending is functional.

---

## Phase 4: User Story 2 - Notification API & Management (Priority: P1)

**Goal**: Provide endpoints for users to manage their notifications and preferences.

**Independent Test**: Use Swagger/Postman to fetch history, mark as read, and update preferences.

### Tests for User Story 2

- [x] T015 [P] [US2] Create integration tests for notification endpoints in `tests/notification.api.test.ts`

### Implementation for User Story 2

- [x] T016 [US2] Implement `getNotifications` (with filtering) in `controllers/notification.controller.ts`
- [x] T017 [US2] Implement `markAsRead` and `markAllAsRead` in `controllers/notification.controller.ts`
- [x] T018 [US2] Implement `getPreferences` and `updatePreferences` in `controllers/notification.controller.ts`
- [x] T019 [P] [US2] Define notification routes in `routes/notification.routes.ts`

**Checkpoint**: Users can now interact with their notifications via API.

---

## Phase 5: User Story 3 - Automated Role Changing (Priority: P2)

**Goal**: Automate role transitions with logging and notifications.

**Independent Test**: Approve an enrollment request and verify role change, log entry, and notification.

### Tests for User Story 3

- [x] T020 [P] [US3] Create unit tests for `RoleService` in `tests/role.service.test.ts`

### Implementation for User Story 3

- [x] T021 [US3] Implement `RoleService.transition` to update User role and save `RoleChangeLog` in `services/role.service.ts`
- [x] T022 [US3] Integrate `NotificationService.send` into `RoleService.transition` in `services/role.service.ts`
- [x] T023 [US3] Hook `RoleService.transition` into `processEnrollmentRequest` in `controllers/admin.controller.ts` for automated "Applicant -> Student" change

**Checkpoint**: Automated role changes are functional and audited.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Migration and cleanup.

- [x] T024 [US1] Migrate all `req.io.emit('notification', ...)` calls in `controllers/*.ts` to `NotificationService.send`
- [x] T025 [P] Update `public/components/ui-components.ts` to handle standardized notification payloads if necessary
- [x] T026 [P] Final validation of all scenarios in `quickstart.md`
- [x] T027 Code cleanup and linting in all modified files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 & 2**: Mandatory first.
- **Phase 3 (US1)**: Must complete before US2 and US3 rely on the service.
- **Phase 4 & 5**: Can run in parallel after Phase 3.
- **Phase 6**: Final cleanup.

### Parallel Opportunities

- T001-T004 can start together.
- T006, T009, T010, T015, T020 are all parallelizable as they are new files or tests.
- Once `NotificationService` (US1) is functional, US2 and US3 implementation can overlap.

---

## Implementation Strategy

### MVP First (US1 & US2)

1. Complete Setup and Foundational.
2. Implement `NotificationService` (US1).
3. Implement API (US2) to allow users to see notifications.
4. **VALIDATE**: Send a notification manually and see it in the user's history.

### Incremental Delivery

1. Add US3 (Role Changing) once the notification backbone is solid.
2. Gradually migrate legacy notification calls (Phase 6).
