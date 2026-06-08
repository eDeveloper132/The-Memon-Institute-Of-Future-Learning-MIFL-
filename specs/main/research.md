# Research: Universal Profile Management Architecture

## Decision: Global DOM Modal for Profile Settings
We will implement the profile settings as a dynamic modal triggered from the `<ui-navbar>` Web Component, rather than redirecting the user to a standalone `profile.html` page.

## Rationale
- **Context Retention**: Teachers and students often need to check or update a quick setting without losing their place in complex views (like the Curriculum IDE or Stopwatch).
- **Maintainability**: Building it as a reusable function/component in `ui-components.ts` ensures it automatically propagates to every protected route in the system.

## Findings

### 1. Avatar Upload Flow
We currently have `sanityService.uploadAsset(buffer, filename, mimetype)`. 
- **Endpoint**: We will create `POST /api/auth/profile/avatar` utilizing `multer` for memory storage. The controller will send the buffer to Sanity and return the URL, then automatically update the user's `profilePicture` field in DB.
- **Alternative**: We could use a generic `PATCH /api/auth/profile` that handles both text data and multipart files, but separating the avatar upload into its own endpoint provides a snappier UX (image uploads immediately, details save on submit).

### 2. Role-Based Fields
The `IUser` schema contains specific fields (e.g., `qualification` for Teachers, `emergencyContact` for Students). 
- The UI modal must check the `currentUser.role` and conditionally render these extra fields.
- The backend `PATCH /api/auth/profile` must safely filter incoming data to prevent privilege escalation or cross-role data pollution (e.g., a student cannot send a `staffId` field).

### 3. Navbar Sync
To achieve real-time sync without React/Vue state management:
- The `ui-navbar` component will assign a specific ID or class to its avatar `<img>` tag.
- Upon successful profile save, the modal script will find `document.querySelector('ui-navbar img')` and update its `src` attribute.

## Alternatives Considered

### Standalone Profile Page
- **Rejected because**: Interrupts workflow. Requires creating and routing a new HTML file for every role (`/student/profile.html`, `/teacher/profile.html`), or creating a complex unified page. A universal modal injected via JS is much cleaner for the existing monolithic architecture.