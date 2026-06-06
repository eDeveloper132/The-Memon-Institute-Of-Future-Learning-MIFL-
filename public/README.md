# Frontend Prototypes & UI Components

The `public` directory contains static HTML prototypes and modular Web Components. The system follows a **Custom Elements** architecture that ensures reactivity and high performance without the weight of a traditional framework.

## 🧱 Custom UI Components (`ui-components.ts`)

MIFL uses modern Web Components (custom elements) to ensure UI consistency and strict CSP compliance.

| Component | Usage | Key Attributes |
|-----------|-------|----------------|
| `<ui-navbar>` | Top navigation bar with real-time bell and profile links. | `title` |
| `<ui-card>` | Dashboard statistic or info summary card. | `title`, `value`, `color`, `icon` |
| `<ui-spinner>` | Animated loading indicator for async data fetching. | `text` |
| `<ui-modal>` | Standardized dialog window for forms and alerts. | `id`, `title` |

## 🛡 CSP Compliance

The frontend is built to satisfy a strict **Content Security Policy**:
- **No Inline Scripts:** All logic must reside in script blocks with `type="module"` or external `.js` files.
- **No Inline Handlers:** Do not use `onclick=""` or `onchange=""`. Always use `addEventListener` in the script block.

## 📁 Directory Structure

- **`/auth/`**: Login, Signup, and Password Recovery pages.
- **`/protected/`**: Role-specific dashboards and feature pages.
- **`/uploads/`**: Local cache for recently uploaded files (e.g. chat).
- **`/components/`**: Modular logic for UI elements and auth-related state.

## 🎨 Styling

- **Utility First:** Styled with **Tailwind CSS** via CDN for rapid prototyping.
- **Professional Palette:** Primary colors use Blue-600 for trust and accessibility.
