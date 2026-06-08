# Specification: Universal User Profile Management

## Background
Users currently cannot edit their profile information or upload an avatar easily from the UI. The user requested that clicking their name in the universal navbar should trigger a profile update interface. This interface must allow uploading/deleting a profile picture (saved to Sanity CDN), displaying the picture in the navbar, and updating credentials/details based on the user's role.

## User Stories
- **As a User**, I want to click my name/avatar in the navbar to open a Profile Settings interface.
- **As a User**, I want to upload a new profile picture or delete my existing one, with changes immediately reflected in the navbar.
- **As a User**, I want to update my personal credentials (e.g., phone number, address, date of birth).
- **As a Teacher**, I want to be able to view/update specific details relevant to my role (e.g., qualifications).
- **As a Student**, I want to view/update my specific details (e.g., emergency contact).

## Requirements

### Functional
- **Universal Access**: The profile trigger must be integrated into `ui-components.ts` (`<ui-navbar>`) so it is available across all protected pages.
- **Avatar Management**: 
    - Support uploading an image file (JPG, PNG, WEBP).
    - Upload image to Sanity CDN via existing infrastructure (`sanityService`).
    - Provide a "Remove Picture" option that sets `profilePicture` to null.
- **Role-Specific Fields**:
    - The modal/page should dynamically render form fields based on the user's `role` (Admin, Teacher, Student, Parent).
- **Real-Time Sync**: Updating the profile picture should immediately update the navbar avatar without requiring a hard page refresh.

### Technical
- **API**: 
    - Add a `POST /api/auth/profile/avatar` route to handle multipart image uploads directly to Sanity.
    - Add a `PATCH /api/auth/profile` route to handle textual detail updates.
- **Service Integration**: Use `sanityService.uploadAsset` for storing the profile pictures securely.
- **Component**: Build a `<ui-profile-modal>` custom element inside `ui-components.ts` or dynamically inject a modal into the DOM when the user clicks their name.
- **Security**: Users can only update their own profile. Read-only fields (email, role, IDs) must be stripped from requests.

## Acceptance Criteria
- [ ] Clicking the user name in the navbar opens the profile settings.
- [ ] User can upload a profile picture and it saves to Sanity.
- [ ] Navbar avatar updates immediately upon successful upload.
- [ ] User can update generic credentials (phone, address).
- [ ] User can delete their profile picture.
- [ ] TypeScript compilation passes with 0 errors.