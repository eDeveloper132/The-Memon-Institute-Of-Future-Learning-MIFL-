# Quickstart: Admin Teacher Management

## Verification Steps

### 1. Registration Workflow
- Click "Add Teacher".
- Verify simplified form (no Staff ID or Status required).
- Submit and check if modal closes and teacher appears in list.

### 2. Management & Editing
- Click the edit icon on a teacher row.
- Verify modal opens with correct data (Name, Email, Dept, etc.).
- Update the **Designation** and save.
- Verify the change is reflected in the table.

### 3. Advanced Filtering
- Search for a specific name.
- Filter by "Inactive" status.
- Filter by "Verified Only".
- Verify the list updates correctly for each combination.

### 4. Security Check
- Open browser console (F12).
- Perform any UI action (Open modal, Click delete).
- Verify NO "CSP violation" or "blocked inline execution" warnings appear.
