# Implementation Plan: Admin Teacher Management

**Branch**: `admin-teacher-management` | **Date**: 2026-05-26 | **Spec**: [specs/admin-teacher-management/spec.md](spec.md)
**Input**: Feature specification from `/specs/admin-teacher-management/spec.md`

## Summary
Replicate the Student Directory's robust UI logic into the Teacher Management panel (`teachers.html`). Port all filtering, editing, and security improvements.

## Technical Context
**Language/Version**: HTML/JavaScript (Tailwind CSS)
**Primary Dependencies**: Font Awesome, Custom UI Components
**Constraints**: Zero inline JavaScript handlers (CSP compliance).

## Constitution Check

- [x] **Test-First**: I will manually verify each UI action as per `quickstart.md`.
- [x] **Simplicity**: Porting established patterns from `students.html`.
- [x] **Library-First**: N/A for UI file refactoring.

## Project Structure

### Source Code
```text
public/protected/admin/
└── teachers.html  # Port logic and styles from students.html
```

## Complexity Tracking
- **Risk**: Missing teacher-specific data (Staff ID, Dept) in the ported logic.
- **Mitigation**: Carefully map `data-model.md` fields into the ported JavaScript.

## Phase 1: Port UI Layout & Filters
- Update `teachers.html` with the new filter bar (Search + Status + Verification).
- Add the dual-verification badges to the table rows.

## Phase 2: Refactor Event System (CSP Fix)
- Remove all `onclick` attributes.
- Implement centralized event delegation on the teacher table.
- Use `addEventListener` for static buttons and form submissions.

## Phase 3: Enhance Modals (Add/Edit)
- Simplify the Add Teacher modal.
- Implement the comprehensive Edit Profile modal with support for Designation and Department fields.
- Ensure form resets and backdrop-click-to-close behavior.
