# Specification: Daily Schedule for Curriculum Milestones

## Background
Currently, the Curriculum Studio allows teachers to organize curricula into "Sections" (Learning Paths) and "Modules" (Milestones). A common feedback is that "Milestones" often represent full weeks of study (e.g., Week 1, Week 2). Teachers need a way to break down these weekly milestones into specific daily schedules (e.g., Monday: Introduction, Wednesday: Lab Session).

## User Stories
- **As a Teacher**, I want to add specific daily schedules within a weekly milestone so I can plan day-by-day learning activities.
- **As a Teacher**, I want to assign specific dates to these daily schedules so they appear correctly on the student's calendar or roadmap.
- **As a Student**, I want to see the daily breakdown of each week in my roadmap so I know exactly what to study each day.

## Requirements

### Functional
- **Milestone Breakdown**: Each "Milestone" (Module) can now contain an optional list of "Day Schedules".
- **Day Attributes**:
    - `dayOfWeek`: (Monday - Sunday)
    - `date`: (Optional) Specific calendar date.
    - `topic`: Short headline for the day.
    - `description`: Detailed activities or instructions for the day.
- **UI Integration**:
    - The Teacher Curriculum Studio must allow adding, editing, and reordering day schedules within a module.
    - The Student Roadmap must expand to show the daily breakdown when a milestone is clicked or viewed.
- **Performance**: Must handle nested data efficiently in the JSON blob without hitting document size limits (highly unlikely for standard curricula).

### Technical
- **Data Model Update**:
    - Introduce `IDaySchedule` interface.
    - Update `ICurriculumModule` to include `daySchedules: IDaySchedule[]`.
- **UI Rewrite**:
    - Refactor `curriculum.html` (Teacher) to include a nested "Day Editor".
    - Refactor `curriculum.html` (Student) to display the daily list.
- **Persistence**: Ensure `scrapeCurriculum` logic captures the new nested "days" data.

## Acceptance Criteria
- [ ] Teacher can add a "Monday" schedule to "Week 1" milestone.
- [ ] Teacher can set a specific date for a day schedule.
- [ ] Data persists correctly to MongoDB upon deployment.
- [ ] Student Roadmap displays the "Monday" topic under "Week 1".
- [ ] npx tsc passes with the updated interfaces.
