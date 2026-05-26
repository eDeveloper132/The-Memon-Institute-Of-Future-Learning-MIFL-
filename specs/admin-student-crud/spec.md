# Feature Spec: Admin Student CRUD Fixes

## Overview
The current generic user management in the admin panel is insufficient for students. This feature aims to fix password hashing during updates, add necessary field populations, and ensure student-specific data (parent links, classes) are handled correctly.

## Goals
- Fix password hashing issue when admin updates a student (use `.save()` instead of `findByIdAndUpdate`).
- Enhance `getAllUsers` (or provide dedicated student retrieval) to populate `currentClass` and `parent`.
- Add validation/handling for `studentId`.

## User Stories
1. **As an Admin**, I want to update a student's password and ensure they can still log in (hashing fixed).
2. **As an Admin**, I want to see which class a student belongs to in the list.
3. **As an Admin**, I want to link a student to their parent user account.

## Functional Requirements
- **Password Hashing:** Ensure `updateUser` triggers the `pre-save` hook for password hashing.
- **Population:** Populate `currentClass` (name) and `parent` (name, email) in user retrieval.
- **Student-Specific List:** Add an endpoint or query parameter to fetch only students with full details.

## Acceptance Criteria
- [ ] Updating user password via Admin API successfully hashes the password.
- [ ] Student list returns populated `currentClass` and `parent` information.
- [ ] Admin can assign/update `studentId` without duplicates.
