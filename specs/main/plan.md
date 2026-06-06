# Implementation Plan: Dynamic Notification Center for Dashboards

**Branch**: `main` | **Date**: 2026-06-06 | **Spec**: `/specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary
Refactor the Admin and Teacher dashboards to replace static notification placeholders with a dynamic feed from the centralized Notification system. This will leverage the existing `NotificationService` and `Socket.IO` integration to provide real-time updates and role-relevant alerts.

## Technical Context

**Language/Version**: TypeScript (Node.js 18+)
**Primary Dependencies**: Express, Mongoose, Socket.IO, Tailwind CSS
**Storage**: MongoDB
**Testing**: Jest, Supertest
**Target Platform**: Vercel (Serverless)
**Project Type**: Web Application
**Performance Goals**: < 200ms API response for stats and notifications
**Constraints**: Strict CSP (no inline scripts), Role-based access control (RBAC)
**Scale/Scope**: 4 Dashboards (Admin, Teacher, Student, Parent)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Library-First: Reuse existing NotificationService.
- [x] CLI Interface: N/A (Web UI task).
- [x] Test-First: New tests for notification retrieval if needed.
- [x] Integration Testing: Verify Socket.IO broadcasts to dashboards.
- [x] Simplicity: Smallest viable change to HTML templates.

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
public/protected/
├── admin/
│   └── index.html       # Refactor System Notifications section
├── teacher/
│   └── index.html       # Add Recent Notifications section
├── student/
│   └── index.html       # Sync with Notification service
└── parent/
    └── index.html       # Add Notice/Notification feed

controllers/
└── notification.controller.ts # Ensure endpoints support dashboard-style listing

routes/
└── notification.routes.ts     # Verify routing
```

**Structure Decision**: Refactoring existing HTML dashboard templates and enhancing frontend JS in those files.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
