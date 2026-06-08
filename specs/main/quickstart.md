# Quickstart: Testing Standalone Material Uploads

## Setup
1. Log in as a **Teacher**.
2. Navigate to the **Resource Hub** (`/protected/staff/index.html`).

## Test Case 1: Upload to a Class
1. On the Resource Hub, select the **Class** target option.
2. Select a specific class from the dynamic dropdown (e.g., "Class 10A").
3. Fill in a title ("Term 1 Guidelines") and select a PDF file.
4. Click **Upload Material**.
5. Verify a success toast appears and the item shows up in the "Recent Uploads" list.

## Test Case 2: Student Verification
1. Log out, then log in as a **Student** who belongs to the class selected in Test Case 1.
2. Navigate to the **Course Files** dashboard (`/protected/student/course-files.html`).
3. Verify that the "Term 1 Guidelines" PDF is visible in the list.
4. Click the download link and verify it opens the correct Sanity CDN URL.

## Verification Checklist
- [ ] Mongoose schema validation passes without throwing errors for missing `course` references when a `class` is provided.
- [ ] Sanity correctly hosts the PDF/DOCX file.
- [ ] Student dashboard correctly merges class-level and course-level materials.
