# Research: Admin Student UI Fixes

## Problem Analysis

### 1. Register Modal Refinement
- **Requirement**: Remove `studentId` and `status` from registration.
- **Reason**: Registration should be simple; these are management details.

### 2. Modal/Button Failures
- **Issue**: Close button, Edit modal, and Delete button reported as "not working".
- **Potential Causes**:
  - **Scope**: Functions like `closeModal`, `openEditModal`, and `confirmDelete` are inside a `type="module"` script. While `window.xxx` assignments *should* work, any error in the script (like a missing element reference) will halt execution, breaking all subsequent assignments.
  - **Duplicate IDs/Names**: Multiple elements might share IDs or names if not careful.
  - **Timing**: `fetchStudents` might be failing or `allStudents` might not be populated as expected.

## Best Practices
- **Form Reset**: Always reset forms when closing modals.
- **Error Boundaries**: Wrap UI logic in try/catch to prevent global script failure.
- **Explicit window assignment**: Continue using `window.functionName` for event handlers in HTML.

## Findings
- The `addForm.isEmailVerified` access might fail if the input isn't found or has a different name/type.
- The `searchInput` and `statusFilter` elements must exist for the filter logic to work.
- The `editStudentForm` and `addStudentForm` must be correctly referenced.
