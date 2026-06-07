# Specification: Curriculum Studio Redesign

## Background
The current "Academic Studio" is feature-rich but visually dense. Teachers find it difficult to navigate through long syllabi and manage nested modules. We need to transition to a more modern, intuitive "Editor" layout.

## User Stories
- **As a Teacher**, I want a clear overview of my entire curriculum at all times so I can jump between weeks/sections easily.
- **As a Teacher**, I want a "distraction-free" editing experience for specific modules.
- **As a Teacher**, I want a simpler way to add learning outcomes and resources without navigating through complex card structures.

## Requirements

### Functional
- **Sidebar Navigation**: A persistent sidebar (or collapsible panel) showing the "Table of Contents" (Sections -> Modules).
- **Focus Mode**: When selecting a section in the sidebar, the main editor scrolls to or only displays that specific part.
- **Streamlined Inputs**: Replace bulky card layouts with a more compact, row-based module editor.
- **Breadcrumbs**: Clear indication of what course/class is being edited.
- **Integrated Search**: Ability to find specific topics within the curriculum.

### Technical
- **Layout**: Use a `flex` or `grid` layout with a scrollable sidebar.
- **Performance**: Optimized DOM rendering to handle 50+ modules without lag.
- **Logic**: Maintain parity with the existing `curriculumLocked` and `curriculumSections` data structure.
- **Component Reuse**: Leverage existing `ui-navbar` and `ui-spinner`.

## Acceptance Criteria
- [ ] Sidebar correctly reflects the current sections and modules.
- [ ] Clicking a sidebar item scrolls the main view or updates the focus.
- [ ] Adding/Removing modules is intuitive and requires fewer clicks.
- [ ] UI remains fully responsive (sidebar collapses on mobile).
- [ ] No loss of data integrity during the migration to the new UI.
