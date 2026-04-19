# APEX METHOD — Requirements Confirmation
> **For review by**: Karim (Digital 1001)
> **Prepared by**: Alphafoundr — April 4, 2026 (updated April 8)
> **Purpose**: Confirm app features, integration assumptions, and responsibilities before design begins.

---

## 1. Roles & Responsibilities

| | Alphafoundr | Digital 1001 |
|---|---|---|
| **Brand Identity** | ✅ Delivers | |
| **Website Design (Figma)** | ✅ Delivers | |
| **Website Development (WordPress)** | ✅ Delivers | |
| **Mobile App UX/UI Design (Figma)** | ✅ Delivers | |
| **Mobile App Development** | | ✅ Delivers |
| **Backend (Hexfit / Custom)** | | ✅ Manages |
| **WooCommerce → Backend Integration** | | ✅ Builds |
| **App Store / Play Store** | | ✅ Publishes |

---

## 2. Programs

| Program | Type | In App | On Website |
|---|---|---|---|
| **Papa Strong** | 1:1 premium coaching (4 months) | Full program access, 1 video/week | Landing page + checkout |
| **LÉO / GRIZZLY** | 28-day intensive (Home) | Full program, 30min videos | Landing page + checkout |
| **ATHENA** | 28-day women's program (Home) | Full program | Landing page + checkout |
| **ORION** | 90-day structured program | Full program, Home/Gym format toggle | Landing page + checkout |
| **AMT** | Monthly rolling subscription | Monthly rotating programs | Landing page + subscription checkout |

> ORION has two **formats** (Home/Outdoor and Gym) — same program structure, different exercises. Handled as a toggle/tab in the app, not separate products.

> All pricing and product configuration is managed in **WooCommerce** — Alex can adjust prices, create bundles, and manage products autonomously.

---

## 3. Mobile App — Features

### ✅ CONFIRMED — Will Be Designed

| # | Feature | Description |
|---|---|---|
| 1 | **Onboarding** | Welcome screens, value prop, sign up / log in |
| 2 | **Authentication** | Email + password login (credentials from WooCommerce purchase) |
| 3 | **Home / Dashboard** | Today's session, progress summary, quick actions |
| 4 | **Program View** | Active program: weeks/cycles, progress %, sessions completed |
| 5 | **Format Toggle (ORION)** | Switch between Home/Outdoor and Gym (changes exercises, not structure) |
| 6 | **Session Frequency Selector** | 🆕 User chooses 3, 4, or 5 sessions/week — program adapts accordingly |
| 7 | **Session Overview** | Day's workout: exercise list, sets, reps, tempo, rest periods |
| 8 | **Exercise Detail** | Video demo (Alex's own videos), instructions, muscle groups, parameters (reps, sets, tempo, weight, rest, variants) |
| 9 | **Supersets / Bisets / Trisets** | Grouped exercises displayed and tracked together |
| 10 | **Timed Workouts** | 🆕 AMRAP, EMOM, TABATA — specific timer UIs (countdown, round tracking, intervals) |
| 11 | **Circuit Training** | 🆕 4+ exercises in rounds, with round counter and rest timers |
| 12 | **Workout Logging** | Log weights, mark sets completed, rest timers |
| 13 | **Session Flexibility** | Choose which session to start with (legs vs. upper) |
| 14 | **Calorie Calculator** | Daily caloric needs based on body stats + activity level |
| 15 | **Macro Tracking** | Daily protein / carb / fat / calorie log |
| 16 | **Individualized Nutrition** | 🆕 **Auto-generated** nutrition plans based on goal (mass/loss). Includes macros, micros, and exact recipes with Grams/Calories. |
| 17 | **Meal Scanner** | Photo of a meal → AI estimates calories + macros |
| 18 | **Recipe Library** | Meal ideas with ingredients + full macro breakdown |
| 19 | **Metabolism Info** | BMR, TDEE display |
| 20 | **Assessments** | In-app tracking of body stats to update nutrition limits |
| 21 | **Progress — Weight** | Body weight tracking over time (chart) |
| 22 | **Progress — Photos** | Before/after transformation photos with date stamps |
| 23 | **Progress — Workout History** | Past sessions, weights logged, performance trends |
| 24 | **Progress — PRs** | Personal bests per exercise |
| 25 | **Profile / Settings** | User info, body stats, goals, preferences |
| 26 | **Push Notifications** | Session reminders, motivation, new program content |

### ❌ NOT IN V1

| # | Feature | Reason |
|---|---|---|
| 1 | In-app community / chat | Community handled on WhatsApp / Discord |
| 2 | Multi-coach system | Alex is the only coach |
| 3 | In-app video calls | Papa Strong calls via Calendly / Zoom |
| 4 | In-app payments | Purchases on website (WooCommerce) |
| 5 | Native step/activity tracking | Uses phone's health app |
| 6 | Weekly unlockable videos (Papa Strong) | Can be added post-launch |
| 7 | Body measurements tracking | Waist, chest, etc. — V2 feature |
| 8 | **AI Morpho-Anatomical Analysis** | 🆕 Photo-based AI body scan — Alex confirmed this is a **V2 Feature**. |

**→ Alex confirmed**: He agrees with this "Not in V1" list. No additional features needed for launch.

---

## 3.1. Technical Assessment: Dynamic Logic

Alex requested two complex dynamic features for the app. We need to confirm if the backend (Hexfit) can support this via API, or if we need custom logic in the app:

### 1. Dynamic Session Frequency (ORION)
Users choose 3, 4, or 5 sessions per week for the 90-day program.
- **4 to 5 sessions**: The program just adds an extra session to the week.
- **3 sessions**: The program is **completely restructured** (e.g., changes from Push/Pull/Legs to 2 Full Body + 1 Upper).
**→ Karim**: Can Hexfit's API handle dynamic restructuring of a program based on a user's frequency preference, or do we need to build 3 separate program variants in Hexfit and assign the correct one?

### 2. Auto-generated Nutrition
The app must automatically generate personalized daily nutrition goals (macros, micros) and provide tailored recipes with exact grammages and calories based on:
- User's goal (mass gain, fat loss, balance)
- Automatically calculated BMR (Basal Metabolic Rate)
**→ Karim**: Can Hexfit automatically generate and push these personalized nutrition limits and tailored recipes via API, or does this require a separate integration?

---

## 4. Website — Pages

| Page | Description |
|---|---|
| **Home** | Hero, programs overview, social proof, assessment CTA |
| **About** | Alex's story, APEX Method philosophy |
| **Papa Strong** | Landing page — premium 1:1 coaching |
| **ORION** | Landing page — 90-day structured program |
| **AMT Monthly** | Landing page — monthly rolling subscription |
| **ATHENA** | Landing page — women's program |
| **Assessment Flow** | Interactive quiz → recommends a program → CTA |
| **Checkout** | WooCommerce — one-time + subscription payments |
| **My Account** | WooCommerce My Account — manage subscriptions, billing, cancel |
| **Thank You / Onboarding** | Post-purchase: app download links, credential delivery |
| **Legal / CGV** | Terms, privacy, refund policy |

### Assessment Flow
Multi-step questionnaire that guides visitors to the right program:
- Goal (fat loss / muscle / fitness)
- Training location (home / gym)
- Experience level
- Gender
- Commitment level

Outputs a program recommendation with direct CTA to checkout.

### Calendly (Papa Strong)
After Papa Strong purchase, onboarding includes an embedded Calendly widget (styled to match the site) for booking the first coaching call. Alex manages his Calendly independently.

### Subscription Management
All subscription billing, cancellation, and account management happens through **WooCommerce My Account** on the website. Users are redirected there from the app for any billing-related actions.

---

## 5. Backend & Integration

### Hexfit (MyHexFit) — Confirmed Capabilities

We researched Hexfit to confirm it supports the APEX Method's specific needs:

| Requirement | Hexfit Support |
|---|---|
| **Custom exercise creation** | ✅ Alex can create his own exercises from scratch |
| **Upload own videos** | ✅ Upload .mp4/.gif directly, or link YouTube/Vimeo URLs |
| **Build custom programs** | ✅ Full program builder: sets, reps, tempo, weight, rest, circuits |
| **Create program templates** | ✅ Save + duplicate + modify for different clients/months |
| **Monthly program rotation (AMT)** | ✅ Create new programs monthly, assign to subscribers |
| **Client management** | ✅ Track subscribers, progress, health data |
| **Nutrition tools** | ✅ Built-in calorie + nutrition plan features |
| **API access** | ✅ API available for integrations (Zapier compatible) |
| **White-label / branding** | ✅ Custom logo, colors, app icon — but limited UX customization |

> Hexfit is **not just a pre-made exercise library** — Alex can upload ALL his own content (videos, exercises, programs) and manage everything from the Hexfit dashboard. The 9,000+ library is a bonus, not the constraint.

### Integration Architecture

```
PURCHASE FLOW:
──────────────
Website (WordPress/WooCommerce)       Backend (Hexfit)            App (Flutter)
       │                                  │                          │
  1. User browses programs                │                          │
  2. Assessment flow (optional)           │                          │
  3. Checkout (WooCommerce)               │                          │
       │                                  │                          │
  4. Payment confirmed ──────────→  5. API creates user              │
       │                            account in Hexfit                │
       │                                  │                          │
  6. Email with login credentials ────────┼─────────────────→  7. User logs in
       │                                  │                          │
  8. Thank-you page:                      │                    8. App loads
     - App download links                 │                       user's program
     - "Check your email"                 │                       from Hexfit API
       │                                  │                          │
                                          │                          │
  SUBSCRIPTION MANAGEMENT:                │                          │
  ────────────────────────                │                          │
  User → WooCommerce My Account           │                          │
  (cancel, update billing, etc.)  ──→  Webhook updates              │
                                     Hexfit access status    ──→  Access revoked
```

### What Alphafoundr Builds
- Website, WooCommerce checkout, email templates, My Account pages, thank-you/onboarding page

### What Digital 1001 Builds
- WooCommerce → Hexfit API integration (webhooks, user creation)
- Flutter app connected to Hexfit API
- Subscription status sync (WooCommerce ↔ Hexfit ↔ App)

**→ Karim, please confirm**:
1. **Is Hexfit confirmed as the backend?** If not, what's the alternative?
2. **Has the team evaluated Hexfit's API?** Specifically: does it expose program structures, exercises, and user progress data in a way that the Flutter app can consume?
3. **WooCommerce → Hexfit integration**: Will Digital 1001 handle the webhook that creates user accounts when a purchase is made?
4. **Subscription cancellation flow**: When a user cancels AMT via WooCommerce My Account, should their app access be revoked immediately or at the end of the billing period?

---

## 6. Open Questions

### Must Confirm Before Design Starts

| # | Question | For | Status |
|---|---|---|---|
| 1 | Is Hexfit confirmed as backend? API evaluated? | Karim | ⬜ Pending |
| 2 | Who handles WooCommerce → Backend webhooks? | Karim | ⬜ Pending |
| 3 | Subscription cancellation: immediate or end-of-period? | Karim | ⬜ Pending |
| 4 | Can Hexfit handle the dynamic session frequency logic? | Karim | ⬜ Pending |
| 5 | Can Hexfit auto-generate the individualized nutrition / recipes? | Karim | ⬜ Pending |
| 6 | AMRAP/EMOM/TABATA specific UIs required. Supported by backend? | Karim | ⬜ Pending |

### Resolved with Client ✅ (No Action Needed)
- **V1 Exclusions**: Client agreed to the "Not in V1" list.
- **AI Morpho-Analysis**: Client confirmed photo AI analysis is a V2 feature.
- **Videos**: Client shooting 200+ demo videos and 32 full 30-min follow-along videos.
- **Quiz Constraints**: Logic mapped out.

---

*This document serves as a shared reference between Alphafoundr and Digital 1001. Once confirmed, we proceed to the design phase.*
*Last updated: April 8, 2026*
