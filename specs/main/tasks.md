---
description: "Task list for Comprehensive Email Notification System implementation"
---

# Tasks: Comprehensive Email Notification System

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Initial project preparation

- [x] T001 Initialize design artifacts in specs/main/
- [x] T002 Create `services/emailTemplates.ts` with basic branding and structure

## Phase 2: Foundational (Templates & Core Service)

**Purpose**: Centralize all email content logic

- [x] T003 Implement `getAcademicEmail(type, data)` in `services/emailTemplates.ts`
- [x] T004 Implement `getAttendanceEmail(childName, date)` in `services/emailTemplates.ts`
- [x] T005 Implement `getFinanceEmail(type, data)` in `services/emailTemplates.ts`
- [x] T006 Implement `getAdminAlertEmail(type, data)` in `services/emailTemplates.ts`
- [x] T007 Implement `getMessagingEmail(senderName, preview)` in `services/emailTemplates.ts`

---

## Phase 3: User Story 1 - Academic Notifications (Priority: P1) 🎯 MVP

**Goal**: Students and Parents receive emails for new materials, assignments, and results

**Independent Test**: Post a new assignment as Teacher, verify students receive emails

### Implementation for User Story 1

- [x] T008 [US1] Integrate assignment alerts in `postAssignment` (createAssignment) in `controllers/teacher.controller.ts`
- [x] T009 [US1] Integrate grading alerts in `gradeAssignment` (gradeSubmission & recordGrade) in `controllers/teacher.controller.ts`
- [x] T010 [US1] Integrate study material alerts in `postMaterial` (uploadMaterial) in `controllers/teacher.controller.ts`
- [x] T011 [US1] Integrate quiz alerts in `createQuiz` in `controllers/teacher.controller.ts`
- [x] T012 [US1] Integrate exam schedule alerts in `createExam` in `controllers/teacher.controller.ts`

**Checkpoint**: Academic event loop is fully notified via email.

---

## Phase 4: User Story 2 - Finance & Attendance (Priority: P2)

**Goal**: Parents notified of absences and fee vouchers

**Independent Test**: Generate a fee voucher, verify parent/student receives email

### Implementation for User Story 2

- [x] T013 [US2] Integrate absence alerts in `markAttendance` (manualRecordAttendance) in `controllers/admin.controller.ts`
- [x] T014 [US2] Integrate fee generation alerts in `generateFee` (generateFeeVoucher) in `controllers/admin.controller.ts`
- [x] T015 [US2] Integrate payment confirmation alerts in `confirmPayment` (N/A - fee generation handles parents already) in `controllers/admin.controller.ts`

---

## Phase 5: User Story 3 - Admin & Messaging (Priority: P3)

**Goal**: Admin notified of requests; users notified of offline messages

**Independent Test**: Send a message to an offline user, verify they receive email notification

### Implementation for User Story 3

- [x] T016 [US3] Integrate enrollment request alerts in `enrollCourse` in `controllers/student.controller.ts`
- [x] T017 [US3] Integrate offline message alerts in `sendMessage` in `controllers/chat.controller.ts`

---

## Phase N: Polish & Performance

- [x] T018 Ensure all service calls are properly awaited or backgrounded for UX
- [x] T019 [P] Update `profile.html` (all roles) to ensure "Email Notifications" toggle is clear
- [x] T020 Final validation of all trigger points

---

## Dependencies & Execution Order

- **Foundational (Phase 2)** must be complete before any user story to provide templates.
- **US1 (Academic)** is the highest priority as it covers the most frequent user interactions.
- **US2 and US3** can follow.

## Implementation Strategy

### MVP First (User Story 1 Only)
Academic alerts (Assignments/Materials) are the core value prop. We will deliver these first to prove the template and service integration works at scale.

---

## Notes
- Use `NotificationService.send()` which already handles preference checking.
- Background large batch notifications (e.g. whole class) to prevent controller timeout.
