# Data Model: Admin Student CRUD Fixes

## User Entity (Student Specific Fields)
**Source**: `schemas/models/user.model.ts`

| Field | Type | Description | Population |
|-------|------|-------------|------------|
| `studentId` | String | Unique ID for student | N/A |
| `parent` | ObjectId | Linked parent user | `name`, `email` |
| `currentClass` | ObjectId | Student's current class | `name`, `gradeLevel` |

## Validation Rules
- `password`: If provided during update, must trigger hashing.
- `role`: Admin must ensure `role: 'student'` is set for students.
