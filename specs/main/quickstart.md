# Quickstart: Testing Course Modal Updates

## Setup
1. Log in as an Admin.
2. Navigate to the Courses management page.

## Test Case 1: Register Course with Decimal Credits
1. Click "Register New Course".
2. Enter course details.
3. In the "Credits" field, enter `2.5`.
4. Click "Save Course".
5. Verify that the new course appears in the list with `2.5 Credits`.

## Test Case 2: Edit Existing Course Credits
1. Click the "Edit" icon on an existing course.
2. Change the "Credits" value to `3.7`.
3. Click "Update Course".
4. Verify that the course card updates to show `3.7 Credits`.

## Test Case 3: Validation
1. Try to enter a non-numeric value or leave a required field empty.
2. Verify that the browser's built-in validation or the custom error handling prevents submission.
