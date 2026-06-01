# Data Model: Student Enrollment Workflow

## Modified Entities

### Class
- **New Field**: `enrollmentFee: Number (default: 0)`

### Course
- **New Field**: `enrollmentFee: Number (default: 0)`

## New Entities

### EnrollmentRequest
- **student**: ObjectId (Ref: `User`)
- **targetType**: String (enum: `['Class', 'Course']`)
- **targetId**: ObjectId (RefPath: `targetType`)
- **status**: String (enum: `['pending', 'approved', 'denied', 'cancelled']`, default: `'pending'`)
- **feeAtTimeOfApplication**: Number
- **appliedAt**: Date (default: `Date.now`)
- **processedAt**: Date
- **processedBy**: ObjectId (Ref: `User`)

## Validation Rules

1. **Class Uniqueness**: Before creating a `pending` request for a `Class`, check if the student is already in a `Class` or has another `pending` request for a `Class`.
2. **Double Application**: Prevent multiple `pending` requests for the same `targetId` by the same `student`.
3. **Approval Action**: When status changes from `pending` -> `approved`:
    - If `targetType === 'Class'`: Add student ID to `Class.students`.
    - If `targetType === 'Course'`: Add student ID to `Course.enrolledStudents`.
