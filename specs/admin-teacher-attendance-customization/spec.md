# Feature Spec: Admin Teacher Attendance Customization

## Overview
Provide administrators with a robust interface to manage faculty attendance. This includes viewing attendance with precise timestamps and the ability to manually record attendance for any date/time.

## Goals
- Full management of teacher attendance records by Admins.
- Support for "Actual" time (server-side) and "Custom" time (manual entry).
- Clear, filterable directory of attendance history.

## Functional Requirements
- **Viewing Attendance:**
  - List all teachers and their current status for a selected date.
  - Show precise check-in/check-out timestamps.
- **Recording Attendance:**
  - Admins can mark a teacher as Present/Absent.
  - Admins can specify custom check-in and check-out times for past dates.
- **Filtering:**
  - Filter by Date, Teacher Name, and Status.

## Acceptance Criteria
- [ ] Admin can view teacher attendance for any date.
- [ ] Admin can add a new attendance record with a custom date and time.
- [ ] Records show both the date and the specific time of entry.
