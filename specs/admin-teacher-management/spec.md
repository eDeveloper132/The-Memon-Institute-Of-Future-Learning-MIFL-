# Feature Spec: Admin Teacher Management Improvements

## Overview
Replicate the robust management functionalities from the Student Directory into the Teacher Directory. This includes simplified registration, full edit capabilities, advanced filtering, and CSP compliance.

## Goals
- Simplify the "Register New Teacher" process.
- Provide a full "Edit Profile" modal for teachers.
- Implement real-time search and dual-filtering (Status + Verification).
- Ensure script robustness and CSP compliance (no inline handlers).
- Improve the visual consistency of the teacher directory.

## Functional Requirements
- **Registration Refinement:**
  - Remove redundant fields (e.g., `employeeId`, `status`) from the initial registration modal.
- **Full Edit Support:**
  - Implement an "Edit Teacher Profile" modal that allows admins to update all teacher fields, including name, email, department, designation, and password.
- **Advanced Filtering:**
  - Real-time search by Name, Email, or Employee ID.
  - Filter by Account Status (Active, Inactive, Suspended).
  - Filter by Email Verification Status (Verified, Not Verified).
- **Security & Scoping:**
  - Refactor JavaScript to remove all inline `onclick` attributes.
  - Use event delegation for table actions and modal controls.
  - Explicitly attach module functions to the `window` object for global access.

## User Stories
1. **As an Admin**, I want a cleaner registration form to quickly add new teachers.
2. **As an Admin**, I want to update a teacher's designation or department easily.
3. **As an Admin**, I want to reset a teacher's password if they lose access.
4. **As an Admin**, I want to quickly see which teachers have verified their emails.

## Acceptance Criteria
- [ ] "Register New Teacher" modal is simplified.
- [ ] Edit icon opens a modal with pre-populated teacher data.
- [ ] Saving edits correctly updates the teacher record via `PATCH /api/admin/users/:id`.
- [ ] Search and Filter bars work in real-time.
- [ ] No "inline event handler" violations in the browser console.
- [ ] Status badges and verification indicators are clearly visible in the table.
