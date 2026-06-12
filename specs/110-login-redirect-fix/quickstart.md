# Quickstart: Login Redirect Fix

## How to Verify

1. **Frontend Redirect**:
   - Go to `/api/auth/login`.
   - Log in with valid credentials.
   - Observe that you are instantly redirected to `/home` (Dashboard), not `/`.

2. **Root Route Auto-Redirect**:
   - While logged in, manually change the URL to `http://localhost:2500/`.
   - Observe that the server automatically redirects you back to `/home`.

3. **Guest Access Preserved**:
   - Log out.
   - Navigate to `http://localhost:2500/`.
   - Observe that you correctly see the public Landing Page.
