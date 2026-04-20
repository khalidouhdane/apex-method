# Landing Page Architecture (AI & Developer Map)

This directory contains the modularized landing page for APEX METHOD.

## 📁 File Map

### 🎨 CSS (`/css`)
*   `base.css`: 3-Tier Design System (Primitives, Semantics, Components). Global resets.
*   `hero.css`: **High Complexity.** Manages the pinned 100vh scene, orbital rings, and stardust layers.
*   `sections.css`: General layout for Program cards, App preview, and the kinetic Brand Divider.
*   `studio.css`: Client feedback UI (Theme switcher).

### ⚙️ JavaScript (`/js`)
*   `config.js`: Centralized constants (`FRAME_COUNT`, `CANVAS_SIZE`) and global `APEX.STATE`.
*   `frame-processor.js`: Chroma Keying logic for the transparent video frames.
*   `animations.js`: **Core Logic.** Contains GSAP timelines.
*   `ui.js`: Independent interactive features (Cursor, Mobile Menu).
*   `main.js`: The orchestrator. Handles the Loader-to-Navbar flight and triggers the sequences.

## ⚠️ Critical Animation Rules

### 1. The Handover Rule
**The Scroll Sequence (`mainTl`) MUST NOT initialize until the Entrance (`entryTl`) is complete.**
*   Initialization happens in `main.js` via `APEX.initLoader()`.
*   `initLoader` calls `initHeroStory` (Entrance).
*   `initHeroStory` calls `initScrollSequence` only on `onComplete`.
*   *Why:* To prevent "jumping" glitches where ScrollTrigger calculates positions before elements are at their starting scale (0.75).

### 2. State Locking
Elements like `.character-wrap` and `.hero-text-block` are "locked" at `opacity: 0` or `scale: 0.6` via GSAP in `main.js` immediately on load. Do not move these to CSS to avoid FOUC (Flash of Unstyled Content).

### 3. Chroma Keying
The `processFrame` function in `frame-processor.js` handles real-time green-screen removal. If updating frames, ensure the green background hex matches the ranges in the logic.

## 🛠 Workflow for AI
When asked to modify a section, only read the relevant module. 
*   **Hero visuals?** -> `css/hero.css` and `js/animations.js`.
*   **New Section?** -> `css/sections.css` and `js/animations.js` (for the reveal logic).
