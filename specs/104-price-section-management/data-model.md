# Data Model: Price Section Management

## Entities

### Course
- **enrollmentFee**: Number (Existing)
  - Validation: Must be non-negative.
  - UI Representation: PKR format (Rs.)

### Class
- **enrollmentFee**: Number (Existing)
  - Validation: Must be non-negative.
  - UI Representation: PKR format (Rs.)

## Relationships
- No new relationships are introduced. The `enrollmentFee` is an attribute of both `Course` and `Class` entities.

## State Transitions
- **Creation**: `enrollmentFee` is now set during the initial POST request.
- **Update**: `enrollmentFee` can be updated via the Edit modal (PATCH) or the dedicated fee update button.
