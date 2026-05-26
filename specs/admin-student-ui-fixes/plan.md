# Implementation Plan: Admin Student UI Fixes

**Branch**: `admin-student-ui-fixes` | **Date**: 2026-05-26 | **Spec**: [specs/admin-student-ui-fixes/spec.md](spec.md)
**Input**: Feature specification from `/specs/admin-student-ui-fixes/spec.md`

## Summary
Refactor the Student Management UI to fix broken buttons and simplify the registration form.

## Technical Context
**Language/Version**: HTML/JavaScript (Tailwind CSS)
**Primary Dependencies**: Font Awesome, Custom UI Components
**Constraints**: Keep logic within `students.html`.

## Constitution Check

- [x] **Test-First**: I will manually verify each UI action as per `quickstart.md`.
- [x] **Simplicity**: Smallest viable change to HTML/JS.
- [x] **Library-First**: N/A for UI file update.

## Project Structure

### Source Code
```text
public/protected/admin/
└── students.html  # Main UI file to fix
```

## Complexity Tracking
*No major complexity violations.*

## Phase 0: Refine Registration Modal
- Remove `studentId` and `status` inputs from `addStudentModal`.
- Ensure `isEmailVerified` checkbox is correctly handled.

## Phase 1: Fix Modal & Action Logic
- Ensure `closeModal`, `openEditModal`, and `confirmDelete` are correctly assigned to `window`.
- Fix the modal close button by ensuring the `closeModal` function is reachable and correctly identifies the modal ID.
- Ensure `allStudents` is correctly populated before `openEditModal` is called.
