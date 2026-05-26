# Data Model: Teacher Attendance Customization

## Attendance Entity (Enhanced)
**Source**: `schemas/models/attendance.model.ts`

| Field | Type | Description |
|-------|------|-------------|
| `student` | ObjectId | Ref to User (Student OR Teacher) |
| `class` | ObjectId | Optional for teachers |
| `date` | Date | Calendar date of attendance |
| `checkIn` | Date | **NEW**: Precise arrival time |
| `checkOut`| Date | **NEW**: Precise departure time |
| `status` | Enum | present, absent, late, excused |
| `remarks` | String | Optional notes |
| `recordedBy`| ObjectId | Admin/Teacher who logged it |

## State Logic
- **Actual Time**: Set automatically if recorded in real-time.
- **Custom Time**: Provided by Admin via `datetime-local` UI inputs.
