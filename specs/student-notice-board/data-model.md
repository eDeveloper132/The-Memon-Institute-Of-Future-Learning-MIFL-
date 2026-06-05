# Data Model: Student Notice Board

## Updated Entities

### Notice (Extended)
- **type**: String
    - Enum: `['academic', 'exam', 'holiday', 'event', 'admin']`
    - Default: `admin`
    - Description: Used for categorization and icon selection in UI.
- **attachments**: Array<String> (Existing)
    - Description: List of URLs to associated documents.

## Relationships
- **Author**: Links to `User` (ref: `User`).
- **Target Class**: Optional link to `Class` (ref: `Class`) for class-specific notices.

## State Transitions
- **Published**: Notice is visible to the intended audience.
- **Pinned**: Notice appears at the top of the list.
- **Expired**: Notice is automatically hidden after `expiryDate` (if set).
