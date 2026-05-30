# Research: Targeted Assignments

## Findings

### Current Assignment Flow
- **Creation**: `POST /api/teacher/assignments` takes `class`, `course`, `title`, `description`, `dueDate`.
- **Targeting**: Currently hardcoded to require both `class` and `course`.
- **UI**: The "New Assignment" modal is basic and doesn't handle dynamic course/batch loading.

### Schema Constraints
- The `Assignment` model currently has `course` and `class` as required `ObjectId` fields.
- To support batch targeting, we need to:
    1. Make `class` optional in the schema.
    2. Add an optional `batch` field (as a string or ObjectId depending on how batches are modeled).
    - *Correction*: Batches are embedded in the `Course` model as sub-documents with their own `_id`. So `batch` should be a `Schema.Types.ObjectId`.

### UI Considerations
- We can reuse the `fetchTeacherCourses` and `fetchTeacherClasses` logic implemented for attendance.
- The UI needs a way to toggle between "Target Class" and "Target Batch".

## Decisions

### 1. Schema Update
- **Decision**: Update `IAssignment` and `Assignment` model.
- **Rationale**: Making `class` optional and adding `batch` allows for granular targeting while maintaining backwards compatibility for existing class-wide assignments.

### 2. Notification Strategy
- **Decision**: Update Socket.IO room logic.
- **Rationale**: If targeted to a batch, the notification should ideally be sent to a batch-specific room. However, since students are joined to `class:ID` and `user:ID` rooms, we may need to emit to individual user IDs in the batch or create a `batch:ID` room in `socket.ts`.
- *Simpler Alternative*: Emit to the `course:ID` room but include metadata about the batch. Or, iterate through students in the batch and emit to their private rooms. 
- *Chosen approach*: Emit to `course:ID` if available, otherwise `class:ID`. This matches the attendance pattern.

### 3. UI Implementation
- **Decision**: Use dynamic selection in the modal.
- **Rationale**: Selecting a course should reveal its batches, just like in the attendance UI.

## Unknowns & Clarifications
- **Multi-select**: Can an assignment target multiple batches at once? **No**, keeping it to one target per assignment for MVP to match current attendance patterns.
