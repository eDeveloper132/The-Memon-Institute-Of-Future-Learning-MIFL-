# Implementation Plan: Admin Teacher Attendance Customization

**Branch**: `admin-teacher-attendance-customization` | **Date**: 2026-05-26 | **Spec**: [specs/admin-teacher-attendance-customization/spec.md](spec.md)
**Input**: Feature specification from `/specs/admin-teacher-attendance-customization/spec.md`

## Summary
Enhance the Teacher Attendance interface to allow administrators to view precise timestamps and manually record attendance with custom dates and times.

## Technical Context
**Language/Version**: Node.js (TypeScript)
**Primary Dependencies**: Express, Mongoose
**Storage**: MongoDB
**Constraints**: Zero inline handlers (CSP Compliance), 100% population of teacher data.

## Constitution Check
- [x] **Test-First**: I will manually verify "Actual" and "Custom" time logging as per `quickstart.md`.
- [x] **Simplicity**: Smallest viable change to existing `Attendance` model and admin controller.

## Project Structure
### Source Code
```text
public/protected/admin/
└── teacher-attendance.html  # Port features from student directory logic

controllers/
└── admin.controller.ts      # Enhance getSystemAttendance and add manual record method

schemas/
├── models/attendance.model.ts
└── types/attendance.type.ts
```

## Phase 0: Data Layer Updates
- Update `IAttendance` and `attendanceSchema` to include `checkIn` and `checkOut`.
- Ensure `class` is optional for faculty attendance.

## Phase 1: Controller Enhancements
- Refactor `getSystemAttendance` to include `checkIn`/`checkOut` in the response.
- Create a dedicated manual recording method or update existing ones to handle custom timestamps.

## Phase 2: UI Overhaul
- Port the search/filter/CSP-safe logic pattern to `teacher-attendance.html`.
- Implement "Add Attendance" modal with `datetime-local` inputs.
