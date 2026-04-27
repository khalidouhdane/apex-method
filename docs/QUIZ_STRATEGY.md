# APEX METHOD — Quiz / Program Wizard Strategy

> **Created:** April 27, 2026
> **Last Updated:** April 27, 2026
> **Status:** UI Build Phase — Technical integrations (analytics, Supabase, email capture) deferred.

This document is the **living reference** for the APEX METHOD assessment quiz. All design decisions, scoring logic, and UX rules are maintained here. Before changing the quiz in code, update this document first.

---

## Core UX Philosophy

> **Speed is everything.** The quiz must feel effortless and fast. Every input is optimized for instant interaction — no typing, no thinking, just clicking and sliding.

### Rules:
1. **One question per screen** — focused, no overwhelm
2. **Sliders over inputs** — age, weight, height use slider controls for instant feedback
3. **Clickable cards over forms** — all categorical questions are large tap targets
4. **Auto-advance on single-select** — picking an option automatically moves to the next step (400ms delay for feedback)
5. **No free-text fields** — exception: health "Autre" field (optional, and even that could be a dropdown)
6. **2 minutes max** — the entire quiz must be completable in under 2 minutes
7. **Visual feedback everywhere** — selection = bronze glow, progress bar fills, step counter updates
8. **Mobile-first** — large touch targets (min 56px), vertical stacking, full-width buttons

---

## Quiz Flow — 8 Steps

### Step 1: GENRE (Gender)
- **Type:** Single-select cards (2 options)
- **Options:** Homme / Femme
- **Auto-advance:** Yes
- **Purpose:** Routes women → ATHENA, filters men-only programs

### Step 2: PROFIL (Body Stats)
- **Type:** Sliders × 3
- **Fields:**
  - Âge: slider 18–65 (default: 30)
  - Poids: slider 45–150 kg (default: 80)
  - Taille: slider 150–210 cm (default: 175)
- **Auto-advance:** No — "Suivant" button (since 3 inputs)
- **Purpose:** Contextual data. Not heavily weighted in scoring but used for future personalization (BMR, nutrition).

### Step 3: EXPÉRIENCE (Training Experience)
- **Type:** Single-select cards (3 options)
- **Options:**
  - 🟢 Débutant — "0 à 1 séance par semaine"
  - 🟡 Intermédiaire — "2 à 3 séances par semaine"
  - 🔴 Confirmé — "4+ séances par semaine"
- **Auto-advance:** Yes
- **Purpose:** Beginners → shorter programs or Papa Strong. Advanced → ORION.

### Step 4: OBJECTIF (Goal)
- **Type:** Single-select cards (3 options)
- **Options:**
  - 🔥 Perte de gras
  - 💪 Prise de masse
  - ⚖️ Les deux (recomposition)
- **Auto-advance:** Yes
- **Purpose:** Fat loss leans toward intensive programs. Mass gain leans toward ORION (structured progression).

### Step 5: DISPONIBILITÉ (Availability)
- **Type:** Single-select cards (3 options)
- **Options:**
  - 2–3 séances / semaine
  - 4 séances / semaine
  - 5+ séances / semaine
- **Auto-advance:** Yes
- **Purpose:** Low availability → shorter programs (28-day) or Papa Strong. High → ORION.

### Step 6: LIEU (Location)
- **Type:** Single-select cards (3 options)
- **Options:**
  - 🏠 Maison
  - 🏋️ Salle de sport
  - 🌳 Extérieur
- **Auto-advance:** Yes
- **Purpose:** Directly determines Salle vs Maison variants. Outdoor → Maison variant.

### Step 7: PÈRE ? (Father Status)
- **Type:** Single-select cards (2 options)
- **Options:**
  - ✅ Oui, je suis père
  - ❌ Non
- **Auto-advance:** Yes
- **Purpose:** Fathers get a strong boost toward Papa Strong (premium 1:1 coaching).
- **Note:** Only shown to men (skip for women in Step 1 = Femme).

### Step 8: CONTRAINTES (Health Constraints)
- **Type:** Multi-select checkboxes (pick any that apply)
- **Options:**
  - ✅ Aucune contrainte (deselects all others)
  - ☐ Douleurs articulaires
  - ☐ Problèmes de dos
  - ☐ Blessure récente
  - ☐ Autre
- **Auto-advance:** No — "Voir mon programme" button (final step)
- **Purpose:** Any constraint selected → strong boost toward Papa Strong (personalized coaching can manage constraints). Result screen shows a note: "Nous te recommandons un appel avec Alex pour adapter le programme à tes besoins."

---

## Recommendation Engine — Scoring Matrix

Pure client-side TypeScript. Each answer adds/subtracts points to program candidates. Highest total score = primary recommendation.

### Score Table

| Factor | ORION Salle | ORION Maison | LÉO/GRIZZLY | ATHENA | Papa Strong |
|---|---|---|---|---|---|
| **Genre: Homme** | +1 | +1 | +1 | 0 | +1 |
| **Genre: Femme** | 0 | 0 | 0 | +3 | 0 |
| **Expérience: Débutant** | 0 | +1 | +2 | +2 | +2 |
| **Expérience: Intermédiaire** | +1 | +1 | +1 | +1 | +1 |
| **Expérience: Confirmé** | +2 | +1 | 0 | 0 | 0 |
| **Objectif: Perte de gras** | +1 | +1 | +2 | +2 | +1 |
| **Objectif: Prise de masse** | +2 | +1 | 0 | 0 | +1 |
| **Objectif: Les deux** | +2 | +2 | +1 | +1 | +1 |
| **Disponibilité: 2-3/sem** | 0 | +1 | +2 | +2 | +2 |
| **Disponibilité: 4/sem** | +2 | +2 | +1 | +1 | +1 |
| **Disponibilité: 5+/sem** | +2 | +2 | 0 | 0 | 0 |
| **Lieu: Maison** | 0 | +3 | +2 | +2 | +1 |
| **Lieu: Salle** | +3 | 0 | 0 | 0 | 0 |
| **Lieu: Outdoor** | 0 | +2 | +2 | +1 | +1 |
| **Père: Oui** | 0 | 0 | 0 | 0 | +3 |
| **Père: Non** | 0 | 0 | 0 | 0 | 0 |
| **Contraintes: Any** | -1 | 0 | -1 | 0 | +3 |
| **Contraintes: Aucune** | 0 | 0 | 0 | 0 | 0 |

### Gender Filtering
- If **Femme**: ORION Salle, ORION Maison, LÉO/GRIZZLY, and Papa Strong are excluded from results. Only ATHENA is recommended (with future women's programs as alternatives when available).
- If **Homme**: ATHENA is excluded from results.

### Result Output
- **Primary:** Highest-scoring program
- **Alternatives:** Next 1–2 highest scorers (only shown if score > 50% of primary score)
- **Papa Strong special handling:** When Papa Strong wins, the CTA is "Réserver un appel gratuit" (Calendly link) instead of "Découvrir le programme" (program page).
- **Health constraint note:** If any health constraint is selected, result screen shows: *"Tu as mentionné des contraintes physiques. On te recommande un appel avec Alex pour adapter ton programme."* with a secondary Calendly CTA.

---

## Result Screen Design

### Primary Recommendation Card
- Large card with program image background
- Program name (large, Platform font)
- Duration badge + location badge
- Price display
- Description text (1-2 lines)
- **CTA button:** "Découvrir [PROGRAMME]" (solid bronze) or "Réserver un appel" (for Papa Strong)

### Alternatives Section
- "Aussi adapté pour toi :" label
- 1-2 smaller horizontal cards with program name, duration, and mini-CTA

### Bottom Actions
- "Refaire le quiz" (ghost link)
- "Voir tous les programmes" (outline link back to `/#programmes`)

---

## Technical Notes (For Future Phases)

These are **deferred** — not built in the current UI phase:

1. **Email capture gate** — Soft gate on result screen ("Reçois ton plan par email"). Requires Supabase.
2. **Analytics tracking** — Track quiz starts, step completions, drop-off points, recommendations given. Vercel Analytics or GA4 events.
3. **Supabase persistence** — Save quiz responses to a `quiz_responses` table for Alex to review in admin panel.
4. **A/B testing** — Test different question orders, scoring weights, or CTA copy.
5. **Retargeting** — If user doesn't convert after quiz, email follow-up with their recommendation.

---

## File Map

| File | Purpose |
|---|---|
| `src/app/quiz/page.tsx` | Server component — SEO metadata |
| `src/app/quiz/layout.tsx` | Minimal layout (logo + close button, no navbar) |
| `src/components/quiz/QuizWizard.tsx` | Main orchestrator (state, navigation, transitions) |
| `src/components/quiz/QuizWizard.module.css` | All quiz styles |
| `src/components/quiz/QuizProgress.tsx` | Animated progress bar |
| `src/components/quiz/QuizResult.tsx` | Result screen with recommendation |
| `src/components/quiz/steps/StepGender.tsx` | Gender selection |
| `src/components/quiz/steps/StepProfile.tsx` | Age/weight/height sliders |
| `src/components/quiz/steps/StepExperience.tsx` | Training experience |
| `src/components/quiz/steps/StepGoal.tsx` | Goal selection |
| `src/components/quiz/steps/StepAvailability.tsx` | Weekly availability |
| `src/components/quiz/steps/StepLocation.tsx` | Training location |
| `src/components/quiz/steps/StepFather.tsx` | Father status (men only) |
| `src/components/quiz/steps/StepHealth.tsx` | Health constraints |
| `src/lib/quiz-engine.ts` | Scoring logic + types |

---

## Change Log

| Date | Change | By |
|---|---|---|
| April 27, 2026 | Initial strategy created | Alphafoundr |
