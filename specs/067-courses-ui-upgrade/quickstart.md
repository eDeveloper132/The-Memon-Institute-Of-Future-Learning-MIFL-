# Quickstart: Course UI Upgrade Implementation

## Implementation Steps

### Phase 0: Schema & Backend
1.  **Update `course.type.ts`**: Add `batches` interface.
2.  **Update `course.model.ts`**: Add `batches` field with `batchSchema`.
3.  **Implement `updateCourseBatches` controller** in `admin.controller.ts`.
4.  **Mount `PATCH /api/admin/coursebatches/:id`** in `admin.routes.ts`.
5.  **Update `crudCourses.getAll`** to populate `batches.students`.

### Phase 1: Frontend Grid & UI
1.  **Refactor `courses.html`**:
    - Add `#courseGrid` and remove the table.
    - Implement `renderCourses()` to generate card-based UI.
2.  **Add Modals**:
    - View Students Modal (mirrored from `classes.html`).
    - Manage Batches Modal (mirrored from `classes.html`).
    - Quick Assign Modal (mirrored from `classes.html`).
3.  **Wired Logic**:
    - Port `manageBatches`, `refreshBatchView`, `renderBatches`, `saveBatches`, and `viewStudents` functions.
    - Update logic to handle unassigned students specifically for the active course context.

## Testing
1.  **Admin Login**: Verify access to `courses.html`.
2.  **Create Batch**: Select a course -> Manage Batches -> Add "Advanced" -> Verify UI update.
3.  **Enroll Student**: Select unassigned student -> Quick Assign to "Advanced" -> Verify student appears in "View".
4.  **Delete Course**: Verify course removal works and doesn't orphan data.
