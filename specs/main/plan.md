# Implementation Plan: Fix Student Curriculum Visibility

**Branch**: `main` | **Date**: 2026-06-08 | **Spec**: N/A
**Input**: Teacher added curriculum and outline with scheduling and pdf files and links but students can't see in "http://localhost:2000/protected/student/curriculum.html"

## Summary

The frontend roadmap/curriculum view for students is currently trying to fetch data from `/api/admin/courses` and `/api/admin/classes`. Because students lack admin privileges, these requests fail with a 403 Forbidden error, leaving the curriculum UI empty. This plan implements a new, dedicated student endpoint that aggregates the student's enrolled courses and class roadmaps securely, and updates the frontend to consume it.

## Technical Context

**Language/Version**: TypeScript / Node.js
**Primary Dependencies**: Express, HTML, TailwindCSS
**Project Type**: Web application
**Scope**: Backend endpoint creation and frontend fetch update.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Spec-Driven: Requirement coverage confirmed.
- [x] II. Type Safety: Schema/Types defined. No `any` without justification.
- [x] III. Verification Gate: `npx tsc` identified as mandatory pre-commit step.
- [x] IV. Library-First: Business logic encapsulated in services.
- [x] V. Simplicity: Smallest viable change identified.
- [x] VI. Proactive: Notification triggers identified (Not applicable here).

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
```

## Phase 0: Outline & Research

- **Root Cause**: The `curriculum.html` frontend is making unauthorized requests to admin-only API routes.
- **Solution**: Create a secure `/api/student/roadmaps` endpoint that returns only the curriculum data relevant and permitted to the requesting student.

## Phase 1: Design & Contracts

See `data-model.md` for the new `GET /api/student/roadmaps` API contract.

### Action Items
1. **Backend**: Add `getMyRoadmaps` logic to `controllers/student.controller.ts`.
2. **Backend**: Register `GET /api/student/roadmaps` in `routes/student.routes.ts`.
3. **Frontend**: Update `public/protected/student/curriculum.html` to fetch from `/api/student/roadmaps` instead of the broken admin routes.
