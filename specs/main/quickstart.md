# Quickstart: Testing Daily Schedules

## Setup
1. Log in as a **Teacher**.
2. Navigate to the **Curriculum Studio** (`/protected/teacher/curriculum.html`).
3. Select an existing course or class.

## Test Case 1: Add Daily Schedule to a Module
1. Locate a "Milestone" (Module) card.
2. Click the "+ Add Day" button within the card.
3. Select "Monday" from the dropdown.
4. Enter a topic: "Intro to Linear Algebra".
5. Set a date: `2026-07-07`.
6. Click "Deploy Syllabus".
7. Verify that the page reloads and the day schedule is visible.

## Test Case 2: Student View Verification
1. Log in as a **Student** enrolled in that course.
2. Navigate to the **Course Roadmap** (`/protected/student/curriculum.html`).
3. Locate the Milestone updated in Test Case 1.
4. Verify that "Monday - Intro to Linear Algebra" is displayed under that milestone.

## Verification Checklist
- [ ] Nested JSON structure is valid in MongoDB.
- [ ] Date input correctly handles local timezones.
- [ ] Smooth scrolling to milestones still works in Teacher IDE.
