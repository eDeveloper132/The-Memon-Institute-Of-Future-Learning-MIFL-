# Implementation Plan: Universal User Profile Management

**Branch**: `main` | **Date**: 2026-06-07 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Implement a global profile management system accessible via the top navbar. Users can upload avatars to Sanity CDN, and update their role-specific credentials.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Mongoose, Express, Tailwind CSS, Sanity Client
**Storage**: MongoDB (User collection) & Sanity.io (Images)
**Testing**: Manual visual testing, npx tsc
**Target Platform**: Web (All Protected Dashboards)
**Constraints**: Zero type errors (tsc gate). Strict CSP (no inline scripts).

## Constitution Check

- [x] I. Spec-Driven: Requirement coverage confirmed in `spec.md`.
- [x] II. Type Safety: Re-using `IUser` interface.
- [x] III. Verification Gate: `npx tsc` mandatory.
- [x] IV. Library-First: Logic encapsulated in `sanityService` and `auth.controller`.
- [x] V. Simplicity: Injecting a universal modal via Web Components rather than duplicating code across 15+ HTML files.
- [x] VI. Proactive: Avatar changes immediately propagate to the DOM.

## Project Structure

### Documentation

```text
specs/main/
├── plan.md              # This file
├── research.md          # Architecture decisions for the modal
├── data-model.md        # User entity context
└── tasks.md             # Actionable tasks
```

### Source Code

```text
controllers/
└── auth.controller.ts   # Add updateProfile logic

routes/
└── auth.routes.ts       # Register PATCH /profile and POST /profile/avatar

public/components/
└── ui-components.ts     # Update navbar to trigger modal, create profile modal logic
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| UI Component Injection | Needs to be accessible globally from the navbar. | Creating a separate `/profile.html` page was considered, but a modal provides a faster, more modern UX without losing context of the current dashboard. |