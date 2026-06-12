# Quickstart: Public Landing Page

## Integration Steps

1. **New Public Route**:
   - Create `public/landing.html`.
   - Update `index.ts` to add `app.get("/", (req, res) => res.sendFile(...))`.

2. **Redirect Protected Root**:
   - Update `index.ts` to change the existing `app.get("/")` to `app.get("/home")`.

3. **Frontend Integration**:
   - Landing page fetches from `GET /api/public/information-center`.
   - Render sections dynamically using vanilla JS/web components.

4. **Navigation**:
   - Ensure the "Login" button points to `/auth/login.html`.
   - Ensure authenticated users can navigate from `/` to `/home`.

## Verification
- Visit `http://localhost:2500/` while logged out → See Landing Page.
- Visit `http://localhost:2500/` while logged in → See Landing Page (or auto-redirect to `/home` if desired, but user asked for landing page at base url).
