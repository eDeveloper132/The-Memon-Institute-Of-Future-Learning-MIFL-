# Research: Enhanced Teacher Attendance

## Findings

### Current Data Model
- **Attendance Model**: Already contains both `class` and `course` fields (ObjectIds).
- **Course Model**: Contains `batches`, where each batch has a `name` and a `students` array of ObjectIds.
- **Class Model**: Contains a `students` array of ObjectIds.

### API Capabilities
- **Current Attendance Fetching**: `GET /api/teacher/attendance` only handles `classId`.
- **Current Marking**: `POST /api/teacher/attendance` only handles `classId`.
- **Missing**: There is no dedicated `GET /api/teacher/courses` endpoint that returns courses with their embedded batches.

### UI State
- `attendance.html` is using simple vanilla JS with `fetchProfile` to initialize.
- It has a single selection row.

## Decisions

### 1. Unified Attendance API
- **Decision**: Update `getAttendanceData` to check for `batchId` and `courseId` query parameters.
- **Rationale**: Keeps the endpoint focused on fetching student lists and existing records regardless of the source entity.

### 2. UI Pattern
- **Decision**: Use a "Radio Toggle" or a "Tab" style selector at the top of the selection area to switch between "Standard Class" and "Course Batch".
- **Rationale**: Provides clear visual separation of intent and prevents overloading a single dropdown.

### 3. Data Synchronization
- **Decision**: When fetching by batch, the backend will populate students from the `batches` array of the `Course` model.
- **Rationale**: This is the authoritative source for batch-wise enrollment.

## Unknowns & Clarifications
- **Multi-course students**: Can a student be in multiple batches? **Yes**, for different courses. This implementation handles it by linking attendance to the specific `courseId`.
- **Socket.IO Notifications**: Currently notifications are sent to `class:${classId}`. We should add `course:${courseId}` for batch-wise notifications.
