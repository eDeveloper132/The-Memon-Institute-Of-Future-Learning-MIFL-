# Data Model: Enhanced Teacher Attendance

## Entities

### Attendance (Existing)
- `student`: Ref to User
- `class`: Ref to Class (optional)
- `course`: Ref to Course (optional)
- `date`: Date
- `status`: String ('present', 'absent', 'late', 'excused')
- `recordedBy`: Ref to User (Teacher)

## State Transitions

### Fetching Students (Mode: Class)
1. Query `Class` by `classId`.
2. Populate `students`.
3. Query `Attendance` where `class === classId` AND `date === selectedDate`.

### Fetching Students (Mode: Course Batch)
1. Query `Course` by `courseId`.
2. Find the batch in `course.batches` matching `batchId`.
3. Manually populate students in that batch from `User` model.
4. Query `Attendance` where `course === courseId` AND `date === selectedDate`.
   - *Note*: We query by `courseId` globally, as `batchId` is currently internal to the Course model and doesn't have a direct field in Attendance.
