# Feature Spec: Notice Management

## Overview
Notice Management allows administrators and authorized staff to broadcast announcements to various groups (students, teachers, parents) within the MIFL system. It ensures that critical information reaches the right audience and remains accessible until it expires or is removed.

## Goals
- Provide a centralized way for Admins to create and manage notices.
- Allow users (Students, Teachers, Parents) to view notices relevant to them.
- Support targeted notices (specific class or audience).
- Support pinned notices for high-priority announcements.

## Functional Requirements
- **Admin Management:**
  - Create a new notice with title, content, audience, and optional expiry/pinned status.
  - Update existing notices.
  - Delete notices.
  - List all notices for management.
- **Audience Viewing:**
  - **Parents:** View notices where audience is 'all' or 'parents'.
  - **Students:** View notices where audience is 'all' or 'students', including class-specific notices.
  - **Teachers:** View notices where audience is 'all' or 'teachers'.
- **Real-time Notifications:**
  - Emit a socket event when a new notice is published.

## Non-Functional Requirements
- **Performance:** Listing notices should be efficient, using indices on `audience` and `targetClass`.
- **Security:** Only 'admin' role can create, update, or delete notices.
- **Usability:** Pinned notices should appear at the top of the list.

## User Stories
1. **As an Admin**, I want to create a notice for all parents about upcoming holidays.
2. **As a Teacher**, I want to see general announcements in my dashboard.
3. **As a Student**, I want to see notices specifically for my class.

## Data Model (Existing)
- **Notice Model:**
  - `title`: String (Required)
  - `content`: String (Required)
  - `author`: ObjectId (Ref User, Required)
  - `audience`: Array of Enums ['all', 'students', 'teachers', 'parents']
  - `targetClass`: ObjectId (Ref Class, Optional)
  - `expiryDate`: Date (Optional)
  - `isPinned`: Boolean (Default: false)
  - `attachments`: Array of Strings (Optional)

## Acceptance Criteria
- [ ] Admin can create a notice via `POST /api/admin/notices`.
- [ ] Admin can list all notices via `GET /api/admin/notices`.
- [ ] Admin can update a notice via `PATCH /api/admin/notices/:id`.
- [ ] Admin can delete a notice via `DELETE /api/admin/notices/:id`.
- [ ] Students can view relevant notices via `GET /api/student/notices`.
- [ ] Teachers can view relevant notices via `GET /api/teacher/notices`.
- [ ] Parents can view relevant notices via `GET /api/parent/notices` (already partially exists, needs verification).
- [ ] New notices trigger a `notification` socket event.
