# Research: Teacher Curriculum Management

## Findings

### Data Model Mapping
- **Courses**: A course already has a `teacher` field. We will add `curriculum` (Array), `outline` (String), and `curriculumLocked` (Boolean) to the `Course` model.
- **Classes**: A class has a `classTeacher` field. We will add `classCurriculum` (Array), `classOutline` (String), and `classCurriculumLocked` (Boolean) to the `Class` model.

### UI Architecture
- `curriculum.html` currently only shows `materials`. We will transform this into a multi-tab view or a segmented layout:
    - **Tab 1: Course Curriculum**: Select from taught courses.
    - **Tab 2: Class Curriculum**: Visible only if the user is a class teacher.
    - **Tab 3: Materials**: The existing file-sharing view.

### Lock Mechanism
- **Backend Protection**: In the update controller, we will fetch the current document and check the lock status before allowing `findOneAndUpdate`.
- **Frontend Protection**: Render the form in read-only mode if the lock is active.

## Decisions

### 1. Data Structure for Curriculum
- **Decision**: Use an array of objects for modules.
- **Rationale**: Allows for structured display (title, description, duration) rather than just a massive block of text. This facilitates the "structured way" requirement.

### 2. Editor Choice
- **Decision**: Simple `<textarea>` or a basic markdown editor.
- **Rationale**: Minimal complexity for MVP, but provides enough flexibility for teachers.

### 3. API Endpoints
- **Decision**: Create `PATCH /api/teacher/courses/:id/curriculum` and `PATCH /api/teacher/classes/:id/curriculum`.
- **Rationale**: Explicit endpoints for curriculum updates keep the generic CRUD endpoints clean.

## Alternatives Considered
- **New `Curriculum` Model**: Rejected because curriculum is deeply tied to the course/class entity. Embedding it simplifies queries and ensures atomicity.

## Unknowns & Clarifications
- **Student Access**: Should students be able to view this? **Assumption**: Yes, since it acts as a roadmap. I will ensure the student views for courses also display the curriculum.
