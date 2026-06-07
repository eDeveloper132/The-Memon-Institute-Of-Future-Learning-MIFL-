---
description: "Task list for Curriculum Studio Redesign implementation"
---

# Tasks: Curriculum Studio Redesign

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

- [x] T001 Initialize design artifacts in specs/main/
- [x] T002 Backup current `public/protected/teacher/curriculum.html` for safety

## Phase 2: Foundational (Infrastructure & Data Sync)

**Purpose**: Stabilize the data-flow patterns needed for the new UI

- [x] T003 Verify `workingState` JSON structure for curriculum synchronization in `public/protected/teacher/curriculum.html`
- [x] T004 [P] Update `scrapeCurriculum` function to handle the new DOM hierarchy in `public/protected/teacher/curriculum.html`

---

## Phase 3: User Story 1 - Sidebar Navigation (Priority: P1) 🎯 MVP

**Goal**: Implement the dual-pane IDE layout with real-time sidebar navigation

**Independent Test**: Load the page, see a sidebar with the "Table of Contents," and click an item to scroll to it.

### Implementation for User Story 1

- [x] T005 [US1] Refactor `curriculum.html` body to use a 2-pane flex/grid layout (Sidebar + Main Editor)
- [x] T006 [US1] Implement `renderSidebar()` to dynamically generate the navigation tree from the curriculum data
- [x] T007 [US1] Integrate `scrollIntoView` anchoring for smooth jumps between sidebar items and sections
- [x] T008 [US1] Add a collapsible toggle for the sidebar to support small screens/focus mode

**Checkpoint**: Navigation foundation is ready. User can browse the curriculum via the sidebar.

---

## Phase 4: User Story 2 - Focus Module Editor (Priority: P2)

**Goal**: Transform bulky module cards into a compact, row-based editing interface

**Independent Test**: Edit a module's title, duration, and pedagogical description using the new tight layout.

### Implementation for User Story 2

- [x] T009 [US2] Redesign `createModuleElement` for high-density editing (row-based inputs)
- [x] T010 [US2] Implement inline lists for "Learning Outcomes" and "Digital Resources" to reduce vertical height
- [x] T011 [US2] Add "Ghost" controls (hover effects) for reordering and deleting modules to reduce visual noise
- [x] T012 [US2] Ensure all input changes are synced back to the `workingState` object instantly

**Checkpoint**: The editor is now significantly easier to use for data entry.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T013 [P] Implement a real-time search filter for the sidebar navigation tree
- [x] T014 [P] Refine Tailwind transitions and animations for a "premium" software feel
- [x] T015 Run `npx tsc` to verify zero type errors (CONSTITUTIONAL GATE)
- [x] T016 Final validation of "Deploy Syllabus" functionality with the new UI state

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 & 2** are completed first to stabilize data handling.
- **US1 (Sidebar)** is the MVP and must be completed to enable efficient navigation.
- **US2 (Editor)** refines the data entry experience after navigation is established.

## Implementation Strategy

### MVP First (User Story 1 Only)
Navigation is the biggest pain point. We will deliver the sidebar and smooth-scrolling first, keeping the existing card structures inside the new layout.

---

## Notes
- Use `requestAnimationFrame` for DOM updates if rendering 50+ modules.
- Ensure strict CSP compliance by avoiding inline event handlers in generated HTML.
