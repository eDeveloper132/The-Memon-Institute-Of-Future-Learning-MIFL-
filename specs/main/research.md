# Research: Documentation Audit Findings

## Decision: Unified Documentation Strategy
We will move away from placeholder-heavy READMEs to high-signal, technical documentation that reflects the current TypeScript implementation and the v1.1.0 constitutional principles.

## Audit Mapping

| File | Current State | Missing/Outdated Items |
|------|---------------|------------------------|
| **Root README.md** | Basic | Missing Real-time details, Email System info, `tsc` Quality Gate. |
| **config/README.md** | Minimal | Missing details on `mailService` config and environment variables for Sanity. |
| **controllers/README.md** | Generic | Needs to mention standard trigger patterns for notifications and async backgrounding. |
| **middlewares/README.md** | Basic | Missing details on role-based rate limiting (students only) and CSP-aware security middleware. |
| **public/README.md** | Placeholder | Missing Custom Web Component list and CSP compliance rules (no inline scripts). |
| **routes/README.md** | Outdated | Doesn't reflect current route structure for notifications, enrollments, and teacher oversight. |
| **schemas/README.md** | Basic | Missing indexes for real-time performance and relationship mapping. |
| **services/README.md** | Sparse | Missing `NotificationService`, `RoleService`, and `MailService` architecture. |
| **types/README.md** | Very Sparse | Needs to explain centralized data-related types in `schemas/types/`. |

## Key Findings

### 1. The "Single Source of Truth" Problem
Many READMEs refer to features that have since been refactored (e.g., global rate limiting).
- **Decision**: Update all docs to reflect **targeted** mechanisms (e.g., Student-only rate limits).

### 2. UI Component Visibility
The `public/README.md` is almost empty but the `ui-components.ts` is now a major part of the project.
- **Decision**: List all custom elements (`ui-navbar`, `ui-card`, etc.) in the public docs.

### 3. Verification Gate Prominence
The new `npx tsc` mandate from the Constitution must be visible in the Root README to ensure compliance.

## Alternatives Considered

### Consolidating all docs into root README
- **Rejected because**: The project is modular. Keeping per-directory READMEs helps developers focus on specific layers (e.g., schemas vs controllers).

### Using a specialized documentation tool (Docusaurus/JSDoc)
- **Rejected because**: YAGNI. Simple, well-maintained Markdown files in the repo are sufficient for the current team size and provide the fastest access.
