# Research: Advanced University-Level Curriculum

## Findings

### UI Enhancement (University Level)
- **Typography**: Shift from generic sans-serif to a mix of strong headers (inter/roboto) and clean body text.
- **Components**:
    - **Accordions**: Use for modules to hide/show deep details (Learning Objectives, Resources).
    - **Shimmer Loading**: For a more premium feel during data fetch.
    - **Step Indicator**: A vertical timeline or step indicator for the "Weekly roadmap".
- **Separation of Concerns**:
    - **Subject Mode**: Focusing on academic rigor, modules, outcomes.
    - **Class Mode**: Focusing on pastoral care, behavioral milestones, and class-wide events.

### Data Model Evolution
- We need to add `learningObjectives` (Array) and `suggestedResources` (Array of {title, url}) to the curriculum module schema.
- We should ensure `order` is strictly managed via a drag-and-drop UI or numeric input.

### Preview Mode
- A "Student View" is essential for "Advanced level" portals. This will be a read-only, beautifully formatted modal or separate route that simulates the student's dashboard experience.

## Decisions

### 1. Enhanced Schema
- **Decision**: Update `curriculumModuleSchema` in both `Course` and `Class` models.
- **Rationale**: Support for granular academic data (Objectives/Resources).

### 2. UI Layout
- **Decision**: Use a "Syllabus Header" pattern for the course overview and a "Course Path" vertical list for the weekly modules.
- **Rationale**: Mirrors modern university learning management systems (LMS) like Canvas or Blackboard.

### 3. Student Preview
- **Decision**: Implement a full-screen "Preview" modal in the teacher dashboard.
- **Rationale**: Quickest way for teachers to verify their work without leaving the page.

## Unknowns & Clarifications
- **Rich Text Support**: Should teachers be able to use Bold/Italic/Links in descriptions? **Assumption**: Yes, I will implement a very basic Markdown-to-HTML parser or just allow safe HTML for descriptions.
