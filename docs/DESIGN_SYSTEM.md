# APEX METHOD — Design System

This document serves as the master **Figma-driven Design System** reference for all AI agents and developers working on the APEX METHOD ecosystem.

## 1. CSS Custom Properties (:root) Stack

### Surface & Canvas
*   `--surface-base`: `#0F0D0B` (Primary Background)
*   `--surface-raised`: `#1A1614` (Cards, Stat blocks, Modules)
*   `--surface-floating`: `rgba(26, 22, 20, 0.85)` (Navbar with backdrop-blur support)

### Borders & Dividing Lines
*   `--border-dim`: `#1D1815` (Subtle structural borders)
*   `--border-subtle`: `#2A231E` (Component structural borders)

### Base Typography Extents
*   `--text-primary`: `rgba(255, 255, 255, 0.9)` (Off-white vs pure white to eliminate harsh contrast)
*   `--text-dim`: `#A8A49C` (Secondary paragraphs and stats)
*   `--text-muted`: `#6B6762` (Micro-copy, labels, and metadata)

### The "Apex Bronze" System
Do NOT use generic gold hues (e.g. #C4956A). Rely strictly on these semantic scales.
*   `--bronze-base`: `#CC8E66` (Primary accent hue, solid interactions)
*   `--bronze-light`: `#E6B599` (Hover states)
*   `--bronze-dark`: `#A66840` (Active states)
*   `--bronze-glow-soft`: `rgba(204, 142, 102, 0.08)` (Background glows for pills and cards)
*   `--bronze-glow-strong`: `rgba(204, 142, 102, 0.2)` (Hover borders, pronounced halos)

### Premium Gradients
*   `--bronze-gradient`: `linear-gradient(90deg, #C07133 0%, #D1935B 100%)` (Used for text highlights and primary typographic emphasis)
*   `--cta-gradient`: `linear-gradient(90deg, #98572A 0%, #CA783F 50%, #70401F 100%)` (Used strictly for Call To Action buttons)

## 2. Typography Rules
*   **Headlines & Display:** `Platform`
    *   Variables: `var(--font-display)`
    *   Weight: Bold (700) or Regular (400).
    *   Style: Must be `font-style: italic` with GSAP `padding` / `margin` rendering corrections when coupled with `webkit-background-clip: text`!
    *   Letter-spacing: `-0.02em` (-2%).
    *   Line-Height: `1.2em`.
    *   Max Size (Hero): `56px`.
*   **Body, CTAs & UI Labels:** `Aeonik`
    *   Variables: `var(--font-sans)`
    *   Weight: Medium (500) or Regular (400).
    *   Line-Height: `1.2em` to `1.6em` depending on context.

*(Note: Webfonts `Platform.woff2` and `Aeonik.otf` are physically located in `/assets/fonts/` and tethered via native `@font-face` bindings at the top of the CSS file!)*

## 3. Spacing & Geometry
*   Hero text pills must sit completely centered above the headlines directly via `.phase-text` Flexbox column layouts.
*   Pill Radiuses: Defined natively as `var(--radius-xl)` (`28px` base scaling).
*   The primary mobile/desktop scaling locks `transform-origin` behaviors to the bottom for any heroic imagery to avoid scaling clipping (Currently scaling from `0.75` to `0.85` dynamically against GSAP anchors).

## 4. Agent Instructions
*   Whenever assigning colors or fonts in CSS/Flutter, **MUST** refer to this sheet to avoid generic colors mapping to `#000000` or `#C4956A` directly, opting instead for the strict `var(--surface-)` and `var(--bronze-)` maps.
*   **NEVER Hardcode Hues.**
*   **ALWAYS Apply Fallbacks** if a layout element requires an esoteric external render pass.
