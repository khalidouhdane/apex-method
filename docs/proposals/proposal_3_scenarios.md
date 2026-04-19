# APEX METHOD — Commercial Proposal (4 Scenarios × 2 Tiers)
> Internal document Alphafoundr × Digital 1001 — For strategic discussion with Karim before client meeting.

---

## Context

Alexandre wants to launch **APEX METHOD** — a digital fitness platform for men. Karim shared the **TWM (Train With Me)** app by Bodytime as reference. Key question: **does he want that level of app as a website? a mobile app? or both?**

This document proposes **4 scenarios** with **2 tiers** each (Standard and Premium) to frame the meeting based on budget and priorities.

---

## How to Read This Document

### 4 Scenarios = Functionality Levels
Each scenario adds capabilities. From simplest to most complete.

### 2 Tiers Per Scenario = Experience Quality

| | Standard | Premium |
|---|---|---|
| **Design** | Figma-designed, clean, professional | Figma-designed + GSAP motion + storytelling |
| **Animations** | None or minimal | GSAP scroll-triggered, page transitions, micro-interactions |
| **Landing Pages** | Conversion-focused, well-designed | Cinematic, narrative-driven, competition-level |
| **Positioning** | "Looks great, works perfectly" | "Wow, this is Bodytime-level" |

### Included in ALL Scenarios
- ✅ **Brand Identity** — Logo, color system, typography, brand guidelines (black/white/gold-copper) + program sub-identities (ORION, LEO, Papa Strong logo adaptations) — **$350 total**
- ✅ **WooCommerce** — One-time purchases + recurring subscriptions
- ✅ **Responsive mobile-first** — 80%+ traffic from social media
- ✅ **3 months of technical support** post-launch
- ✅ **Training videos** (Loom) for autonomous site management
- ✅ **Technical SEO** (meta tags, sitemap, heading structure)
- ✅ **Performance optimization** (caching, lazy loading, image compression)

### Papa Strong — Out of Technical Scope
Offline **1-on-1 coaching**. We deliver 1 sales landing page + contact form. All interactions and payments happen offline.

---

## Scenario 1: Template Express
> *"Launch fast, validate the market"*

### Concept
Site built with **Elementor + pre-made fitness templates**, customized to APEX METHOD's branding and content. Classic LMS (LearnDash/Tutor) for video courses. Fast build, minimal budget.

### What the Client Gets

| Component | Detail |
|---|---|
| **Showcase site** | Home, Programs, Papa Strong, About, Contact |
| **Program pages** | ORION (Home/Gym), LEO (Home/Gym) — template sales pages |
| **Members area** | Client dashboard, access to purchased courses |
| **Video courses** | Modules/lessons, embedded videos, basic progress tracking |
| **E-commerce** | WooCommerce — one-time + recurring subscriptions |
| **Stack** | WordPress + Elementor + WooCommerce + LMS plugin |

### Limitations
- ❌ Template design (not unique, no storytelling)
- ❌ No detailed exercise tracking (sets, reps, weights)
- ❌ No recipes/macros
- ❌ No mobile app

### Investment

| Item | Standard | Premium |
|---|---|---|
| Brand identity + sub-identities | $350 | $350 |
| WordPress site (5-6 pages, Elementor template) | $1,000 | — |
| WordPress site (5-6 pages, template + custom design + animations) | — | $1,750 |
| Papa Strong landing page | $300 | $400 |
| LMS + WooCommerce | Included | Included |
| Program pages (×3) | Included | Included |
| | | |
| **Total** | **$1,650** | **$2,500** |
| **MAD** | **~16,500 MAD** | **~25,000 MAD** |

### Timeline
- Standard: **3-4 weeks**
- Premium: **4-5 weeks**

---

## Scenario 2: Custom LMS Website
> *"The fitness Coursera, properly built"*

### Concept
WordPress site built with **BricksBuilder**, Figma-designed. Clean custom design, not templates. LMS for video courses. This is the model 90% of French fitness coaches use: a site + videos behind a paywall.

### What the Client Gets (on top of Scenario 1)

| Component | Detail |
|---|---|
| **Everything in Scenario 1** | ✅ |
| **BricksBuilder site** | Custom build (no templates), ACF Pro, LiteSpeed |
| **More pages** | 6-8 pages, fuller architecture |
| **Dedicated landing pages** | Per-program sales pages, Figma-designed |
| **Resources** | Downloadable PDFs, exercise sheets |

### Investment

| Item | Standard | Premium |
|---|---|---|
| Brand identity + sub-identities | $350 | $350 |
| WordPress site (6-8 pages, BricksBuilder, Figma) | $2,000 | $2,800 |
| Program landing pages (×3, Figma) | $1,350 | $1,800 |
| Papa Strong landing page | $500 | $550 |
| | | |
| **Total** | **$4,200** | **$5,500** |
| **MAD** | **~42,000 MAD** | **~55,000 MAD** |

> Standard = Figma-designed, clean custom build. Premium = same Figma design + GSAP scroll animations, page transitions, and awards-level storytelling.

### Timeline
- Standard: **5-6 weeks**
- Premium: **7-8 weeks**

---

## Scenario 3: Website + Advanced Fitness Platform
> *"TWM in a browser"*

### Concept
Same WordPress base for the showcase, but instead of a generic LMS, we build a **custom fitness experience**: structured sessions, exercises with sets/reps, progress tracking, recipes with macros — all **in the browser** via a mobile-first web interface.

### Why Not a WordPress Fitness Plugin?

| Plugin | Verdict |
|---|---|
| **WPGYM** | Built for physical gym management, not online programs. Questionable support. ❌ |
| **WM Workout Manager** | Too basic, no interactivity. ❌ |
| **CF Whiteboard** | CrossFit niche only. ❌ |
| **Gym Builder** | Scheduling only. ❌ |

**No plugin does what TWM does → custom development required.**

### What the Client Gets (on top of Scenario 2)

| Component | Detail |
|---|---|
| **Everything in Scenario 2** | ✅ |
| **Fitness dashboard** | Monthly session view, progress tracking |
| **Structured sessions** | Exercises with sets, reps, time, estimated calories |
| **Detailed exercises** | Demo video + instructions + parameters |
| **Progress tracking** | History, % completion, monthly stats |
| **Recipes + macros** | Proteins, carbs, fats, calories |
| **PWA-ready** | Installable from mobile browser |

### Tech Stack
- WordPress + BricksBuilder (showcase)
- **React/Next.js** (fitness member area, subdomain `app.apexmethod.com`)
- WooCommerce (payments)
- REST API (sync purchases ↔ program access)

### Limitations
- ❌ Not in the App Store / Play Store
- ❌ Limited push notifications (PWA)
- ❌ No wearable integration

### Investment

| Item | Standard | Premium |
|---|---|---|
| Brand identity + sub-identities | $350 | $350 |
| WordPress site (6-8 pages, BricksBuilder, Figma) | $2,000 | $2,800 |
| Program landing pages (×3, Figma) | $1,350 | $1,800 |
| Papa Strong landing page | $500 | $550 |
| UX/UI fitness platform (~18 screens) | $900 | $1,400 |
| Custom development (React/Next.js) | $3,500 | $3,500 |
| Recipes + macros | $500 | $500 |
| PWA + WooCommerce API | $400 | $400 |
| | | |
| **Total** | **$9,500** | **$11,300** |
| **MAD** | **~95,000 MAD** | **~113,000 MAD** |

> Premium upgrades both the website (GSAP + storytelling) and the fitness platform UX (motion design, transitions, micro-interactions on dashboards and sessions).

### Timeline
- Standard: **10-12 weeks**
- Premium: **11-13 weeks**

---

## Scenario 4: Website + Dedicated Mobile App
> *"The real APEX METHOD TWM"*

### Concept
The WordPress site handles the **showcase and sales**. Once subscribed, the client gets a login for the **APEX METHOD mobile app** (iOS + Android) with the full experience.

### The Bodytime Model
- **bodytime.fr** = e-commerce site (purchase)
- **TWM app** = mobile app (delivery + tracking)
- Connected: you buy on the site, you access the app

### What the Client Gets (on top of Scenario 2)

| Component | Detail |
|---|---|
| **Full WordPress site** | Showcase + landing pages + WooCommerce |
| **APEX METHOD mobile app** | iOS + Android (Flutter) |
| **App UX/UI design** | ~25 screens designed in Figma |
| **Fitness dashboard** | Sessions, progress %, calories, time |
| **Structured programs** | Sessions, exercises, sets, reps, SuperSets |
| **Recipes with macros** | Categories, filters, detailed macros |
| **User profile** | Personal stats, history, goals |
| **Push notifications** | Session reminders, motivation, new programs |
| **Authentication** | Login linked to WooCommerce account |

### Our Approach: AI-Assisted Development
1. **Premium design** — Every screen in Figma (our expertise)
2. **AI-assisted development** — Flutter + Cursor/Windsurf (vibe coding)
3. **Production audit** — Code review to ensure it's production-ready
4. **Lightweight backend** — Supabase/Firebase, synced with WooCommerce

Same result as a $50K+ traditional dev project, at a competitive price.

### Investment

| Item | Standard | Premium |
|---|---|---|
| Brand identity + sub-identities | $350 | $350 |
| WordPress site (6-8 pages, BricksBuilder, Figma) | $2,000 | $2,800 |
| Program landing pages (×3, Figma) | $1,350 | $1,800 |
| Papa Strong landing page | $500 | $550 |
| UX/UI mobile app (~25 screens, Figma) | $1,300 | $2,200 |
| Flutter development (iOS + Android) | $4,500 | $4,500 |
| Backend (Supabase/Firebase) + API | $1,000 | $1,000 |
| WooCommerce ↔ App integration | $600 | $600 |
| App Store + Play Store publishing | $200 | $200 |
| Production audit | $700 | $700 |
| | | |
| **Total** | **$12,500** | **$14,700** |
| **MAD** | **~125,000 MAD** | **~147,000 MAD** |

> Premium upgrades both the website (GSAP + storytelling) and the app UX/UI (premium motion design, polished transitions, micro-interactions throughout).

### Timeline
- Standard: **14-16 weeks**
- Premium: **15-17 weeks**

---

## Global Comparison

### Pricing Overview

| | Sc. 1 | Sc. 2 | Sc. 3 | Sc. 4 |
|---|---|---|---|---|
| **Name** | Template Express | Custom LMS | Fitness Web | Site + App |
| **Standard** | **$1,650** | **$4,200** | **$9,500** | **$12,500** |
| **MAD** | ~16,500 | ~42,000 | ~95,000 | ~125,000 |
| **Premium** | **$2,500** | **$5,500** | **$11,300** | **$14,700** |
| **MAD** | ~25,000 | ~55,000 | ~113,000 | ~147,000 |
| **Premium uplift** | +$850 | +$1,300 | +$1,800 | +$2,200 |
| **Timeline (Std)** | 3-4 wks | 5-6 wks | 10-12 wks | 14-16 wks |
| **Timeline (Prm)** | 4-5 wks | 7-8 wks | 11-13 wks | 15-17 wks |

### Feature Comparison

| Feature | Sc. 1 | Sc. 2 | Sc. 3 | Sc. 4 |
|---|---|---|---|---|
| Branding | ✅ | ✅ | ✅ | ✅ |
| WooCommerce (one-time + sub) | ✅ | ✅ | ✅ | ✅ |
| Papa Strong landing | ✅ | ✅ | ✅ | ✅ |
| Video courses (LMS) | ✅ | ✅ | ✅ | ✅ In-app |
| Sales pages | Template | Figma custom | Figma custom | Figma custom |
| Structured fitness sessions | ❌ | ❌ | ✅ Web | ✅ App |
| Sets / Reps / Weight tracking | ❌ | ❌ | ✅ | ✅ |
| Recipes + macros | ❌ | ❌ | ✅ | ✅ |
| Advanced progress dashboard | ❌ | ❌ | ✅ | ✅ |
| Push notifications | ❌ | ❌ | ⚠️ PWA | ✅ Native |
| App Store / Play Store | ❌ | ❌ | ❌ | ✅ |

### What Premium Adds (same across all scenarios)

| | Standard | Premium |
|---|---|---|
| **Design** | Figma-designed, clean | Figma-designed + GSAP motion + storytelling |
| **Animations** | None | GSAP scroll-triggered, transitions, micro-interactions |
| **Landing pages** | Well-designed, conversion-focused | Cinematic, narrative-driven, awards-level |
| **Feel** | Professional | Competition-level |
| **Average uplift** | — | **+$850 to $2,200** |

---

## Strategic Recommendation

### Tight budget / Fast launch → **Scenario 1 Standard ($1,650)**
Launch in 3-4 weeks with a functional template site. Alexandre starts selling, validates his market, and we evolve from there. Premium ($2,500) adds custom design touches and basic animations.

### Medium budget / Pro site → **Scenario 2 ($4,200 – $5,500)**
The sweet spot. A Figma-designed WordPress site that 90% of French fitness coaches use. Premium adds the "wow factor" with GSAP animations.

### Client wants TWM but no app → **Scenario 3 ($9,500 – $11,300)**
80% of the TWM experience in the browser. Standard is functional, Premium makes it extraordinary.

### Client wants the real TWM → **Scenario 4 ($12,500 – $14,700)**
The aspirational offer. Thanks to AI-assisted development, we deliver a real Flutter app at an unbeatable price.

### Our Recommendation
**Scenario 2 Standard as the ideal starting point ($4,200 / ~42,000 MAD).** It's a Figma-designed custom site that does the job properly. If there's appetite for motion, the Premium upgrade is +$1,300. The mobile app (Scenario 4) can always be planned as Phase 2.

---

## Meeting Questions for Karim

1. **Client budget** — What range does Alexandre have in mind? We have options from 16,500 MAD to 147,000 MAD.
2. **The TWM reference** — Does he want *literally that* or just "an experience like that"?
3. **Launch priority** — Fast (Scenario 1-2) or feature-complete (Scenarios 3-4)?
4. **Video content** — Are the exercise demo videos ready or in production?
5. **Art direction** — Has he chosen between dominant brand vs. dominant programs?

---

## Payment Terms (Standard Alphafoundr)

- **50% on signature** — To start the project
- **25% on design delivery** — After Figma mockup validation
- **25% on launch** — After final delivery and production deployment

---

*Prepared by Alphafoundr — April 2026*
*Internal use only for Digital 1001. Do not share with client as-is.*
