# Feature Specification: Teacher Curriculum Management

**Feature Branch**: `095-teacher-curriculum-management`  
**Created**: 2026-05-31  
**Status**: Draft  
**Input**: "Teacher can add course outline and course curriculum, aur class outline and class curriculum in curriculum.html of teacher portal and show in a structured way. Teacher can modify it until admin lock it."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage Course Curriculum (Priority: P1)
As a teacher, I want to add and edit the curriculum and outline for my courses so students know the learning roadmap.

**Acceptance Scenarios**:
1. **Given** I am in the Curriculum page, **When** I select a course, **Then** I can see and edit its outline and curriculum modules.
2. **Given** a course is unlocked, **When** I save changes, **Then** the updates are persisted in the database.

---

### User Story 2 - Manage Class Curriculum (Priority: P1)
As a class teacher, I want to add and edit the curriculum and outline for my specific class.

**Acceptance Scenarios**:
1. **Given** I am a class teacher, **When** I navigate to the Class section in Curriculum, **Then** I can manage the class-specific roadmap.

---

### User Story 3 - Admin Lock Mechanism (Priority: P1)
As an admin, I want to lock the curriculum once it is approved so teachers can no longer modify it.

**Acceptance Scenarios**:
1. **Given** an admin has locked a course curriculum, **When** the teacher views it, **Then** the "Edit" and "Save" buttons are disabled.
2. **Given** a curriculum is locked, **When** I attempt to send a PATCH request via API, **Then** I receive a 403 Forbidden error.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Extend `Course` and `Class` models to include `outline`, `curriculum` (array of modules), and `isLocked`.
- **FR-002**: Create API endpoints to update curriculum for both courses and classes.
- **FR-003**: Implement a structured UI in `curriculum.html` with sections for "My Courses" and "My Class".
- **FR-004**: Use a rich text editor or a modular form (add/remove modules) for curriculum entry.
- **FR-005**: Add admin-only toggle in the Admin Dashboard to lock/unlock curriculum.

### Key Entities
- **Curriculum Module**:
    - `title`: String
    - `content`: String (HTML/Markdown)
    - `duration`: String (optional)

## Success Criteria *(mandatory)*
- **SC-001**: Teachers can add at least 5 curriculum modules to a course.
- **SC-002**: All data is displayed in a clean, hierarchical accordion or list view.
- **SC-003**: The "isLocked" status is strictly enforced by both frontend and backend.
