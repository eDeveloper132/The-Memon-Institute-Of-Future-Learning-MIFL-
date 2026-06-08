---
description: "Task list for Universal Profile Management implementation"
---

# Tasks: Universal Profile Management

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

- [x] T001 Initialize design artifacts in specs/main/
- [x] T002 [P] Backup current `controllers/auth.controller.ts` and `public/components/ui-components.ts` to `.bak`

## Phase 2: Foundational (Backend)

**Purpose**: Create the API routes for updating the profile and uploading avatars.

- [x] T003 [P] Implement `uploadAvatar` function (using `sanityService`) in `controllers/auth.controller.ts`
- [x] T004 [P] Implement `updateProfile` function (safely filtering read-only fields) in `controllers/auth.controller.ts`
- [x] T005 Register `POST /profile/avatar` (with `chatUpload.single('file')`) and `PATCH /profile` in `routes/auth.routes.ts`

---

## Phase 3: User Story 1 & 2 - Avatar Management (Priority: P1) 🎯 MVP

**Goal**: Allow users to click their name to open a modal, upload an avatar, and see the navbar update immediately.

**Independent Test**: Click name, upload JPG, wait for success toast, verify navbar image changes without refresh.

### Implementation for User Story 1 & 2

- [x] T006 [US1] Create `renderProfileModal(user)` generator function inside `UINavbar` in `public/components/ui-components.ts`
- [x] T007 [US1] Add click listener to the navbar user profile section to trigger `renderProfileModal` in `public/components/ui-components.ts`
- [x] T008 [US2] Implement avatar file input listener and Sanity upload logic (`POST /api/auth/profile/avatar`) in `public/components/ui-components.ts`
- [x] T009 [US2] Add DOM update logic to immediately replace `src` of the navbar image upon successful upload in `public/components/ui-components.ts`
- [x] T010 [US2] Add "Remove Picture" button and logic to set avatar to null in `public/components/ui-components.ts`

**Checkpoint**: The universal profile modal opens and handles full avatar lifecycle.

---

## Phase 4: User Story 3, 4, 5 - Role-Specific Details (Priority: P2)

**Goal**: Render and update text-based credentials dynamically based on the user's role.

**Independent Test**: Open modal, change Phone Number, save. As a teacher, edit Qualifications. Refresh page and verify changes persist.

### Implementation for User Story 3, 4, 5

- [x] T011 [US3] Add common credential inputs (Phone, Address, DOB, Gender, Blood Group) to the modal HTML in `public/components/ui-components.ts`
- [x] T012 [US4] Add conditional rendering logic for Teacher fields (Qualifications) to the modal in `public/components/ui-components.ts`
- [x] T013 [US5] Add conditional rendering logic for Student fields (Emergency Contact) to the modal in `public/components/ui-components.ts`
- [x] T014 [US3] Implement `handleProfileSave` to collect form data and send `PATCH /api/auth/profile` in `public/components/ui-components.ts`

**Checkpoint**: Users can update their personal and role-specific information.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T015 Ensure all modal buttons and interactions use secure event delegation (CSP compliance) in `public/components/ui-components.ts`
- [x] T016 Run `npx tsc` to verify zero type errors in `auth.controller.ts` (CONSTITUTIONAL GATE)
- [x] T017 Run quickstart.md validation to ensure end-to-end functionality.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2** is a hard blocker; the API routes must exist before UI work begins.
- **Phase 3 (Avatar)** must be completed before **Phase 4 (Details)** because Phase 3 sets up the actual modal container and injection logic.

## Implementation Strategy

### MVP First (User Stories 1 & 2)
The core visual value is the avatar management and modal injection. Once the modal can open and successfully handle an image upload to Sanity (US1/US2), the structural MVP is complete. Adding the text fields (US3-5) is iterative enhancement on top of the modal structure.
