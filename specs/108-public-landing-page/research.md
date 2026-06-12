# Research: Public Landing Page

## Decision: Routing Strategy
**Approach**: Move existing protected root (`/`) to `/home` or `/dashboard`. Create a new public route for `/` that serves the landing page.

**Rationale**: Ensures that the first touchpoint for any user (authenticated or not) is the landing page, providing professional branding and institute information.

**Alternatives Considered**:
- Serving different content at `/` based on auth status in a single route handler. *Rejected* because it's cleaner to have separate routes for distinct pages.

## Decision: UI/UX Framework
**Approach**: Vanilla CSS with modular components (already used in the project).

**Rationale**: Aligns with the project's preference for Vanilla CSS and strict CSP (no inline scripts).

## Decision: Data Sourcing
**Approach**: Leverage the existing `/api/public/information-center` endpoint.

**Rationale**: This endpoint already aggregates courses, departments, and system info (name, motto, contact) which is exactly what a landing page needs.

## Decision: File Location
**Approach**: `public/index.html` (the current protected one is at `public/protected/index.html`).

**Rationale**: Standard practice for static file serving.
