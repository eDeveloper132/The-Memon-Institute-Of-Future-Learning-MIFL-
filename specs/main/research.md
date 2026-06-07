# Research: Nested Daily Schedules in Curriculum

## Decision: Hierarchical JSON Schema
We will use an array of objects for `daySchedules` nested within the `curriculumModuleSchema`.

## Rationale
- **Temporal Context**: Daily schedules make sense only within the context of a "Week" (Milestone).
- **Flexibility**: Teachers can add 0, 1, or 7 days to a week depending on the course intensity.
- **Relational Integrity**: By nesting the data, we ensure that deleting a Milestone automatically removes its daily breakdown.

## Findings

### 1. Data Schema Detail
The `IDaySchedule` should be defined as:
```typescript
{
    dayOfWeek: string; // 'Monday'...'Sunday'
    date?: Date; // Optional specific calendar date
    topic: string; // Main subject for the day
    description?: string; // Activities/Notes
}
```

### 2. UI/UX: The "Expander" Pattern
- **Teacher View**: Each module row will have a "+ Add Day" action. Added days will appear as nested rows or a sub-table within the module.
- **Student View**: The Milestone cards will become collapsible. When expanded, they will list the daily schedule in a timeline format.

### 3. DOM Scraping (Capture Logic)
The `scrapeCurriculum` function in `curriculum.html` must be updated to traverse deep into the DOM:
- **Loop 1**: Sections.
- **Loop 2**: Modules (within sections).
- **Loop 3**: Day Schedules (within modules).

## Alternatives Considered

### Flat Day Schedule Collection
- **Rejected because**: Requires a complex "parentModuleId" reference system and would double the number of API calls needed to render a single roadmap.

### Fixed 7-Day Template for every Module
- **Rejected because**: Not every course has 7 days of activities per week. Some might only have 2 (e.g., Tues/Thurs). A dynamic array is more resource-efficient and less cluttered.
