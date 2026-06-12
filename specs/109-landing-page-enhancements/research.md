# Research: Landing Page Enhancements

## Decision: Animation Library/Approach
**Approach**: Vanilla JS Intersection Observer for "reveal on scroll" combined with Tailwind's utility classes for transitions.

**Rationale**: Avoids adding heavy external libraries like AOS or Framer Motion. Intersection Observer is native, highly performant, and allows for fine-grained control over when animations trigger.

**Alternatives Considered**:
- **AOS.js**: Easy to use but adds another dependency. *Rejected* to keep the landing page as lean as possible.
- **GSAP**: Extremely powerful for complex animations but overkill for simple reveal effects. *Rejected*.

## Decision: Icon System
**Approach**: FontAwesome 6 (already included in `landing.html`).

**Rationale**: Consistency with the existing dashboard and UI components. I will expand the use of FontAwesome to add more descriptive icons to the "About Us" and "Programs" sections.

## Decision: Background Styling
**Approach**: Layered CSS Gradients and SVG Patterns.

**Rationale**: CSS gradients are zero-byte "images" that provide great depth. SVG patterns (like the one already used in the "About Us" section) add texture without significantly increasing page weight. I will add a "Blob" or "Mesh Gradient" effect to the Hero section for a modern look.

## Decision: Hover Effects
**Approach**: Tailwind `transition`, `duration`, `ease-out`, and `hover:` utilities (scale-105, shadow-2xl).

**Rationale**: Simple to implement and highly performant as they leverage CSS transitions.
