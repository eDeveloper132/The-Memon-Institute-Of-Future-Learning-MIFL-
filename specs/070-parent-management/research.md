# Research: Parent Management Implementation

## Findings

### Existing Models & Schemas
- **User Model**: Already has a `role` field that includes `parent`.
- **Student-Parent Link**: Students have a `parent` field (`Schema.Types.ObjectId`, ref: `User`).
- **Redundancy**: The `User` model also has `parentName` and `parentContact` strings on students. These should be synced when linking a parent account for better data consistency and performance in quick views.

### Existing Controllers & Routes
- **`parent.controller.ts`**: This controller is designed for the Parent portal (e.g., viewing their own children's results/attendance). It is NOT for admin management of parents.
- **`admin.controller.ts`**: Handles Student and Teacher management. Adding Parent management here (or in a dedicated admin-parent controller) is appropriate.
- **Generic User CRUD**: `createUser`, `updateUser`, and `deleteUser` in `admin.controller.ts` are already generic enough to handle parents if the role is passed.

### UI Architecture
- **Admin Dashboard**: Navigation is centralized in `public/components/ui-components.ts` (`UINavbar` component).
- **Admin Pages**: Built with Vanilla HTML/JS and Tailwind CSS. Each entity (students, teachers, classes) has its own `.html` file.
- **Templates**: `students.html` or `teachers.html` can serve as high-quality templates for the new `parents.html`.

## Decisions

### 1. API Endpoint for Linking
- **Decision**: Create a dedicated bulk linking endpoint `POST /api/admin/parents/link`.
- **Rationale**: Admin should be able to select multiple students for one parent in a single action.
- **Alternative**: Updating each student record individually via `PATCH /api/admin/users/:id`. Rejected because it's less efficient and harder to maintain atomicity in UI state.

### 2. UI Entry Point
- **Decision**: Add "Parents" to the `admin` links in `UINavbar` and add a quick-access card in `admin/index.html`.
- **Rationale**: Ensures feature discoverability.

### 3. Data Synchronization
- **Decision**: When linking a parent account to a student, automatically populate `parentName` and `parentContact` on the student record from the parent's user profile.
- **Rationale**: Maintains existing schema patterns while improving data integrity.

## Alternatives Considered
- **Linking via Student Page**: We could add a "Select Parent" dropdown on the student edit page.
- **Linking via Parent Page**: Selecting students from the parent page.
- **Final Choice**: Both are viable, but the user specifically asked for "make parent accounts... and link by selecting student," suggesting a parent-first workflow. We will implement the parent-first workflow but also ensure the student-first view reflects the link.

## Unknowns & Clarifications
- **Multi-student linking**: Can a parent be linked to multiple students? **Yes**, this is a standard requirement for family accounts.
- **Multi-parent linking**: Can a student have multiple parent accounts linked (e.g., Mother and Father)? **Current Schema says No** (single `parent` field). We will stick to the current schema for now to avoid breaking changes.
