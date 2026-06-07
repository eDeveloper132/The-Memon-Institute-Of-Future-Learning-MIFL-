# Implementation Plan: Curriculum Studio Redesign

**Branch**: `main` | **Date**: 2026-06-06 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Transform the dense, card-based "Academic Studio" into a modern, sidebar-navigated "Curriculum IDE". This redesign focuses on navigation efficiency and data entry simplicity while maintaining full compatibility with the existing backend.

## Technical Context

**Language/Version**: TypeScript (Frontend components), HTML5, Tailwind CSS
**Primary Dependencies**: FontAwesome (Icons), UI-Components (Modular Navbar)
**Storage**: N/A (Existing MongoDB through REST API)
**Testing**: Manual visual testing, responsive audit
**Target Platform**: Web (Desktop focus)
**Project Type**: Web Application
**Performance Goals**: < 100ms UI update for large syllabi
**Constraints**: No external JS frameworks (Vanilla JS only), Strict CSP compliance.

## Constitution Check

- [x] I. Spec-Driven: Requirement coverage confirmed.
- [x] II. Type Safety: N/A (Frontend logic).
- [x] III. Verification Gate: `npx tsc` mandatory.
- [x] IV. Library-First: Logic remains in `ui-components.ts` and controller actions.
- [x] V. Simplicity: Smallest viable change to achieve high navigation speed.
- [x] VI. Proactive: Real-time feedback for unsaved changes.

## Project Structure

### Documentation

```text
specs/main/
├── plan.md              # This file
├── research.md          # Navigation patterns audit
└── tasks.md             # Actionable tasks
```

### Source Code

```text
public/protected/teacher/
└── curriculum.html      # Complete UI rewrite
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
