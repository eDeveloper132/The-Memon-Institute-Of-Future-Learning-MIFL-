# Research: Navigation Patterns for Curriculum Editors

## Decision: Dual-Pane Navigation
We will use a fixed-width left sidebar (320px) for the hierarchy and an elastic main area for the editor.

## Rationale
- **Hierarchy Visibility**: Sitemaps/Table of Contents are essential for documents with nested data (Sections -> Modules -> Outcomes).
- **Familiarity**: This layout mimics modern editors like VS Code or Notion, reducing the learning curve for teachers.

## Findings

### 1. The "Anchor" vs "Focus" Problem
- **Approach**: Clicking a sidebar item will use `scrollIntoView({ behavior: 'smooth' })` on the main editor.
- **Why**: Keeping all data in one scrollable area prevents the "Where did my data go?" feeling of multi-page forms.

### 2. Compact Module Editing
- **Old**: Bulky white cards with 40px margins.
- **New**: Tight, row-based layout with "ghost" icons that appear on hover for dragging/deleting.

### 3. State Syncing
- **Decision**: We will keep a JSON representation of the curriculum in memory (`workingState`) and re-render only the affected branches of the DOM tree where possible, or use a highly optimized full re-render if performance allows.

## Alternatives Considered

### Modal-based editing for modules
- **Rejected because**: Slows down the workflow. Teachers want to scan and edit multiple modules simultaneously.

### "Infinite" Scroll with Lazy Loading
- **Rejected because**: Syllabi are typically < 100 modules. Lazy loading adds complexity that isn't needed for this scale (YAGNI).
