# APEX METHOD — Agent Instructions

## About This Workspace
This is the working directory for **APEX METHOD** — a digital fitness transformation brand by **Alexandre Monteiro**, focused on structured physical and mental coaching for men and fathers.

### Brand Identity
- **Design System:** ALL agents must strictly follow the tokens in `docs/DESIGN_SYSTEM.md` for colors and typos.
- **Brand Name:** APEX METHOD
- **Meaning:** APEX = The summit. The highest level you can reach.
- **Slogan:** *"Un corps fort. Un mental solide. Une vie maîtrisée."*
- **Color Palette:** See `DESIGN_SYSTEM.md` (Dark #0F0D0B, White #F0ECE4, Bronze Gradients)
- **Typography:** See `DESIGN_SYSTEM.md` (Platform & Aeonik)
- **Positioning:** Premium, structured method for transforming men's body, mind, and life
- **Language:** French (all content and client communication)
- **CEO Mindset:** Alex avoids "Apex Alex" — the brand must stand on its own for scalability

### Partnership Structure
- **Alphafoundr** — White-label design & web dev partner (brand identity, full-stack web platform, mobile app UX/UI design)
- **Digital 1001** — Dev agency partner (mobile app Flutter development, connects to shared Supabase backend, app store publishing)
- **Communication:** WhatsApp group (Alex, Naj from D1001, MTS Concierge, Alphafoundr)
- **White-label:** All deliverables branded to APEX METHOD, never Alphafoundr

## Workspace Structure

```
apex-method/
├── AGENTS.md                          # This file
├── GEMINI.md                          # Gemini CLI context
├── context.md                         # Master client context (pricing, history, decisions)
├── docs/
│   ├── DESIGN_SYSTEM.md               # 3-Tier design token system (Primitives → Semantic → Component)
│   ├── ROADMAP.md                     # Master phased roadmap for the full platform build
│   ├── strategy.md                    # Service packaging & sales strategy
│   ├── proposals/
│   │   ├── proposal_v1.md            # Initial proposal
│   │   └── proposal_3_scenarios.md   # 4-scenario proposal (OUTDATED)
│   ├── requirements/
│   │   ├── requirements_brief.md             # Initial scope brief
│   │   ├── requirements_confirmation.md      # Partner-facing (Karim/D1001)
│   │   └── requirements_confirmation_client.md  # Client-facing (Alex)
│   └── references/
│       ├── APEX METHOD programmes .pdf       # Alex's program structure PDF
│       ├── APEX METHOD.pdf                   # Brand reference
│       ├── CHALLENGE_PAPA_STRONG.pdf         # Papa Strong 14-day challenge PDF
│       └── papa_strong_challenge_text.md     # Extracted text from PDF
├── website/
│   ├── landing-page/                  # Legacy HTML/CSS/GSAP prototype (reference only)
│   │   ├── ARCHITECTURE.md            # Animation rules for the prototype
│   │   ├── index.html
│   │   ├── css/
│   │   └── js/
│   └── next-app/                      # ⭐ PRIMARY — Next.js 15 full-stack platform
│       ├── src/
│       │   ├── app/                   # App Router (pages, layouts, API routes)
│       │   ├── components/            # Reusable UI components
│       │   ├── lib/                   # Supabase client, Stripe helpers, utilities
│       │   └── styles/                # CSS Modules + design system tokens
│       └── supabase/                  # Migrations, seed data, Edge Functions
├── app-design/                        # Mobile app UX/UI (Figma references, specs)
└── brand/                             # Brand identity assets (logos, guidelines)
```

## Programs (Confirmed — April 9, 2026)

| Program | Type | Duration | Target |
|---|---|---|---|
| **Papa Strong** | Premium 1:1 coaching | 4 months | Men/Dads |
| **LÉO / GRIZZLY** | Short-term intensive (Home) | 28 days | Men |
| **ATHENA** | Short-term starter (Home) | 28 days | Women |
| **ORION** | Long-term structured (Gym/Home toggle) | 90 days | Men |
| **AMT** | Monthly rolling subscription | Monthly | Men/Women |

**Rollout:** Papa Strong + 28-day programs → 90-day programs → Women's 90-day → Monthly AMT

## Technical Stack

> **IMPORTANT (April 25, 2026):** WordPress, BricksBuilder, WooCommerce, and Hexfit have been **permanently dropped** from the project. The platform is now a fully custom Next.js + Supabase + Stripe stack. Do NOT reference the old WordPress/WooCommerce/Hexfit stack in any new work.

### Web Platform (Alphafoundr builds)
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Vanilla CSS + CSS Modules (preserving 3-tier design system tokens)
- **Animations:** GSAP 3.15.0 (all plugins free — DrawSVG, SplitText, ScrollSmoother)
- **Forms:** React Hook Form + Zod
- **Hosting:** Vercel (auto-deploy from Git)

### Backend / Infrastructure (Shared between Web + Mobile)
- **Authentication:** Supabase Auth (email/password + OAuth, JWT-based, shared across web and Flutter)
- **Database:** Supabase PostgreSQL (programs, exercises, user progress, purchases)
- **Storage:** Supabase Storage (exercise videos, nutrition PDFs, thumbnails). May migrate to BunnyCDN or dedicated video CDN at scale.
- **Server Logic:** Supabase Edge Functions (Deno) for webhooks and business logic
- **Security:** Row Level Security (RLS) — users only see programs they've purchased

### Payments
- **Provider:** Stripe (Checkout Sessions for one-time, Billing for subscriptions)
- **Customer Portal:** Stripe Customer Portal (self-service subscription management)
- **Webhooks:** Stripe → Next.js API route or Edge Function → Supabase DB
- **Currency:** EUR

### Mobile App (Digital 1001 builds)
- **Framework:** Flutter
- **Backend:** Supabase (same project as web — shared auth, DB, and storage)
- **Auth:** `supabase_flutter` package (same JWT tokens as web)
- **Purchases:** NOT in-app. App deep-links to website for checkout, then returns.
- **Content:** Reads programs, exercises, and videos directly from Supabase

### Design
- **Tool:** Figma
- **Handoff:** Established process with Digital 1001 (no need to discuss in docs)

### ❌ Deprecated Stack (Do NOT use)
- ~~WordPress + BricksBuilder~~ → Replaced by Next.js 15
- ~~WooCommerce~~ → Replaced by Stripe
- ~~Hexfit (MyHexFit)~~ → Replaced by Supabase (custom tables, full control)
- ~~LiteSpeed Cache~~ → Replaced by Vercel Edge + ISR
- ~~WooCommerce → Hexfit webhooks~~ → Replaced by Stripe → Supabase webhooks

## Design Philosophy
- **Award-level storytelling-driven** digital experiences
- Heavy use of GSAP scroll animations, cinematic transitions
- Dark theme with bronze/copper metallic accents
- Mobile-first responsive design is mandatory
- Premium feel — never generic, never basic
- Constellation-inspired naming (ORION, LEO) for visual motifs

## Agent Behavior

### When working on the Next.js web platform:
1. **CRITICAL:** Always use `docs/DESIGN_SYSTEM.md` as the absolute source of truth for UI colors and typographies. Avoid generic colors.
2. **CRITICAL:** The primary codebase is `website/next-app/`. The `website/landing-page/` directory is a legacy HTML prototype for reference only.
3. Use GSAP 3.15.0 with all premium plugins (DrawSVG, SplitText, ScrollSmoother) — wrap in `useEffect` with proper cleanup in React components.
4. Use CSS Modules for component styling, importing design system tokens from a shared CSS variables file.
5. All user-facing content in French.
6. Follow the design philosophy: dark, premium, animated, interactive.
7. Use Supabase client from `lib/supabase.ts` for all data fetching and auth.
8. Never expose Stripe secret keys client-side. All Stripe operations go through API routes.
9. **CRITICAL — GSAP SplitText + Gradient Text:** NEVER use SplitText directly on elements with `background-clip: text` gradients. This breaks the gradient (text becomes invisible). You MUST use the "Revert Pattern": temporarily override to solid color → split and animate → call `split.revert()` onComplete → clear inline styles so CSS gradient restores. See `docs/DESIGN_SYSTEM.md` for the full pattern. Prefer using `shared/SplitTextReveal.tsx` which handles this automatically.
10. **CRITICAL — Italic Clipping:** When using SplitText on italic/display fonts (Platform, Aeonik), ALWAYS set `overflow: visible` on line and char wrappers. NEVER use `overflow: hidden` on SplitText line wrappers — it clips letterform edges.

### When working on documentation:
1. Always check `context.md` first for latest decisions and pricing history
2. Separate partner-facing docs (English, technical) from client-facing docs (French, non-technical)
3. Never mention Alphafoundr in client-facing documents (white-label)
4. Frame features as evolutionary steps, not V1/V2
5. Reference `docs/ROADMAP.md` for the current phase and priorities

### File management:
1. Keep docs organized under `docs/` with clear subdirectories
2. Always update `context.md` when new client decisions emerge
3. Web platform code goes in `website/next-app/`
4. App design specs go in `app-design/`
5. Legacy HTML prototype stays in `website/landing-page/` (read-only reference)

## Open Blockers (Updated April 25, 2026)
1. ~~Is Hexfit confirmed as backend?~~ → **RESOLVED: Hexfit dropped. Using Supabase.**
2. ~~Who handles WooCommerce → Hexfit webhooks?~~ → **RESOLVED: Stripe → Supabase webhooks, handled in Next.js API routes.**
3. Subscription cancellation: immediate or end-of-period? *(Still pending — Stripe supports both)*
4. ~~Can Hexfit handle dynamic session frequency restructuring?~~ → **RESOLVED: Custom Supabase schema handles this natively.**
5. ~~Can Hexfit auto-generate individualized nutrition/recipes?~~ → **RESOLVED: Will be custom logic (V2, AI-powered).**
6. AMRAP/EMOM/TABATA timer UIs — confirm for V1 scope. *(Design dependency — Figma phase)*
7. **NEW:** Video hosting strategy — start with Supabase Storage, evaluate BunnyCDN/Mux at scale.
8. **NEW:** Scope & pricing discussion needed with Alex for the expanded full-stack build.
