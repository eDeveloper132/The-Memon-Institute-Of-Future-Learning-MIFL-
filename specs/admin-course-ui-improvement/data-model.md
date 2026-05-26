# Data Model: Admin Course UI Improvement

## Department Entity (Existing)
**Source**: `schemas/models/department.model.ts`

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Department Name (Required) |
| `code` | String | Department Code (Unique, Required) |

## Course Entity (Existing)
**Source**: `schemas/models/course.model.ts`

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Course Title |
| `department` | ObjectId | Ref to Department (Required) |
