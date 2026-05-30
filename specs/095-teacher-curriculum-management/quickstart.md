# Quickstart: Teacher Curriculum Management

## Development Steps

### 1. Backend Updates
- Update `ICourse` and `IClass` types in `schemas/types/`.
- Update `Course` and `Class` models in `schemas/models/`.
- Implement new controllers in `teacher.controller.ts` and `admin.controller.ts`.
- Mount routes in `teacher.routes.ts` and `admin.routes.ts`.

### 2. Frontend Refactor
- Modify `public/protected/teacher/curriculum.html` to add a tabbed interface.
- Implement the "Edit" form for curriculum modules.
- Ensure the "Save" button is disabled based on `isLocked` status.

### 3. Admin Panel Integration
- Add lock/unlock toggles in the relevant Admin Dashboard sections (Courses/Classes).

## Verification
1. Log in as Teacher.
2. Go to Curriculum.
3. Select a course and add 2 modules.
4. Save and verify in database.
5. Log in as Admin.
6. Lock that course's curriculum.
7. Return as Teacher and verify that editing is disabled.
