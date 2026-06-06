# Research: Dual-Fee Implementation Details

## Decision: Direct UI Integration
We will add `monthlyFee` fields directly to the existing "Course" and "Class" modals and card rendering logic.

## Rationale
- **Consistency**: Users expect to manage all financial aspects of a course/class in one place.
- **Simplicity**: Adding one new field to existing forms is the smallest viable change.

## Findings

### 1. Schema Completeness
- `Course` model already has `monthlyFee` (added in a prior session).
- `Class` model currently lacks `monthlyFee`. This needs to be added to `class.model.ts` and `class.type.ts`.

### 2. Frontend Patterns
- Both `courses.html` and `classes.html` use `FormData` for submission.
- The `onsubmit` handlers in both files need to explicitly cast `monthlyFee` to `Number` to prevent type mismatches or unexpected behavior, matching the pattern used for `enrollmentFee`.

### 3. Display Logic
- Course cards currently show `enrollmentFee` with a label.
- Class cards also show `enrollmentFee`.
- **UI Update**: Both cards will now display a two-column fee section: "Enrollment" and "Monthly".

## Alternatives Considered

### Global Fee Service
- **Rejected because**: For only two fee types, direct model attributes are more maintainable and easier to index.
