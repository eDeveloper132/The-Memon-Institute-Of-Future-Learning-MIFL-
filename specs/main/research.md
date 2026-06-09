# Research: Restructure Exam Results View

## Removing Exam Creation from Results View

**Decision**: Remove all UI components related to Exam Creation from `results.html`.
**Rationale**: The user indicated that the "results" page should exclusively handle grading and distributing marks. Combining exam creation and grading into a single view violates the Single Responsibility Principle for the UI, cluttering the interface.
**Alternatives considered**: Keeping the Add Exam button but moving it to a dropdown menu. This was rejected because the user explicitly stated "Delete add exam functionalities from it".

## Confirming Grading Functionality

**Decision**: Retain the `window.manageMarks` modal and logic.
**Rationale**: The user requested to "Create exam results functionalities in it that teacher can distribute marks to his specified course or class students." The current `manageMarks` modal already queries `GET /api/teacher/exams/:id/students` (which supports both course-wide and class-specific filtering) and POSTs grades to `/api/teacher/grades`. Therefore, the feature is fully implemented and merely needs to be isolated.
