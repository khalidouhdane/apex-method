# APEX METHOD — Master Roadmap

> **Created:** April 25, 2026
> **Stack:** Next.js 15 + Supabase + Stripe + Vercel
> **Last Updated:** April 25, 2026

This is the master phased roadmap for building the APEX METHOD digital platform. Each phase is a self-contained milestone that can be tackled independently.

---

## Phase Overview

| Phase | Name | Status | Estimated Duration | Dependencies |
|---|---|---|---|---|
| **1** | Foundation & Migration | ✅ Completed | 1–2 weeks | None |
| **2** | Authentication & Profiles | 🔄 In Progress | 1 week | Phase 1 |
| **3** | E-Commerce & Payments | ⬜ Not Started | 1–2 weeks | Phase 2 |
| **4** | Program Viewer & Dashboard | ⬜ Not Started | 2 weeks | Phase 3 |
| **5** | Content Pipeline & Launch | ⬜ Not Started | 1–2 weeks | Phase 4 |
| **6** | Admin Panel | ⬜ Not Started | 2 weeks | Phase 5 |
| **7** | Mobile Integration | ⬜ Not Started | Ongoing | Phase 2 (min) |
| **8** | V2 Features | ⬜ Not Started | TBD | Phase 5 |

---

## Phase 1: Foundation & Migration
**Goal:** Get the Next.js project running with the existing landing page migrated from HTML/CSS.

### Tasks
- [x] Initialize Next.js 15 project (App Router, TypeScript, CSS Modules)
- [x] Set up project structure (`app/`, `components/`, `lib/`, `styles/`)
- [x] Migrate 3-tier design system tokens to CSS custom properties file
- [x] Migrate landing page sections from static HTML to React components
  - [x] Hero section (video/canvas + orbital rings + GSAP)
  - [x] Programs section (cards, filter slider)
  - [x] App preview section
  - [x] Brand divider (kinetic)
  - [x] Footer
- [x] Set up GSAP in React (useEffect wrappers, cleanup, ScrollTrigger)
- [x] Configure Vercel deployment (auto-deploy from Git)
- [x] Set up environment variables structure (`.env.local`)
- [x] SEO setup (meta tags, OG images, sitemap generation)

### Deliverable
> A fully functional Next.js landing page at `apexmethod.fr` that is visually identical to the HTML prototype, with all GSAP animations working.

---

## Phase 2: Authentication & Profiles
**Goal:** Users can create accounts, log in, and manage their profiles. Auth is shared with mobile.

### Tasks
- [ ] Create Supabase project
- [ ] Configure Supabase Auth (email/password provider)
- [ ] Set up Supabase client in Next.js (`lib/supabase.ts` — browser + server)
- [ ] Build auth pages:
  - [ ] `/connexion` — Login (email + password)
  - [ ] `/inscription` — Register (email + password + name)
  - [ ] `/reset` — Password reset
- [ ] Build auth middleware (protect dashboard routes)
- [ ] Create `profiles` table (extends `auth.users`) with trigger
- [ ] Build profile settings page (`/profil`)
- [ ] Set up Row Level Security policies for `profiles`
- [ ] Configure email templates (welcome, verification, password reset) — in French
- [ ] Document Supabase project credentials for Digital 1001 (Flutter integration)

### Deliverable
> Users can sign up, log in, reset passwords, and edit their profile. The same credentials work in the Flutter app via `supabase_flutter`.

---

## Phase 3: E-Commerce & Payments
**Goal:** Users can purchase programs (one-time) and subscribe (monthly) via Stripe.

### Tasks
- [ ] Set up Stripe account (EUR, French locale)
- [ ] Create Stripe Products & Prices for each program
- [ ] Build program catalog page (`/programmes`) — SSR for SEO
- [ ] Build individual program pages (`/programmes/[slug]`) — SSR for SEO
- [ ] Implement Stripe Checkout flow:
  - [ ] API route: `POST /api/checkout` — creates Checkout Session
  - [ ] Success page: `/checkout/success`
  - [ ] Cancel page: `/checkout/cancel`
- [ ] Implement Stripe Webhook handler:
  - [ ] API route: `POST /api/webhooks/stripe`
  - [ ] Handle `checkout.session.completed` → insert into `user_purchases`
  - [ ] Handle `customer.subscription.updated` → update status
  - [ ] Handle `customer.subscription.deleted` → deactivate access
- [ ] Create `user_purchases` table with RLS policies
- [ ] Create `programs` table (slug, name, description, stripe_price_id, etc.)
- [ ] Build subscription management page (`/abonnement`) — links to Stripe Customer Portal
- [ ] Seed database with program metadata

### Deliverable
> Users can browse programs, purchase via Stripe Checkout, and manage subscriptions via Stripe Customer Portal. Purchases are recorded in Supabase.

---

## Phase 4: Program Viewer & Dashboard
**Goal:** Purchased users can view program content — sessions, exercises, videos — on the website.

### Tasks
- [ ] Create database schema:
  - [ ] `program_weeks` (week_number, title)
  - [ ] `sessions` (session_number, title, focus, estimated_minutes)
  - [ ] `exercises` (name, description, video_url, thumbnail_url, muscle_group, equipment)
  - [ ] `session_exercises` (order, training_method, sets, reps, tempo, rest)
  - [ ] `user_progress` (user_id, session_id, completed, exercise_logs)
- [ ] Build dashboard layout (sidebar nav, top bar, responsive)
- [ ] Build "My Programs" page — grid of purchased programs
- [ ] Build program overview page (weeks grid → sessions list)
- [ ] Build session detail page:
  - [ ] Exercise list with video thumbnails
  - [ ] Video player (inline or modal)
  - [ ] Sets/reps/tempo/rest display
  - [ ] Training method badges (Superset, Triset, Circuit, AMRAP, EMOM, TABATA)
  - [ ] "Mark as complete" functionality
- [ ] Build progress tracking (completed sessions, streak, %)
- [ ] Set up Supabase Storage buckets (exercise-videos, program-covers, nutrition)
- [ ] Configure RLS: users only access sessions from purchased programs

### Deliverable
> Logged-in users see their purchased programs, navigate through weeks/sessions, watch exercise videos, and track their progress.

---

## Phase 5: Content Pipeline & Launch
**Goal:** Populate the platform with real content, optimize performance, and launch.

### Tasks
- [ ] Build assessment quiz flow:
  - [ ] Multi-step form (gender, age, weight, height, experience, goals, availability, location)
  - [ ] Recommendation logic → suggest program
  - [ ] CTA → Stripe checkout
- [ ] Upload exercise videos to Supabase Storage (200+ short demos)
- [ ] Upload follow-along videos (32 × 30min videos for 28-day programs)
- [ ] Seed complete program data:
  - [ ] ORION (Salle + Maison) — 90 days, 4 cycles
  - [ ] LÉO / GRIZZLY — 28 days
  - [ ] Papa Strong — 4 months (1 video/week drip)
- [ ] Build Papa Strong dedicated page with Calendly embed
- [ ] Performance optimization:
  - [ ] Image optimization (Next.js Image component, WebP)
  - [ ] Video lazy loading + signed URLs
  - [ ] Core Web Vitals audit
- [ ] SEO polish (structured data, sitemap, robots.txt, OG images)
- [ ] Responsive QA across breakpoints
- [ ] Cross-browser testing

### Deliverable
> The platform is fully content-loaded, performant, SEO-optimized, and ready for public launch.

---

## Phase 6: Admin Panel
**Goal:** Alex can manage programs, exercises, users, and content without touching Supabase Dashboard.

### Tasks
- [ ] Design admin layout (separate route group: `/admin`)
- [ ] Build program management (CRUD: create, edit, archive programs)
- [ ] Build exercise library (CRUD: add exercises, upload videos, set tags)
- [ ] Build session builder (drag-and-drop exercise ordering, set training methods)
- [ ] Build user management (view users, view purchases, grant/revoke access)
- [ ] Build analytics dashboard (active users, revenue, popular programs, completion rates)
- [ ] Admin role-based access (Supabase custom claims or admin table)
- [ ] Video upload UI with progress indicator

### Deliverable
> Alex has a custom admin panel to manage all content and users without technical knowledge.

---

## Phase 7: Mobile Integration (Ongoing — with Digital 1001)
**Goal:** The Flutter app connects to the same Supabase backend and provides a seamless cross-platform experience.

### Tasks
- [ ] Share Supabase project credentials and documentation with Digital 1001
- [ ] Document API surface:
  - [ ] Auth endpoints (sign up, sign in, refresh, password reset)
  - [ ] Data queries (programs, sessions, exercises — with RLS)
  - [ ] Storage URLs (signed video URLs, thumbnails)
  - [ ] Progress tracking (read/write user_progress)
- [ ] Deep link configuration:
  - [ ] App → Website for purchases (`/programmes/[slug]`)
  - [ ] Website → App for post-purchase redirect
- [ ] Test shared auth flow:
  - [ ] Web sign-up → App login (same credentials)
  - [ ] Web purchase → App sees program unlocked
- [ ] Coordinate timer UIs (AMRAP, EMOM, TABATA) between web and app

### Deliverable
> The Flutter app is fully connected to Supabase, displays purchased programs, and seamlessly redirects to the web for purchases.

---

## Phase 8: V2 Features
**Goal:** Advanced features that enhance the platform after initial launch.

### Tasks
- [ ] AI Morpho-Anatomical Analysis — Photo/video body type analysis for program personalization
- [ ] Auto-Generated Nutrition Plans — Based on BMR, goals, morphotype. Macros, micros, tailored recipes
- [ ] Google/Apple OAuth — Additional sign-in methods
- [ ] Video CDN migration — Move from Supabase Storage to BunnyCDN or Mux for performance at scale
- [ ] Community features — In-app messaging, forums, or Discord integration
- [ ] Notification system — Email + push notifications for new sessions, streak reminders
- [ ] Referral/affiliate system — Users share links, earn discounts
- [ ] Women's 90-day program (ATHENA expansion)
- [ ] AMT monthly subscription program launch
- [ ] Multi-language support (if Alex expands beyond French market)

### Deliverable
> The platform evolves from a program delivery tool into a full fitness ecosystem with AI-powered personalization.

---

## Infrastructure Notes

### Estimated Monthly Costs (At Launch)
| Service | Free Tier | Pro Tier |
|---|---|---|
| Vercel | 100GB bandwidth | ~$20/mo |
| Supabase | 500MB DB, 1GB storage | ~$25/mo |
| Stripe | — | 1.4% + €0.25/transaction |
| Domain | — | ~€12/year |
| **Total** | **~€0/mo** (for dev) | **~€45-65/mo** (at scale) |

### Video Storage Estimates
| Content | Count | Est. Size Each | Total |
|---|---|---|---|
| Short demo videos | 200+ | ~5-10 MB | ~1-2 GB |
| Follow-along videos | 32 | ~500 MB-1 GB | ~16-32 GB |
| **Total** | | | **~17-34 GB** |

> At 17-34 GB, Supabase Pro (250 GB storage included) handles this comfortably. BunnyCDN migration only needed if bandwidth costs spike or streaming performance requires a CDN edge network.
