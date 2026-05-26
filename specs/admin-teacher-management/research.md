# Research: Admin Teacher Management Improvements

## Problem Analysis

### 1. Parity with Student UI
- **Requirement**: The Teacher Management UI (`teachers.html`) lags behind the Student Directory in terms of features and security.
- **Goal**: Port all improvements (filtering, editing, CSP compliance) to ensure a consistent admin experience.

### 2. Technical Gaps
- **Scoping**: Like the students UI, the teachers UI likely relies on inline event handlers that violate CSP.
- **Editing**: The current edit logic for teachers might be missing or incomplete (e.g., password hashing was previously fixed in the backend but needs UI support).
- **Data Model**: Teachers have unique fields like `employeeId` (or `staffId`), `department`, and `designation` that must be handled in the Edit modal.

## Best Practices
- **Event Delegation**: Use a single listener on the parent container (table body) for all row actions.
- **CSP Compliance**: Avoid `onclick` and use `addEventListener` or data-attributes for dynamic elements.
- **Robustness**: Ensure `allTeachers` is populated before actions like `openEditModal` are triggered.

## Decisions
- **Unified Actions**: Use `data-action` and `data-id` for table buttons.
- **Global Handlers**: Attach modal controls to `window` for accessibility.
- **Backend Sync**: Ensure the list refreshes after every successful POST/PATCH/DELETE.
