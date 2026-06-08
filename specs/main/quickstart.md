# Quickstart: Testing Profile Updates

## Setup
1. Log in as any user (Admin, Teacher, or Student).
2. Look at the top right of the navigation bar.

## Test Case 1: Avatar Upload
1. Click your name/avatar in the navbar. The Profile Settings modal should open.
2. In the Avatar section, click to upload a new image (JPG/PNG).
3. Wait for the upload to complete.
4. Verify that the avatar in the modal AND the avatar in the top right navbar update immediately.

## Test Case 2: Update Details
1. In the Profile Settings modal, change your Phone Number and Address.
2. If you are a Student, update your Emergency Contact Name.
3. Click "Save Changes".
4. Refresh the page.
5. Click your name in the navbar again and verify the updated details persisted.

## Test Case 3: Delete Avatar
1. In the Profile Settings modal, click the "Remove" or "Trash" button next to your avatar.
2. Verify the avatar reverts to the default generic user icon in both the modal and the navbar.
3. Refresh the page to ensure the deletion persisted to the database.

## Verification Checklist
- [ ] Inline scripts are avoided in the modal (CSP compliance).
- [ ] Sanity CDN correctly hosts the profile images.
- [ ] Read-only fields (Role, Email, ID) cannot be modified via backend endpoint injection.