# Feature Specification: Advanced University-Level Curriculum

**Feature Branch**: `099-advanced-curriculum`  
**Created**: 2026-05-31  
**Status**: Draft  
**Input**: "make curriculum.html advanced level make it university level teacher dashboard's curriculum and outline seperate by courses for teacher course students and seperate for class for teacher class students."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Advanced Course Syllabus (Priority: P1)
As a university instructor, I want to create a professional course syllabus including an academic outline, weekly modules, and specific learning outcomes.

**Acceptance Scenarios**:
1. **Given** I select a course, **When** I view the curriculum tab, **Then** I see a clean, professional "Course Overview" and a "Weekly Schedule" section.
2. **Given** I am in edit mode, **When** I add a module, **Then** I can specify "Learning Objectives" and "Required Readings" (advanced fields).

---

### User Story 2 - Distinct Class Management (Priority: P1)
As a class teacher, I want to manage a separate "Class Roadmap" that focuses on class-specific events, milestones, and shared class values, distinct from individual course curricula.

**Acceptance Scenarios**:
1. **Given** I am a class teacher, **When** I switch to the "Class Roadmap" tab, **Then** the interface provides tools to manage class-level milestones.

---

### User Story 3 - Professional Preview Mode (Priority: P2)
As a teacher, I want to see exactly how students will see my curriculum so I can ensure it is visually appealing and professional.

**Acceptance Scenarios**:
1. **Given** I have completed the curriculum, **When** I click "Preview as Student", **Then** a modal opens showing the curriculum in a high-quality, formatted "Public Syllabus" view.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Enhance `curriculumModuleSchema` to include `learningObjectives` (Array of strings) and `resources` (Links).
- **FR-002**: Separate UI logic in `curriculum.html` to clearly distinguish between Course Curriculum (content taught) and Class Roadmap (class management/life).
- **FR-003**: Implement a "Rich View" for curriculum modules using an accordion or detailed list with icons.
- **FR-004**: Add a "Print/Export" feature to generate a PDF syllabus (optional P3).
- **FR-005**: Ensure "isLocked" status prevents all advanced field edits.

### Key Entities
- **Curriculum Module (Advanced)**:
    - `title`: String
    - `description`: String
    - `duration`: String
    - `learningObjectives`: [String]
    - `resources`: [String] (URLs)
    - `order`: Number

## Success Criteria *(mandatory)*
- **SC-001**: Curriculum interface follows university-grade aesthetic (clean, white-space, professional typography).
- **SC-002**: Teachers can distinguish between their role as a "Subject Instructor" (Course) and "Class Mentor" (Class).
- **SC-003**: Mobile responsiveness is maintained despite increased data complexity.
