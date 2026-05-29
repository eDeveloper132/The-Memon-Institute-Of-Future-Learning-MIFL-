# Research: Replicating Class Features in Courses

## Decision: Unify Batch Schema
**Rationale**: To maintain consistency and reduce code duplication, the `Course` model should use the same batch structure as the `Class` model. This allows us to reuse the same frontend logic for rendering and managing batches.
**Implementation**: We will add a `batches` field to the `Course` schema and update the `ICourse` type definition.

## Decision: Transition to Grid View
**Rationale**: `classes.html` uses a grid view which is more visually appealing and better for mobile responsiveness than a dense table. 
**Design**: Each course card will display:
- Credits and Department badges.
- Title and Code.
- Assigned Teacher.
- Buttons for View, Batches, and Delete.

## Decision: Centralized Batch Management API
**Rationale**: We already have `/api/admin/classbatches/:id`. We will create a mirror endpoint `/api/admin/coursebatches/:id` in the backend to handle course-specific batch updates.

## Decision: Student Enrollment Tracking
**Rationale**: Unlike classes (where a student is in exactly one class), a student can be in multiple courses. 
**Verification**: We will not use the `currentClass` field for courses. Instead, enrollment is tracked primarily within the `Course` model's `enrolledStudents` and `batches` arrays.
