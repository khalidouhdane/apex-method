# APEX METHOD — Gemini Context

## Overview
This workspace manages the **APEX METHOD** project — a premium fitness transformation brand by Alexandre Monteiro. It contains documentation, website code, and design specs for a full digital ecosystem (website platform + mobile app) built on a modern, fully custom stack.

## Key Context
- See `AGENTS.md` for full conventions, rules, and technical stack.
- See `context.md` for client relationship history, pricing, and all decisions.
- See `docs/ROADMAP.md` for the master phased implementation plan.
- This is a **full-stack web platform** workspace — business docs + Next.js codebase.

## Partnership
- **Alphafoundr** — White-label design & web dev. All deliverables branded APEX METHOD.
- **Digital 1001** — Dev partner. Builds the Flutter app, connects to shared Supabase backend.
- All client communication goes through the WhatsApp group.

## Connected Tools
- **Notion MCP** — Synced requirements docs and proposals.
- **Figma MCP** — Access design files when available.

## Technical Stack (Updated April 25, 2026)
- **Frontend:** Next.js 15 (App Router) + TypeScript + CSS Modules
- **Auth:** Supabase Auth (JWT, shared between web + Flutter mobile app)
- **Database:** Supabase PostgreSQL (programs, exercises, purchases, progress)
- **Storage:** Supabase Storage (videos, PDFs, images) — will evaluate BunnyCDN at scale
- **Payments:** Stripe (Checkout + Billing for subscriptions)
- **Animations:** GSAP 3.15.0 with ScrollTrigger, DrawSVG, SplitText
- **Hosting:** Vercel (web), Supabase Cloud (backend)

> **DROPPED:** WordPress, BricksBuilder, WooCommerce, Hexfit, LiteSpeed. These are no longer part of the project. Do NOT reference them in new work.

## Working Style
- **CRITICAL (Design):** UI colors, typographies, and gradients MUST strictly follow `docs/DESIGN_SYSTEM.md`. Background is `#0F0D0B` (not regular black), text gradients are specific bronze arrays.
- **CRITICAL (Code):** Primary codebase is `website/next-app/`. The `website/landing-page/` directory is a legacy HTML prototype — reference only, do not modify.
- **CRITICAL (Auth):** Supabase Auth is the single source of truth for user identity across web AND mobile. Never implement a separate auth system.
- **CRITICAL (Payments):** All purchases happen on the web via Stripe. The mobile app never handles payments — it deep-links to the website.
- All content in **French**.
- Design: Awwwards-level, cinematic feel.
- Always check `context.md` before making decisions about scope, pricing, or features.

## Current Status (April 25, 2026)
- ✅ Brand identity direction — confirmed (dark + bronze, constellation naming)
- ✅ Program list — confirmed (5 programs, staggered rollout)
- ✅ Requirements docs — shared with Karim (Notion) and Alex (WhatsApp)
- ✅ Landing page HTML prototype — built, reviewed, bronze palette applied
- ✅ Tech stack decision — Next.js + Supabase + Stripe (WordPress/Hexfit dropped)
- ✅ Master roadmap — created (`docs/ROADMAP.md`)
- 🔄 Phase 1: Next.js project initialization + landing page migration — starting
- ⬜ Supabase project setup — pending
- ⬜ Figma design phase — blocked by Karim's confirmation
- ⬜ Scope & pricing discussion with Alex — pending
