# Feature Specification: Course Management UI Overhaul

## Overview
Transform `courses.html` to mirror the advanced UI and functional features of `classes.html`. This includes moving from a table view to a card-based grid view, and implementing a robust batch management system within each course.

## User Stories
- As an admin, I want to see courses in a responsive grid view for better visibility.
- As an admin, I want to manage students in a course by grouping them into batches (e.g., Morning/Evening batches).
- As an admin, I want to quickly assign unassigned students to specific course batches.
- As an admin, I want to view students enrolled in a course, organized by their batches.

## Requirements
- **Grid View**: Replace the `<table>` with an interactive card grid (`#courseGrid`).
- **Batch System**: Implement `ICourse` batches (matching the `IClass` batch schema).
- **Modals**:
    - **View Students Modal**: Show students grouped by batch.
    - **Manage Batches Modal**: Add/Delete batches and manage student assignments.
    - **Quick Assign Modal**: Speed up enrollment from a list of unassigned students.
- **REST Sync**: Ensure `currentCourse` (or equivalent) is synced on the `User` model if necessary (though courses are typically multiple per student, unlike classes).
- **Responsive Design**: Ensure full usability on mobile devices.

## Acceptance Criteria
- Courses are displayed as cards with Title, Code, Teacher, and Department.
- The "Batches" button on a course card opens the batch management interface.
- Students can be added/removed from course batches.
- The "View" button shows students organized by their respective batches.
- UI consistency with `classes.html` (icons, colors, animations).
