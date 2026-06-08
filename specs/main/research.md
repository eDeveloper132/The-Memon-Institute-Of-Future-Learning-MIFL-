# Research: Activity Time State Management

## Decision: Dedicated ActivityTime Collection
We will create a new MongoDB collection `ActivityTime` rather than embedding activity times directly into the `User` or `Class`/`Course` models.

## Rationale
- **Growth**: Activity logs can grow indefinitely. Embedding them in a user profile or course document could lead to hitting the 16MB BSON document size limit over time.
- **Querying**: A separate collection allows for robust querying, aggregation (e.g., average time per activity across a class), and pagination in the future.

## Findings

### 1. Data Schema Detail
The `IActivityTime` should be defined as:
```typescript
{
    student: Types.ObjectId; // User
    teacher: Types.ObjectId; // User
    targetType: 'class' | 'course';
    targetId: Types.ObjectId; // Class or Course
    activityName: string;
    duration: string; // Stored as formatted string "HH:MM:SS" or milliseconds
    durationMs: number; // Storing MS allows for easy math operations later
}
```

### 2. UI/UX: Stopwatch Integration
- The stopwatch will remain at the top of the page.
- Below the stopwatch, we will add:
    - **Target Selection**: Radio buttons for Class/Course -> Dropdown for specific entity -> Dropdown for specific student.
    - **Activity Details**: Input for "Activity Name".
    - **Save Button**: Captures the current `elapsedTime` from the stopwatch state.
- **Records Table**: A list below the controls showing recent activities.

### 3. API Design
- `POST /api/teacher/activities`: Save a new time.
- `GET /api/teacher/activities`: Fetch recent times recorded by the teacher.
- `PATCH /api/teacher/activities/:id`: Update activity name or duration.
- `DELETE /api/teacher/activities/:id`: Delete a record.

## Alternatives Considered

### Embedding in User Model
- **Rejected because**: Array of activities on the user object would grow unbounded, causing performance degradation when fetching student profiles.
