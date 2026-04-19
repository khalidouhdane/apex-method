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
- **Alphafoundr** — White-label design & web dev partner (brand identity, website design + build, mobile app UX/UI design)
- **Digital 1001** — Dev agency partner (mobile app Flutter development, backend Hexfit integration, app store publishing)
- **Communication:** WhatsApp group (Alex, Naj from D1001, MTS Concierge, Alphafoundr)
- **White-label:** All deliverables branded to APEX METHOD, never Alphafoundr

## Workspace Structure

```
apex-method/
├── AGENTS.md                          # This file
├── GEMINI.md                          # Gemini CLI context
├── context.md                         # Master client context (pricing, history, decisions)
├── docs/
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
│   └── landing-page/                  # Awwwards-level landing page draft
│       ├── index.html
│       ├── style.css
│       └── script.js
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

### Website (Alphafoundr builds)
- **CMS:** WordPress + BricksBuilder
- **E-commerce:** WooCommerce (one-time + subscriptions)
- **Hosting:** LiteSpeed-compatible
- **Animations:** GSAP 3.15.0 (all plugins free — DrawSVG, SplitText, ScrollSmoother)
- **Performance:** LiteSpeed Cache, lazy loading, WebP images

### Mobile App (Digital 1001 builds)
- **Framework:** Flutter
- **Backend:** Hexfit (MyHexFit) API
- **Integration:** WooCommerce → Hexfit webhooks for user creation

### Design
- **Tool:** Figma
- **Handoff:** Established process with Digital 1001 (no need to discuss in docs)

## Design Philosophy
- **Award-level storytelling-driven** digital experiences
- Heavy use of GSAP scroll animations, cinematic transitions
- Dark theme with bronze/copper metallic accents
- Mobile-first responsive design is mandatory
- Premium feel — never generic, never basic
- Constellation-inspired naming (ORION, LEO) for visual motifs

## Agent Behavior

### When working on website/landing pages:
1. **CRITICAL:** Always use `docs/DESIGN_SYSTEM.md` as the absolute source of truth for UI colors and typographies. Avoid generic colors.
2. Use GSAP 3.15.0 with all premium plugins (DrawSVG, SplitText, ScrollSmoother).
3. SplitText with subtle stagger for text reveal animations.
4. All content in French.
5. Follow the design philosophy: dark, premium, animated, interactive.

### When working on documentation:
1. Always check `context.md` first for latest decisions and pricing history
2. Separate partner-facing docs (English, technical) from client-facing docs (French, non-technical)
3. Never mention Alphafoundr in client-facing documents (white-label)
4. Frame features as evolutionary steps, not V1/V2

### File management:
1. Keep docs organized under `docs/` with clear subdirectories
2. Always update `context.md` when new client decisions emerge
3. Landing page files go in `website/landing-page/`
4. App design specs go in `app-design/`

## Open Blockers (Pending from Karim / Digital 1001)
1. Is Hexfit confirmed as backend? API evaluated?
2. Who handles WooCommerce → Hexfit webhooks?
3. Subscription cancellation: immediate or end-of-period?
4. Can Hexfit handle dynamic session frequency restructuring?
5. Can Hexfit auto-generate individualized nutrition/recipes?
6. AMRAP/EMOM/TABATA timer UIs — supported by backend?
