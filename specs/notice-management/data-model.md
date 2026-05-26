# Data Model: Notice Management

## Notice Entity (Existing)
**Source**: `schemas/models/notice.model.ts`

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `title` | String | Notice headline | Required, trimmed |
| `content` | String | Main announcement body | Required |
| `author` | ObjectId | Admin who created it | Required (Ref: User) |
| `audience` | [String] | Targeted groups | Enum: 'all', 'students', 'teachers', 'parents' |
| `targetClass`| ObjectId | Specific class | Optional (Ref: Class) |
| `expiryDate` | Date | When to hide notice | Optional |
| `isPinned` | Boolean | Stick to top | Default: false |
| `attachments`| [String] | Links to files | Optional |

## Relationships
- **Author**: Many-to-One with `User` (Admin).
- **TargetClass**: Many-to-One with `Class`.

## State Transitions
- **Active**: `expiryDate` is null OR `expiryDate >= now`.
- **Expired**: `expiryDate < now`.
