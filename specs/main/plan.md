# Implementation Plan: Comprehensive Email Notification System

**Branch**: `main` | **Date**: 2026-06-06 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Systematically integrate email notifications into the MIFL platform by leveraging the existing `NotificationService`. This involves identifying all critical "trigger" points in controllers (Assignments, Attendance, Fees, etc.) and ensuring `NotificationService.send` is called with the appropriate data and templates.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Express, Mongoose, Nodemailer (via mailService)
**Storage**: MongoDB (Notifications collection)
**Project Type**: Web Application
**Scale/Scope**: ~15-20 new trigger points across 5 controllers.

## Constitution Check

- [x] Library-First: Reuse and enhance `NotificationService` and `mailService`.
- [x] Test-First: Unit tests for trigger logic in controllers.
- [x] Simplicity: Smallest viable integration in each controller action.

## Project Structure

### Documentation

```text
specs/main/
├── plan.md              # This file
├── research.md          # Trigger audit and template mapping
├── data-model.md        # N/A (Using existing Notification model)
├── contracts/           # N/A (Existing API)
└── tasks.md             # Implementation tasks
```

### Source Code

```text
services/
├── emailTemplates.ts    # Centralized HTML email templates
└── notification.service.ts # Core orchestration

controllers/
├── teacher.controller.ts # Triggers for assignments, materials, grading
├── admin.controller.ts   # Triggers for fees, enrollments, attendance
├── student.controller.ts # Triggers for quiz attempts
└── auth.controller.ts    # Verify welcome/reset flows
```

**Structure Decision**: Controller-level integration for maximum context (IDs, names).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
