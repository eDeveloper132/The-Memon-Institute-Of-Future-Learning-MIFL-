# Quickstart: Student Enrollment Workflow

## Admin: Setting Fees

1. Navigate to **Class Management** (`/protected/admin/classes.html`).
2. Edit a class and enter an amount in the "Enrollment Fee" field.
3. Save changes.
4. Repeat for **Course Catalog** (`/protected/admin/courses.html`).

## Student: Applying for Enrollment

1. Log in as a student and navigate to the dashboard.
2. Under the "New Opportunities" section, find a class or course.
3. Click **Apply**.
4. Observe the "Pending" badge appearing on the card.
5. (Optional) Click **Cancel Application** and verify the "Apply" button returns.

## Admin: Processing Requests

1. Navigate to **Enrollment Requests** (`/protected/admin/enrollment-requests.html`).
2. See the list of students who applied.
3. Click **Approve** on a student's request.
4. Verify the student is now listed in the "Enrolled Students" view of the respective class/course.

## Verification

- **Constraint Check**: Enroll a student in a class. Log back in as that student and try to apply for a second class. The option should be disabled or blocked with an error message.
- **Multi-Course Check**: Enroll a student in two different courses. Both should succeed upon admin approval.
