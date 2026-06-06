# Specification: Unified Dual-Fee Management for Courses and Classes

## Background
The system currently tracks an `enrollmentFee` for both Courses and Classes. However, the business model also requires tracking a `monthlyFee`. Previous updates added `monthlyFee` to the Course model and the Information Center, but the Admin Dashboard (specifically `courses.html` and `classes.html`) still only allows managing `enrollmentFee`.

## User Stories
- **As an Admin**, I want to define both a one-time enrollment fee and a recurring monthly tuition fee when creating or editing a **Course**.
- **As an Admin**, I want to define both a one-time enrollment fee and a recurring monthly tuition fee when creating or editing a **Class**.
- **As an Admin**, I want to see both fee types clearly on the course and class management cards.

## Requirements

### Functional
- **Course Management**:
    - Add a "Monthly Fee" input field to the "Register/Edit Course" modal in `courses.html`.
    - Display both Enrollment and Monthly fees on the course cards in `courses.html`.
    - Ensure the `monthlyFee` is persisted to the database upon saving.
- **Class Management**:
    - Add a "Monthly Fee" input field to the "Create/Edit Class" modal in `classes.html`.
    - Display both Enrollment and Monthly fees on the class cards in `classes.html`.
    - Ensure the `monthlyFee` is persisted to the database upon saving.

### Technical
- **Schema & Types**:
    - Update `IClass` interface in `schemas/types/class.type.ts` to include `monthlyFee: number`.
    - Update `Class` model in `schemas/models/class.model.ts` to include `monthlyFee: { type: Number, default: 0 }`.
    - (Note: Course schema already has `monthlyFee`, but needs verification in tasks).
- **Frontend**:
    - Update `public/protected/admin/courses.html`:
        - Add `monthlyFee` input to the form.
        - Update `renderCourses` to show both fees.
        - Update `openModal` to populate `monthlyFee`.
        - Update `onsubmit` to cast `monthlyFee` to Number.
    - Update `public/protected/admin/classes.html`:
        - Add `monthlyFee` input to the form.
        - Update `renderClasses` to show both fees.
        - Update `openModal` to populate `monthlyFee`.
        - Update `onsubmit` to cast `monthlyFee` to Number.

## Acceptance Criteria
- [ ] Admin can set `monthlyFee` for a new course.
- [ ] Admin can edit `monthlyFee` for an existing course.
- [ ] Admin can set `monthlyFee` for a new class.
- [ ] Admin can edit `monthlyFee` for an existing class.
- [ ] Both fees are visible on the dashboard cards for both entities.
- [ ] Type safety is maintained across the project (`npx tsc` passes).
