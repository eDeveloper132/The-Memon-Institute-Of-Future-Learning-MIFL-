# Quickstart: Admin Student CRUD Fixes

## Verification Steps

### 1. Password Hashing Fix
1. Update a student's password via `PATCH /api/admin/users/:id`.
2. Attempt to login with the student's email and NEW password.
3. Verify login succeeds.

### 2. Population Verification
1. Fetch student list via `GET /api/admin/users?role=student`.
2. Verify `currentClass` and `parent` fields contain objects (name/email) instead of just IDs.
