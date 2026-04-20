# APEX METHOD — Gemini Context

## Overview
This workspace manages the **APEX METHOD** project — a premium fitness transformation brand by Alexandre Monteiro. It contains documentation, website code, and design specs for a full digital ecosystem (website + mobile app).

## Key Context
- See `AGENTS.md` for full conventions, rules, and technical stack.
- See `context.md` for client relationship history, pricing, and all decisions.
- This is a **mixed workspace** — both business docs and code (website development).

## Partnership
- **Alphafoundr** — White-label design & web dev. All deliverables branded APEX METHOD.
- **Digital 1001** — Dev partner. Builds the Flutter app, manages Hexfit backend.
- All client communication goes through the WhatsApp group.

## Connected Tools
- **Notion MCP** — Synced requirements docs and proposals.
- **Figma MCP** — Access design files when available.

## Working Style
- **CRITICAL (Design):** UI colors, typographies, and gradients MUST strictly follow `docs/DESIGN_SYSTEM.md`. For example: Background is `#0F0D0B` (not regular black), text gradients are specific bronze arrays.
- **CRITICAL (Code):** Website code is in `website/landing-page/`. This directory is **modular**. You MUST refer to `website/landing-page/ARCHITECTURE.md` before making any changes.
- **Animation:** GSAP 3.15.0 with ScrollTrigger, DrawSVG, and SplitText. Follow the "Handover Rule" documented in the architecture map.
- All content in **French**.
- Design: Awwwards-level, cinematic feel.
- Always check `context.md` before making decisions about scope, pricing, or features.

## Current Status (April 2026)
- ✅ Brand identity direction — confirmed (dark + bronze, constellation naming)
- ✅ Program list — confirmed (5 programs, staggered rollout)
- ✅ Requirements docs — shared with Karim (Notion) and Alex (WhatsApp)
- ✅ Landing page draft — built, reviewed, bronze palette applied
- ⬜ Karim's backend confirmation — pending
- ⬜ Figma design phase — blocked by Karim's confirmation
- ⬜ Website development (WordPress/Bricks) — after design approval
