# Data Model: Parent Management

## Entities

### User (Parent)
- **Role**: `parent`
- **Fields**: (standard user fields)
  - `name`: String
  - `email`: String (unique)
  - `phoneNumber`: String
  - `address`: String

### User (Student)
- **Role**: `student`
- **Fields**:
  - `parent`: ObjectId (ref: `User`, points to a Parent)
  - `parentName`: String (cached for performance)
  - `parentContact`: String (cached for performance)

## Relationships
- **Parent 1 : N Student**: One parent can be linked to multiple students. Each student has exactly one parent record in the current schema.

## Validation Rules
- `linkParentToStudents`:
  - `parentId` must exist and have `role: 'parent'`.
  - `studentIds` must all exist and have `role: 'student'`.

## State Transitions
- **Linking**:
  1. Admin selects a Parent.
  2. Admin selects Students.
  3. For each Student:
     - Set `parent` = `parentId`.
     - Set `parentName` = `parent.name`.
     - Set `parentContact` = `parent.phoneNumber`.
- **Unlinking**:
  - Set `parent` = null.
  - Set `parentName` = "".
  - Set `parentContact` = "".
