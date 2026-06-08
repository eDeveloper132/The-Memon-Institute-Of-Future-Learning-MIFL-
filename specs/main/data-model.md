# Data Model: Standalone Materials

## Entity: Material (Updated)
| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `title` | String | Material headline | Required, trimmed |
| `description` | String | Context or instructions | Optional |
| `type` | String | File classification | Enum: pdf, doc, video, link, other (Default: other) |
| `course` | ObjectId | Course reference | **Optional** (Previously Required) |
| `class` | ObjectId | Class reference | **Optional** (New) |
| `teacher` | ObjectId | Uploader reference | Required |
| `fileUrl` | String | Sanity CDN link | Optional |
| `link` | String | External URL | Optional |

**Custom Validation**:
Before saving, the schema should ideally verify that either `course` or `class` is provided, though this can also be enforced at the controller level.

## Entity: User (Implicit)
No changes required. Relies on `currentClass` for class-level targeting and `enrolledStudents` array in the `Course` model for course-level targeting.
