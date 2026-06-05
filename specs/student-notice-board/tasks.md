# Tasks: Student Notice Board

**Input**: Design documents from `/specs/student-notice-board/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested; manual validation via `quickstart.md` is prioritized.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Agent context update and environment preparation.

- [x] T001 Update agent context by running `.specify/scripts/powershell/update-agent-context.ps1 -AgentType gemini`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure updates (Schema extension).

- [x] T002 Update `Notice` model with `type` field in `schemas/models/notice.model.ts` (Enum: `academic, exam, holiday, event, admin`)

**Checkpoint**: Schema updated - user story implementation can now begin.

---

## Phase 3: User Story 1 - Dashboard Widget (Priority: P1) 🎯 MVP

**Goal**: Student can see recent and pinned notices with icons on the dashboard.

**Independent Test**: Create a pinned "Exam" notice as admin, verify it appears with a pin icon and "exam" styling on student dashboard.

### Implementation for User Story 1

- [x] T003 [P] [US1] Update `controllers/admin.controller.ts` to support the new `type` field in `crudNotices.create` and `crudNotices.update`
- [x] T004 [P] [US1] Update `controllers/student.controller.ts` `getMyNotices` to ensure `type` field is returned and `author` is populated with `name`
- [x] T005 [US1] Update `updateNotices` function in `public/protected/student/index.html` to map `type` to icons and apply pinned styling

**Checkpoint**: User Story 1 (Widget) should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Full Notice Page (Priority: P1)

**Goal**: Student can search and filter notices on a dedicated page.

**Independent Test**: Navigate to "View All", type a keyword in search bar, verify the list filters instantly.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update `public/protected/student/notices.html` UI with a search input and category filter dropdown (Academic, Exam, etc.)
- [x] T007 [US2] Implement client-side search and filter logic in `public/protected/student/notices.html` `renderNotices`

**Checkpoint**: User Story 2 (Search/Filter) should be fully functional.

---

## Phase 5: User Story 3 - Details & Attachments (Priority: P2)

**Goal**: Student can download files attached to notices.

**Independent Test**: Create a notice with a file URL, verify a download link appears and works on the student's notice card.

### Implementation for User Story 3

- [x] T008 [US3] Update notice card rendering in `public/protected/student/notices.html` to display attachment icons and download links

---

## Phase 6: User Story 4 - Real-time Updates (Priority: P3)

**Goal**: Receive instant toasts for new notices.

**Independent Test**: Create a notice as admin while a student is logged in, verify a toast notification appears for the student.

### Implementation for User Story 4

- [x] T009 [US4] Verify Socket.IO broadcast in `controllers/admin.controller.ts` `crudNotices.create` includes the `type` and correct payload for toasts

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and consistency.

- [ ] T010 Run full validation according to `specs/student-notice-board/quickstart.md`
- [ ] T011 Perform code cleanup and ensure consistent PKR/date formatting across modified files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3-6)**: All depend on Foundational (Phase 2).
- **Polish (Phase 7)**: Depends on all user stories.

### User Story Dependencies

- **US1 & US2**: Can proceed in parallel after foundational work.
- **US3**: Depends on US2 (UI is in the same page).
- **US4**: Independent of UI work.

### Parallel Opportunities

- T003 and T004 (Backend) can run in parallel.
- T006 and T008 (Frontend) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)
1. Complete Setup & Foundations.
2. Implement Dashboard Widget (US1).
3. Implement Full Page Search/Filter (US2).

### Incremental Delivery
1. US1 Widget → Test → Deliver.
2. US2 Full Page → Test → Deliver.
3. US3 Attachments → Test → Deliver.
4. US4 Real-time → Test → Deliver.
