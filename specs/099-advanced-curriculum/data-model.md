# Data Model: Advanced University-Level Curriculum

## Entities

### CurriculumModule (Enhanced)
- `title`: String (Required)
- `description`: String (Required)
- `duration`: String (e.g., "Week 1", "Session 5")
- `learningObjectives`: [String] (Array of specific outcomes)
- `resources`: [
    {
      "title": String,
      "url": String
    }
  ]
- `order`: Number (Default: 0)

### ICourse (Extended)
- `outline`: String (Academic summary)
- `curriculum`: [CurriculumModule]
- `curriculumLocked`: Boolean

### IClass (Extended)
- `classOutline`: String (Class-wide roadmap)
- `classCurriculum`: [CurriculumModule]
- `classCurriculumLocked`: Boolean

## State Transitions

### Editing (Unlocked)
1. Teacher modifies module data.
2. System validates that `isLocked` is false.
3. System persists changes and updates `updatedAt` timestamp.

### Approved (Locked)
1. Admin toggles `isLocked` to true.
2. System prevents all `PATCH` requests to the curriculum endpoint for this entity.
3. UI switches to read-only "Syllabus" view for the teacher.
