# Quickstart: Multi-Fee Management

## Setup
1. Log in as an Admin.
2. Navigate to "Course Management" (`/protected/admin/courses.html`).
3. Navigate to "Class Management" (`/protected/admin/classes.html`).

## Testing Dual Fees (Courses)
1. Click "Add Course".
2. Enter values for both "Enrollment Fee" and "Monthly Fee".
3. Save and verify both values appear on the course card.
4. Edit the course, update both fees, and verify the card updates.

## Testing Dual Fees (Classes)
1. Click "Create Class".
2. Enter values for both "Enrollment Fee" and "Monthly Fee".
3. Save and verify both values appear on the class card.
4. Edit the class, update both fees, and verify the card updates.

## Verification
- [ ] Mongoose database shows correct numeric values for both fields.
- [ ] Card UI doesn't overflow or wrap awkwardly with the two fee displays.
- [ ] Toasts provide success feedback for both creation and updates.
