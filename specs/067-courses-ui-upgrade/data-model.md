# Data Model: Course Batches

## Updated Entity: `Course`

We are adding the `batches` field to mirror the `Class` model.

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | (Existing) |
| `code` | String | (Existing) |
| `department` | ObjectId (Dept) | (Existing) |
| `teacher` | ObjectId (User) | (Existing) |
| `batches` | [BatchSchema] | NEW: Array of batches |

### `BatchSchema` (Internal)
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Batch name (e.g. 'Advanced') |
| `students` | [ObjectId (User)] | List of students in this batch |

## Relationship Summary
- `Course` (1) --- (Many) `User` (as Teacher)
- `Course` (1) --- (Many) `Batch` (Embedded)
- `Batch` (1) --- (Many) `User` (as Enrolled Students)
