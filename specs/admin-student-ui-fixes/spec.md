# Feature Spec: Admin Student UI Fixes

## Overview
Refine the Student Management interface in the admin panel to resolve modal visibility issues, simplify the registration process, and fix broken action buttons.

## Goals
- Simplify the "Register New Student" modal by removing unnecessary fields.
- Ensure all modals (Add/Edit) can be opened and closed correctly.
- Restore functionality to the "Delete" student action.

## Functional Requirements
- **Registration Modal Refinement:**
  - Remove `studentId` field (should be auto-handled or edited later).
  - Remove `status` field (defaults to 'active' on creation).
  - Ensure the "Close" button correctly hides the modal and resets the form.
- **Edit Modal Fix:**
  - Ensure `openEditModal` is triggered correctly from the table action and displays student data.
- **Delete Action Fix:**
  - Ensure `confirmDelete` is triggered correctly and performs the API call to remove the student.

## User Stories
1. **As an Admin**, I want a cleaner registration form so I can quickly add students without manually assigning IDs or statuses.
2. **As an Admin**, I want to be able to close the registration modal if I change my mind.
3. **As an Admin**, I want to edit student details when needed (modal must open).
4. **As an Admin**, I want to delete students who are no longer in the system.

## Acceptance Criteria
- [ ] "Register New Student" modal does NOT contain `studentId` or `status` inputs.
- [ ] Clicking the "X" or "Close" in the registration modal hides it.
- [ ] Clicking the "Edit" icon in the table opens the "Edit Student Profile" modal with correct data.
- [ ] Clicking the "Delete" icon in the table triggers a confirmation and removes the student upon approval.
