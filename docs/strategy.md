# Strategic Roadmap & Positioning: APEX METHOD
> Internal Alphafoundr document — NOT for client.
> Last updated: April 16, 2026

## 1. Project Overview

**Client:** Alexandre Monteiro (France-based)
**Partner:** Digital 1001 (white-label)
**Brand:** APEX METHOD — digital-first men's transformation platform
**Sub-brand:** Papa Strong — premium coaching for fathers

### What We're Building
An end-to-end digital ecosystem: brand identity + e-commerce website (sales & checkout) + mobile app UX/UI design. Programs are delivered through a **mobile app** backed by Hexfit, not through WordPress.

### What We're NOT Building
- Community platform (Discord/WhatsApp — Alex's team manages)
- Mobile app development (Digital 1001's scope — Flutter + Hexfit API)
- Backend / admin panel (Hexfit dashboard — managed by D1001)
- Video content production (Alex has a separate team — 200+ demo clips + 32 follow-along videos planned)
- PDF redesign (deprioritized — potential future upsell)

---

## 2. Product Architecture

### Two-Platform Model

```
WEBSITE (Alphafoundr builds)              APP (Digital 1001 builds)
─────────────────────────────             ───────────────────────────
• Landing pages per program               • Program delivery (sessions, exercises)
• Assessment quiz → recommendation        • Workout logging & timers
• WooCommerce checkout                    • Nutrition (auto-generated plans)
• Subscription management (My Account)    • Progress tracking & PRs
• Thank-you / onboarding page             • Push notifications
     │                                         │
     └──── WooCommerce webhook ────────→ Hexfit API (user creation)
```

The website is a **sales & checkout engine** — it sells programs and manages billing. The app is the **delivery engine** — it's where users actually train, track nutrition, and progress.

### Payment Models (Both Supported)
- **One-time purchase** — e.g., ORION 90-day program at a fixed price
- **Recurring subscription** — e.g., AMT monthly rolling access
- WooCommerce handles both natively — no custom payment development needed
- All pricing controlled autonomously by Alex

### Programs (Confirmed April 9, 2026)

| Program | Type | Duration | Target | Format |
|---|---|---|---|---|
| **Papa Strong** | Premium 1:1 coaching | 4 months | Men/Dads | 1 video unlocked/week, personalized |
| **LÉO / GRIZZLY** | Short-term intensive | 28 days | Men | 100% bodyweight (home), 30min sessions |
| **ATHENA** | Short-term starter | 28 days | Women | Home focus, resistance bands |
| **ORION** | Long-term structured | 90 days | Men | Gym or Home/Outdoor toggle, 3/4/5 sessions/week |
| **AMT** | Monthly subscription | Monthly | Men/Women | Evolving programs, continuous progression |

### Rollout Strategy
```
Phase A:  Papa Strong + LÉO (28j) + ORION (90j)
Phase B:  ATHENA (28j women's)
Phase C:  Women's 90-day program
Phase D:  AMT monthly subscription
```

### Presentiel (Marrakech)
- Small committee format, Alex keeps it for passion
- Not part of our digital scope
- Future potential: event branding if it grows

---

## 3. Phased Delivery Plan

### Phase 1: Brand Foundation
**Goal:** Lock the visual identity before anything gets designed.

**Brand Identity:**
- **Core APEX METHOD identity** — Logo, typography, color system (black/white/bronze-copper #C4956A)
- **Program sub-identities** — Visual systems for each program universe (ORION, LÉO, ATHENA, Papa Strong, AMT)
- **Brand direction** — Two approaches presented:
  1. Star brand / muted programs
  2. Muted brand / star programs
- **Status:** Alex liked both (*"J'aime beaucoup !!"*) — **awaiting his final choice** to proceed

### Phase 2: Design (Figma)
**Goal:** Complete UX/UI design for both website and mobile app before development starts.

**Website Design (10-12 pages):**
- Home (hero, programs overview, social proof, quiz CTA)
- About (Alex's story, APEX philosophy)
- Program landing pages × 4-5 (ORION, Papa Strong, LÉO, ATHENA, AMT)
- Assessment flow (multi-step quiz → recommendation → CTA)
- Checkout (WooCommerce — one-time + subscription)
- My Account (subscription management, billing, cancel)
- Thank You / Onboarding (app download links, credential delivery)
- Legal / CGV

**Mobile App UX/UI Design (~30-35 screens):**
- Onboarding + Authentication
- Dashboard (today's session, progress summary)
- Program view (weeks/cycles, progress %)
- Session view with exercise details, video demos, workout logging
- Specialized timer UIs (AMRAP, EMOM, TABATA, circuit training)
- Superset / triset grouping
- Format toggle (ORION: Home ↔ Gym)
- Frequency selector (3/4/5 sessions per week)
- Nutrition (calorie calculator, macro tracking, individualized plans, meal scanner, recipe library)
- Progress tracking (weight charts, photos, workout history, PRs)
- Profile & settings
- Push notification states

> **Blocker:** App design is gated on Karim confirming Hexfit API capabilities (6 open questions in `requirements_confirmation.md`).

### Phase 3: Website Development (WordPress)
**Goal:** A live site where users can discover programs, take the assessment quiz, and purchase.

- **Tech:** WordPress + BricksBuilder, LiteSpeed, ACF Pro, WooCommerce
- **Animations:** GSAP 3.15.0 (ScrollTrigger, SplitText, DrawSVGPlugin, ScrollSmoother)
- **Design:** Mobile-first (80%+ traffic from Instagram/TikTok), storytelling-driven, cinematic
- **Calendly:** Embedded on Papa Strong flow for booking first coaching call
- **Assessment Quiz:** Multi-step questionnaire (gender, goal, location, experience, availability) → program recommendation → checkout CTA

### Phase 4: Post-Launch & Retainer
- Ongoing design support for quarterly program launches (new landing pages, program visuals)
- Marketing collateral, social media templates
- PDF redesign (Papa Strong 14-Day Challenge) — upsell when timing is right
- Event branding if presentiel grows
- App V2 features: AI morpho-anatomical analysis (photo-based body scan — confirmed as V2 by Alex)

---

## 4. Scope Boundaries (Alphafoundr vs. Digital 1001)

| Deliverable | Alphafoundr | Digital 1001 |
|---|---|---|
| Brand Identity | ✅ | |
| Website Design (Figma) | ✅ | |
| Website Development (WordPress) | ✅ | |
| Mobile App UX/UI Design (Figma) | ✅ | |
| Mobile App Development (Flutter) | | ✅ |
| Backend (Hexfit / Custom) | | ✅ |
| WooCommerce → Hexfit Integration | | ✅ |
| App Store / Play Store Publishing | | ✅ |

> Figma handoff process with Digital 1001 is already established (AMG Building precedent). No need to discuss formats, exports, or component libraries — it's understood.

---

## 5. Sales Strategy (for Digital 1001)

### Framing
Position this as a **"Digital Ecosystem Build"** — not just a website. Alex is buying the infrastructure to launch programs quarterly for years: brand, website, and app UX all in one package.

### Packaging
1. **Brand Foundation** — Core identity + 5 program sub-identities + brand guidelines
2. **Website Design + Development** — 10-12 page Figma design → WordPress/Bricks build with WooCommerce + assessment quiz + GSAP animations
3. **Mobile App UX/UI Design** — ~30-35 screens covering all V1 features, all states, interactive Figma prototype
4. **Optional Retainer** — Ongoing design support for quarterly launches

### Pricing Approach
- Previous proposal (proposal_v1.md) is **outdated** — based on pre-April-4 scope (included PDF redesign, excluded app design)
- **New proposal needed** reflecting the confirmed scope: brand + website + app UX/UI
- Cross-reference AMG Building V2 rates for consistency
- French client = potentially higher budget expectations, but Alphafoundr delivers at Moroccan market rates
- App UX/UI (~30-35 screens) is a significant addition — price accordingly
- No LMS complexity — programs delivered via Hexfit app, not WordPress

---

## 6. Competitive Positioning

APEX METHOD sits in a sweet spot between:
- **Bodytime** (mass market, one-time programs, separate app subscription — "Train With Me") — Alex's primary inspiration. 4 programs split by gender × location.
- **PapaInShape** (high-ticket 1:1 coaching for dads 40-65, application-based selection) — Papa Strong's competitive space
- **Papa-Alpha** (single coaching method for dads, funnel-based sales, 500+ dads transformed) — direct competitor
- **Juice & Toya** (dual pricing: $14.99/mo subscription + $10-45 one-time programs, app-first) — model for APEX's hybrid pricing

Our job is to give Alex an ecosystem that **looks premium** (Bodytime-level visual quality), **converts efficiently** (Papa-Alpha-level funnel), and **scales independently** (new programs added quarterly without rebuilding anything).

---

## 7. Risks & Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| **Karim's backend confirmation** | Blocks entire app design phase | Follow up — escalate through Naj if needed |
| **Brand direction not chosen** | Blocks identity work → blocks everything downstream | Present Alex with a clear A/B decision frame, deadline |
| **Video content not ready** | Can't populate app or landing pages with real demos | Build/design with placeholder structure, populate when videos drop |
| **Alex's bandwidth** | Decision delays on content details | Batch decisions, send structured voice-note prompts, give clear deadlines |
| **Hexfit API limitations** | May not support dynamic session frequency or auto-nutrition | Plan B: build 3 program variants manually in Hexfit; custom nutrition logic in app |
| **Scope creep from Alex** | New features mid-design | V1 exclusion list is signed off — refer back to it. Frame additions as V2. |

---

## 8. Current Status (April 2026)

| Milestone | Status |
|---|---|
| Brand direction exploration | ✅ Done — shared with Alex |
| Brand direction choice | ⏳ Waiting on Alex |
| Master context documentation | ✅ Done — `context.md` |
| Requirements docs (partner + client) | ✅ Done — shared via Notion + WhatsApp |
| Landing page draft (HTML/CSS/JS) | ✅ Done — bronze palette, GSAP animations |
| Backend confirmation from Karim | 🔴 Blocked — 6 open questions |
| Updated proposal | ❌ Not started — needs new scope pricing |
| Figma: App UX/UI (~30-35 screens) | ❌ Not started — blocked by Karim |
| Figma: Website (10-12 pages) | ❌ Not started — blocked by brand direction |
| WordPress development | ❌ Not started — after Figma approval |
