# Research: Admin Teacher Attendance Customization

## Problem Analysis
- **Current State**: `teacher-attendance.html` is a read-only log. The backend `getSystemAttendance` is functional but limited. It doesn't track precise times.
- **Goal**: Add "Add Attendance" capability with custom date/time support and improve the UI to show precise check-in/out times.

## Technical Unknowns
### 1. Data Model Enhancement
- **Decision**: Add `checkIn` and `checkOut` (Date type) to `Attendance` model.
- **Rationale**: The user specifically asked for "actual time". The existing `date` field represents the calendar day, but not the specific arrival/departure times.
- **Implementation**: Allow `class` to be optional or a system placeholder for faculty attendance.

### 2. UI Refinement
- **Decision**: Add an "Add Attendance" button that opens a modal. Use `datetime-local` inputs for Custom Time.
- **Rationale**: Provides full flexibility for admins to record past or current attendance with precision.

## Best Practices
- **Query Optimization**: Update indices to include `checkIn` if frequent sorting by time is needed.
- **Validation**: Ensure `checkOut > checkIn`.
