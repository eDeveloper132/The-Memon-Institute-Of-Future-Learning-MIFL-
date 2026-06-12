---
description: "Task list for Landing Page Visual Enhancements"
---

# Tasks: Landing Page Enhancements

**Input**: Design documents from `/specs/109-landing-page-enhancements/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Organization**: Tasks are grouped by phase and user story to ensure a logical flow from infrastructure to visual polish.

## Phase 1: Setup

- [x] T001 Identify target sections for reveal animations in public/landing.html
- [x] T002 Define CSS classes for hidden/visible animation states in public/landing.html

---

## Phase 2: Foundational (Animation Engine)

**Purpose**: Establish the native Intersection Observer engine for performance

- [x] T003 Initialize Intersection Observer in public/js/landing.js
- [x] T004 Implement logic to toggle visibility classes based on viewport intersection in public/js/landing.js

---

## Phase 3: User Story 1 - Engaging Visual Experience (Animations)

**Goal**: Implement smooth animations and interactive transitions.

**Independent Test**: Scroll through the page and observe sections fading into view; hover over cards to see smooth scaling.

- [x] T005 [P] [US1] Apply reveal-on-scroll utility classes to Hero section in public/landing.html
- [x] T006 [P] [US1] Apply reveal-on-scroll utility classes to About Us section in public/landing.html
- [x] T007 [P] [US1] Apply reveal-on-scroll utility classes to Featured Programs section in public/landing.html
- [x] T008 [US1] Implement Tailwind hover transitions (scale/shadow) for program cards in public/landing.html
- [x] T009 [US1] Implement Tailwind hover transitions for Hero action buttons in public/landing.html

---

## Phase 4: User Story 2 - Professional Branding (Background & Icons)

**Goal**: Enhance depth with advanced backgrounds and consistent iconography.

**Independent Test**: Verify the Hero section has a layered background and all sections use high-quality, relevant icons.

- [x] T010 [US2] Enhance Hero section with layered CSS gradients and abstract SVG shapes in public/landing.html
- [x] T011 [US2] Update mission list with descriptive FontAwesome icons in public/landing.html
- [x] T012 [US2] Add decorative iconography to dynamic program card template in public/js/landing.js
- [x] T013 [P] [US2] Standardize icon styling (colors/sizes) across the landing page in public/landing.html

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T014 Implement CSS media query for prefers-reduced-motion in public/landing.html
- [x] T015 Perform visual audit to ensure no layout shifts (CLS) during animations
- [x] T016 Run npx tsc to verify zero type errors (CONSTITUTIONAL GATE)

---

## Dependencies & Execution Order

1. **Foundational Engine (Phase 2)**: Must be completed before reveal animations (US1) can function.
2. **User Stories (Phase 3 & 4)**: Can proceed in parallel once T004 is complete.
3. **Polish (Phase 5)**: Final verification step after all visual changes are merged.

## Implementation Strategy

- **Infrastructure First**: Build the lightweight Intersection Observer engine to handle all scroll-based reveals.
- **Visual Depth**: Prioritize the Hero background as it defines the project's first impression.
- **Accessibility**: Ensure animations respect system-level "reduced motion" settings.
