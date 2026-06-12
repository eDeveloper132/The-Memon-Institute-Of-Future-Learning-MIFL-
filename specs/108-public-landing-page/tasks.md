---
description: "Task list for Public Landing Page implementation"
---

# Tasks: Public Landing Page

**Input**: Design documents from `/specs/108-public-landing-page/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Organization**: Tasks are grouped by phase, with implementation tasks mapped to user stories [US1, US2].

## Phase 1: Setup

- [x] T001 Create landing page file in public/landing.html
- [x] T002 Create landing page logic file in public/js/landing.js

---

## Phase 2: Foundational (Routing)

**Purpose**: Reconfigure application entry points per Principle VII (Data Protection)

- [x] T003 Update index.ts to move existing protected root (/) to (/home)
- [x] T004 Update index.ts to serve public/landing.html at the root (/)

---

## Phase 3: User Story 1 - Access Public Landing Page (Priority: P1)

**Goal**: Establish the base landing page accessible to all visitors.

**Independent Test**: Visit root URL (/) without being logged in and see the landing page.

- [x] T005 [P] [US1] Define HTML5 boilerplace and ui-public-navbar in public/landing.html
- [x] T006 [US1] Create Hero section with "Login/Signup" links in public/landing.html
- [x] T007 [US1] Implement basic responsive styles in public/landing.html (using Tailwind CDN)

---

## Phase 4: User Story 2 - Institute Information (Priority: P1)

**Goal**: Populate the landing page with institute details and featured programs.

**Independent Test**: Scroll through the landing page and see "About Us", "Courses", and "Contact" sections populated with data.

- [x] T008 [P] [US2] Add "About Us" and "Our Mission" static sections to public/landing.html
- [x] T009 [US2] Implement data fetching from /api/public/information-center in public/js/landing.js
- [x] T010 [US2] Render "Featured Courses" grid dynamically in public/landing.html using public/js/landing.js
- [x] T011 [US2] Render "Success Statistics" (counts from data) in public/landing.html using public/js/landing.js
- [x] T012 [P] [US2] Add Footer with "Contact" and "Location" (address, email, phone) to public/landing.html

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T013 Verify all links (Login, Signup, Course links) point to correct locations
- [x] T014 [P] Test mobile responsiveness of the new landing page
- [x] T015 Run npx tsc to verify zero type errors (CONSTITUTIONAL GATE)
- [x] T016 Verify Principle VII: Ensure no protected routes are accidentally exposed publicly

---

## Dependencies & Execution Order

1. **Setup (Phase 1)**: Can start immediately.
2. **Foundational (Phase 2)**: Depends on Setup. MUST complete before US1.
3. **User Stories (Phase 3 & 4)**: Depend on Foundational routing. Can proceed in parallel after T004.
4. **Polish (Phase 5)**: Final step after all stories are implemented.

## Implementation Strategy

- **MVP First**: T001-T007 provides a working public root with login links.
- **Incremental**: Add dynamic sections (Courses, Stats) in Phase 4.
- **Safety**: Phase 2 explicitly separates public and protected roots.
