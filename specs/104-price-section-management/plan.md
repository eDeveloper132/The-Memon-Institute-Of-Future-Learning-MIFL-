# Implementation Plan: Price Section Management (PKR)

## Technical Context
- Existing models `Course` and `Class` already have an `enrollmentFee` field.
- The UI currently shows the fee with a `$` sign and doesn't allow setting it during creation.
- Backend controllers are already set up to handle `enrollmentFee` in `req.body`.

## Constitution Check
- **Surgical Changes**: Only modify relevant UI files and update display logic.
- **PKR Format**: Ensure all displays use PKR (Rs.) instead of USD ($).
- **Creation Logic**: Add `enrollmentFee` to creation forms.

## Gate Evaluation
- [x] Models verified.
- [x] UI entry points identified.
- [x] Controller logic confirmed.

## Phase 1: Frontend Updates (Courses)
- Modify `public/protected/admin/courses.html`:
  - Add `enrollmentFee` input to `courseForm`.
  - Update `openModal` to handle `enrollmentFee`.
  - Update `renderCourses` to display fee in PKR.
  - Update `window.updateFee` prompt and display.

## Phase 2: Frontend Updates (Classes)
- Modify `public/protected/admin/classes.html`:
  - Add `enrollmentFee` input to `addClassForm`.
  - Update `renderClasses` to display fee in PKR.
  - Update `window.updateFee` prompt and display.

## Phase 3: Validation
- Verify course creation with price.
- Verify class creation with price.
- Verify fee update logic.
- Ensure PKR format is consistent.
