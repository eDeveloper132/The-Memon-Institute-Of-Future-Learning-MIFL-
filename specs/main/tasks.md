# Tasks: Restructure Exam Results View

## Phase 1: Setup

- [ ] T001 Verify project compiles with `npx tsc` before starting changes.

## Phase 2: User Story 1 (Isolate Grading Functionality)

**Goal**: Remove exam creation features from the results view to focus strictly on grade distribution.

- [ ] T002 [US1] Remove the "Add Exam" button from the header actions in `public/protected/teacher/results.html`.
- [ ] T003 [US1] Remove the entire `<div id="addExamModal">` HTML block from `public/protected/teacher/results.html`.
- [ ] T004 [US1] Remove the JavaScript logic block associated with opening, closing, and submitting the Add Exam modal in `public/protected/teacher/results.html`.

## Phase 3: Polish & Cross-Cutting

- [ ] T005 Run final verification with `npx tsc` to ensure no TypeScript compilation errors were introduced.

## Dependencies

- Phase 2 depends on Phase 1.
- Phase 3 depends on Phase 2.

## Parallel Execution

No parallel execution is recommended as all changes are localized to a single file (`public/protected/teacher/results.html`).

## Implementation Strategy

The strategy focuses entirely on surgical UI cleanup. The backend models and controllers (`Exam`, `Grade`, `teacher.controller.ts`) already support the requested "distribute marks" functionality and do not require modification. The tasks focus on stripping out the newly added "Add Exam" code to revert the page to a strict results management view.
