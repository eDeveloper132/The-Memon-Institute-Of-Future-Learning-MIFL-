# Research: Admin Course UI Improvement

## Technical Unknowns

### 1. Department API
- **Decision**: Implement `crudDepartments.getAll` in `admin.controller.ts`.
- **Rationale**: A basic `GET` endpoint is needed to populate the frontend dropdown. Since `Department` model already exists, implementing a simple retrieval function is straightforward.
- **Alternatives Considered**: hardcoding departments in HTML (Rejected: inflexible and prone to desync).

### 2. UI Pattern
- **Decision**: Use the existing modal pattern in `courses.html` but replace the input with a select element.
- **Rationale**: Maintains visual consistency and reuses existing form submission logic.

## Best Practices
- **Population**: Always populate the `department` field when fetching courses to show names instead of IDs (already done in current code).
- **Validation**: Ensure the backend validates that the provided `department` ID exists during course creation.
