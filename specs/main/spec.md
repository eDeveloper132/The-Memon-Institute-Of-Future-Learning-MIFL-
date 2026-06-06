# Feature Specification: Update Course Modals

## Background
The current "Register New Course" and "Edit Course" modals in the Admin Dashboard have some functional limitations. Specifically, the credit hours input only allows integer values, and the general UX for adding/editing courses could be improved.

## User Stories
- **As an Admin**, I want to be able to register new courses with decimal credit hours (e.g. 1.5, 3.5) so that the system accurately reflects the academic structure.
- **As an Admin**, I want a smooth and reliable experience when editing existing courses.

## Requirements

### Functional
- **Decimal Credits**: Update the `credits` input field in the course modal to accept decimal values.
- **Form Validation**: Ensure that all required fields are validated on the client side and server side.
- **Dynamic Updates**: Ensure that the course list updates immediately after a successful create or edit operation.
- **Consistent UI**: The modal should clearly indicate whether the user is adding a new course or editing an existing one (already partially implemented with header color changes).

### Technical
- **HTML/CSS**: Update `public/protected/admin/courses.html` to add `step="any"` or `step="0.1"` to the `credits` input.
- **JavaScript**:
    - Ensure `FormData` values are correctly handled.
    - Improve error handling for API calls in `courses.html`.
- **Backend**:
    - Verify that `controllers/admin.controller.ts` correctly handles decimal values for `credits`.
    - Ensure Mongoose schema casting doesn't lose precision.

## Acceptance Criteria
- [ ] Admin can enter `1.5` in the Credits field and save successfully.
- [ ] Course modal correctly populates all fields when editing.
- [ ] UI feedback (toasts) is provided for both success and failure states.
- [ ] No regressions in course deletion or other course management features.
