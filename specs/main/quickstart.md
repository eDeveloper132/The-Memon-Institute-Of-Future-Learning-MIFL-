# Quickstart: Testing Stopwatch Activity Times

## Setup
1. Log in as a **Teacher**.
2. Navigate to the **Stopwatch Utility** (`/protected/teacher/stopwatch.html`).

## Test Case 1: Save a Time
1. Start the stopwatch and let it run for a few seconds.
2. Select "Specific Class" and choose a class from the dropdown.
3. Select a student from the populated student dropdown.
4. Enter an activity name: "Reading Fluency Test".
5. Click **Save Activity**.
6. Verify a success toast appears and the new record is instantly added to the "Recent Activities" list below.

## Test Case 2: Edit a Record
1. In the "Recent Activities" list, click the **Edit** (pen) icon on the record created in Test Case 1.
2. An edit modal should appear.
3. Change the activity name to "Reading Fluency Test - Updated" and change the duration string manually.
4. Click **Save Changes**.
5. Verify the list updates with the new name and time.

## Test Case 3: Delete a Record
1. Click the **Delete** (trash) icon on the record.
2. Accept the confirmation prompt.
3. Verify the record is removed from the list.

## Verification Checklist
- [ ] UI dropdowns accurately reflect the teacher's authorized classes and the students within them.
- [ ] No inline `onclick` handlers are used in the generated HTML for the list (CSP compliance).
- [ ] MongoDB saves the `durationMs` and `duration` strings accurately.
