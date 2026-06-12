# Research: Login Redirect Fix

## Decision: Frontend Redirect
**Approach**: Update `public/auth/login.html` to redirect to `/home` instead of `/` upon successful authentication.

**Rationale**: Since the recent routing updates moved the protected dashboard to `/home`, the login script needs to point to the new location.

## Decision: Root Route Auto-Redirect
**Approach**: Update `index.ts` root route handler (`app.get("/")`) to check for the presence of `req.cookies.token`. If present, redirect to `/home`; otherwise, serve `landing.html`.

**Rationale**: This ensures that if an already logged-in user navigates to the base URL, they are smoothly transitioned to their dashboard instead of seeing the guest landing page. It avoids using the standard `authenticate` middleware, which would force guests to the login page.
