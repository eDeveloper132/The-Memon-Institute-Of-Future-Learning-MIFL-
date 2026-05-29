# Quickstart: Parent Management

## Development Steps

### 1. Backend Implementation
- Add `linkParentToStudents` to `controllers/admin.controller.ts`.
- Mount `POST /api/admin/parents/link` in `routes/admin.routes.ts`.
- Ensure `getAllUsers` handles any necessary population for parents.

### 2. Frontend Components
- Add `Parent` to the `admin` links array in `public/components/ui-components.ts`.
- Add a Parent Management card to `public/protected/admin/index.html`.

### 3. Parent Management Page
- Create `public/protected/admin/parents.html`.
- Implement CRUD for parents using existing `User` API.
- Implement the "Link Students" modal and API call.

## Verification
1. Log in as Admin.
2. Navigate to "Parents" section.
3. Create a new parent.
4. Click "Link Students" and select 2 students.
5. Verify students' profiles show the linked parent.
6. Log in as the new parent (if password known) and verify they can see their children (uses existing parent controller).
