# Research: Price Section Implementation (PKR)

## Decision: Implementation Strategy
We will add an `enrollmentFee` input field to the "Register New Course" and "New Academic Class" creation/edit modals. The display format will be updated from USD ($) to PKR (Rs.) across the administrative interface for these entities.

## Rationale
- The models `Course` and `Class` already contain an `enrollmentFee` field.
- The current implementation only allows updating the fee via a prompt AFTER creation. Adding it to the creation modal improves UX and ensures fees are set correctly from the start.
- The user specifically requested PKR format.

## Alternatives Considered
1. **Adding a new `price` field**: Rejected because `enrollmentFee` already exists and serves this purpose.
2. **Currency conversion**: Rejected as the requirement is specifically for PKR format, implying a fixed currency for the application context.

## Findings
- **File to modify (Courses)**: `public/protected/admin/courses.html`
- **File to modify (Classes)**: `public/protected/admin/classes.html`
- **Backend**: `controllers/admin.controller.ts` already handles `enrollmentFee` via `req.body` in create/update methods.
- **Display format**: Current displays use `$${c.enrollmentFee}`. This should be changed to `Rs. ${c.enrollmentFee}` or similar PKR representation.
