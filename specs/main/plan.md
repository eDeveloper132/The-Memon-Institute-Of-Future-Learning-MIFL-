# Implementation Plan: Restructure Exam Results View

**Branch**: `main` | **Date**: 2026-06-08 | **Spec**: N/A
**Input**: This route "http://localhost:2000/protected/teacher/results.html" is for exam results so Delete add exam functionalities from it and Create exam results functionalities in it that teacher can distribute marks to his specified course or class students.

## Summary

The `results.html` view is dedicated strictly to managing and distributing exam results (marks) rather than creating new exams. Therefore, the "Add Exam" functionality (button, modal, and related logic) will be removed from this page. The existing "Manage Marks" feature already correctly fulfills the requirement to distribute marks to specified course or class students and will be retained.

## Technical Context

**Language/Version**: TypeScript / Node.js
**Primary Dependencies**: Express, HTML, TailwindCSS
**Project Type**: Web application
**Scope**: Single page UI refactor.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Spec-Driven: Requirement coverage confirmed.
- [x] II. Type Safety: Schema/Types defined. No `any` without justification.
- [x] III. Verification Gate: `npx tsc` identified as mandatory pre-commit step.
- [x] IV. Library-First: Business logic encapsulated in services.
- [x] V. Simplicity: Smallest viable change identified.
- [x] VI. Proactive: Notification triggers identified.

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
```

## Phase 0: Outline & Research

- **Decision**: Remove "Add Exam" button from the header of `public/protected/teacher/results.html`.
- **Decision**: Remove the HTML markup for `<div id="addExamModal">`.
- **Decision**: Remove the JavaScript logic binding to the Add Exam form submission and modal toggling.
- **Rationale**: The user correctly pointed out that "results" management should be distinct from "exam" creation to maintain a clean separation of concerns in the UI.

## Phase 1: Design & Contracts

No changes to the data model or API contracts are required. The `GET /api/teacher/exams/:id/students` and `POST /api/teacher/grades` endpoints already perfectly serve the "distribute marks" requirement.

### Action Items
1. Edit `public/protected/teacher/results.html` to strip out the "Add Exam" modal and button.
2. Confirm the "Manage Marks" functionality remains fully operational.
