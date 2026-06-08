# Specification: Student Activity Times in Stopwatch

## Background
The Teacher Dashboard includes a Stopwatch Utility (`/protected/teacher/stopwatch.html`). Currently, this is a basic timer. Teachers want to use this timer to measure student activities (e.g., reading speed, problem-solving time, physical activities) and save these times directly to student profiles within a specific Class or Course.

## User Stories
- **As a Teacher**, I want to select a specific Class or Course and then choose a student from that entity within the Stopwatch utility.
- **As a Teacher**, I want to save the current elapsed time on the stopwatch as an "Activity Record" for the selected student.
- **As a Teacher**, I want to specify an "Activity Name" (e.g., "Reading Assignment 1") when saving the time.
- **As a Teacher**, I want to view a list of saved activity times for my students on the same page.
- **As a Teacher**, I want to edit (e.g., update the activity name or adjust the time) or delete previously saved activity records.

## Requirements

### Functional
- **Target Selection**: The UI must allow toggling between "Class" and "Course", displaying a dropdown of the teacher's authorized entities, followed by a dropdown of students enrolled in that entity.
- **Save Flow**: While the timer is running or paused, the teacher can click "Save Activity", enter an Activity Name, and save the record to the database.
- **Records List**: Display a table or list of recently saved activity times, showing the student's name, activity name, duration, and target entity.
- **Edit/Delete**: Each record in the list should have Edit and Delete actions.

### Technical
- **Data Model**: Create a new `ActivityTime` Mongoose schema in `schemas/models/activityTime.model.ts`.
- **API Routes**: Create endpoints in `teacher.controller.ts` (e.g., `saveActivityTime`, `getActivityTimes`, `updateActivityTime`, `deleteActivityTime`).
- **UI Update**: Refactor `public/protected/teacher/stopwatch.html` to include the targeting dropdowns, activity name input, and the CRUD interface for the records.

## Acceptance Criteria
- [ ] Teacher can load authorized classes/courses and their respective students in the stopwatch UI.
- [ ] Teacher can save the stopwatch time to a selected student with an activity name.
- [ ] The saved record appears immediately in the "Recent Activities" list.
- [ ] Teacher can edit the activity name or time string of a saved record.
- [ ] Teacher can delete a saved record with a confirmation prompt.
- [ ] Application compiles with zero TypeScript errors.
