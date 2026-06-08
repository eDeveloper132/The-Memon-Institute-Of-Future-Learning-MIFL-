# Data Model: Activity Times

## Entity: ActivityTime (New)
| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `student` | ObjectId | Reference to User (Student) | Required |
| `teacher` | ObjectId | Reference to User (Teacher) | Required |
| `targetType`| String | Context of the activity | Enum: 'class', 'course' (Required) |
| `targetId` | ObjectId | Reference to Class or Course | Required |
| `activityName`| String | Name of the task/activity | Required, trimmed |
| `duration` | String | Formatted time string (HH:MM:SS)| Required |
| `durationMs`| Number | Raw milliseconds | Required, Min: 0 |

## Entity: User, Class, Course (Implicit)
No changes required. `ActivityTime` references these entities.
