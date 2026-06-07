# Data Model: Daily Curriculum Schedules

## Entity: DaySchedule (Sub-document)
| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `dayOfWeek` | String | Day of the week | Enum: Mon-Sun |
| `date` | Date | Specific calendar date | Optional |
| `topic` | String | Subject for the day | Required |
| `description`| String | Detailed activities | Optional |

## Entity: CurriculumModule (Updated)
| Field | Type | Description |
|-------|------|-------------|
| ...previous | ... | (title, description, etc.) |
| `daySchedules`| Array<DaySchedule> | Nested daily breakdown |

## Entity: Course / Class (Implicit)
These entities will store the updated `CurriculumModule` within their `curriculumSections` or `classCurriculumSections` arrays.
