# Data Model: Teacher Curriculum Management

## Entities

### CurriculumModule (Sub-document)
- `title`: String
- `description`: String
- `duration`: String (e.g., "Week 1", "3 Hours")
- `order`: Number

### ICourse (Extended)
- `outline`: String
- `curriculum`: [CurriculumModule]
- `curriculumLocked`: Boolean (default: `false`)

### IClass (Extended)
- `classOutline`: String
- `classCurriculum`: [CurriculumModule]
- `classCurriculumLocked`: Boolean (default: `false`)

## Relationships
- **Teacher 1 : N Course**: Teacher manages curriculum for their courses.
- **Class Teacher 1 : 1 Class**: Teacher manages curriculum for their assigned class.

## Validation Rules
- **Lock Check**: Before any update to `curriculum` or `outline`, the system must verify `isLocked === false`.
- **Ownership**: Only the assigned teacher can update the curriculum.
- **Admin Override**: Admin can update the curriculum regardless of the lock status (optional, for emergency fixes).
