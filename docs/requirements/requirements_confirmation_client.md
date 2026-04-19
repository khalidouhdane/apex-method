# APEX METHOD — Confirmation du Scope
> **Préparé le** : 8 avril 2026
> **Objectif** : Valider les fonctionnalités de l'app et du site web avant de lancer le design.

---

## 1. Les Programmes

| Programme | Type | Dans l'App | Sur le Site |
|---|---|---|---|
| **Papa Strong** | Coaching premium 1:1 (4 mois) | Programme complet + suivi | Landing page + achat |
| **ORION** | Programme structuré 90 jours | Programme complet, toggle Maison/Salle | Landing page + achat |
| **AMT** | Abonnement mensuel | Programmes mensuels rotatifs | Landing page + abonnement |
| **ATHENA** | ORION adapté aux femmes | Programme complet | Landing page + achat |

> ORION Maison et Salle = **un seul programme, deux formats**. Dans l'app, un simple toggle/onglet change les exercices selon l'environnement (maison ou salle).

> Les prix et les produits sont gérés dans **WooCommerce** — tu peux tout modifier toi-même à tout moment.

---

## 2. App Mobile — Fonctionnalités

### ✅ Ce qu'on va designer

| # | Fonctionnalité | Description |
|---|---|---|
| 1 | **Onboarding** | Écrans de bienvenue, inscription / connexion |
| 2 | **Connexion** | Login email + mot de passe (identifiants reçus après achat sur le site) |
| 3 | **Dashboard** | Séance du jour, résumé des progrès, actions rapides |
| 4 | **Vue Programme** | Programme actif : semaines/cycles, progression %, séances complétées |
| 5 | **Toggle Format (ORION)** | Basculer entre Maison et Salle (change les exercices, pas la structure) |
| 6 | **Choix de Fréquence** | 🆕 L'utilisateur choisit 3, 4, ou 5 séances/semaine — le programme s'adapte |
| 7 | **Vue Séance** | Entraînement du jour : exercices, séries, reps, tempo, repos |
| 8 | **Détail Exercice** | Vidéo démo (tes propres vidéos), instructions, groupes musculaires, paramètres (reps, séries, tempo, charges, repos, variantes) |
| 9 | **Supersets / Bisets / Trisets** | Exercices groupés et suivis ensemble |
| 10 | **Entraînements chronométrés** | 🆕 AMRAP, EMOM, TABATA — interfaces avec timers, compteurs de rounds, intervalles |
| 11 | **Circuit Training** | 🆕 4+ exercices en rounds, avec compteur et repos |
| 12 | **Suivi d'entraînement** | Logger les charges, marquer les séries comme complétées, timers de repos |
| 13 | **Flexibilité de séance** | Choisir par quelle séance commencer (jambes vs. haut du corps) |
| 14 | **Calculateur de calories** | Besoins caloriques quotidiens selon stats + niveau d'activité |
| 15 | **Suivi des macros** | Journal quotidien protéines / glucides / lipides / calories |
| 16 | **Nutrition individualisée** | 🆕 Plans nutrition 100% personnalisés selon l'objectif : perte de poids, prise de muscle, ou les deux |
| 17 | **Scanner de repas** | Photo d'un repas → l'IA estime les calories + macros |
| 18 | **Bibliothèque de recettes** | Idées de repas avec ingrédients + macros détaillés |
| 19 | **Infos métabolisme** | Métabolisme de base (BMR), TDEE |
| 20 | **Analyse morpho-anatomique** | 🆕 Analyse du morphotype pour personnaliser le programme — voir section 2.1 ci-dessous |
| 21 | **Progrès — Poids** | Suivi du poids corporel dans le temps (graphique) |
| 22 | **Progrès — Photos** | Photos avant/après avec dates |
| 23 | **Progrès — Historique** | Séances passées, charges loggées, tendances de performance |
| 24 | **Progrès — Records (PRs)** | Records personnels par exercice |
| 25 | **Profil / Réglages** | Infos utilisateur, stats corporelles, objectifs, préférences |
| 26 | **Notifications push** | Rappels de séance, motivation, nouveau contenu |

### ❌ Pas inclus au lancement

| # | Fonctionnalité | Raison |
|---|---|---|
| 1 | Communauté / chat dans l'app | La communauté sera sur WhatsApp / Discord |
| 2 | Système multi-coach | Alexandre est le seul coach |
| 3 | Appels vidéo dans l'app | Les appels Papa Strong passent par Calendly / Zoom |
| 4 | Paiements dans l'app | Les achats se font sur le site (WooCommerce) |
| 5 | Suivi des pas / activité native | On utilise l'app santé du téléphone |
| 6 | Vidéos hebdomadaires déverrouillables (Papa Strong) | Peut être ajouté plus tard |
| 7 | Suivi des mensurations corporelles | Tour de taille, poitrine, etc. — peut être ajouté plus tard |

**→ Alexandre** : Est-ce qu'il y a des fonctionnalités dans cette liste que tu attends absolument au lancement ?

---

## 2.1. Analyse Morpho-Anatomique

Tu as mentionné vouloir une **analyse morpho-anatomique via l'IA** pour les programmes ORION.

**→ Alexandre** : Qu'est-ce que tu imagines concrètement ? Par exemple :
- L'utilisateur **prend des photos** de son corps et l'IA analyse son morphotype ?
- Ou c'est plutôt un **questionnaire** sur ses proportions (épaules, hanches, poignets, etc.) qui détermine son profil ?
- Autre chose ?

On a besoin de comprendre ta vision pour designer les bons écrans et évaluer le développement nécessaire.

---

## 3. Site Web — Pages

| Page | Description |
|---|---|
| **Accueil** | Hero, aperçu des programmes, preuves sociales, CTA vers le quiz |
| **À propos** | L'histoire d'Alex, la philosophie APEX Method |
| **Papa Strong** | Landing page — coaching premium 1:1 |
| **ORION** | Landing page — programme structuré 90 jours |
| **AMT Mensuel** | Landing page — abonnement mensuel |
| **ATHENA** | Landing page — programme femmes |
| **Quiz d'orientation** | Questionnaire interactif → recommandation de programme → achat |
| **Paiement** | WooCommerce — paiements uniques + abonnements |
| **Mon Compte** | Gérer son abonnement, facturation, annulation |
| **Merci / Onboarding** | Après achat : liens de téléchargement de l'app, identifiants |
| **Mentions légales / CGV** | Conditions, politique de confidentialité, politique de remboursement |

### Quiz d'orientation
Un questionnaire interactif qui guide les visiteurs vers le bon programme :
- Objectif (perte de gras / prise de muscle / forme générale)
- Lieu d'entraînement (maison / salle)
- Niveau d'expérience
- Genre
- Niveau d'engagement

→ Résultat : recommandation de programme avec bouton d'achat direct.

### Calendly (Papa Strong)
Après l'achat de Papa Strong, l'onboarding inclut un widget Calendly intégré (stylé comme le site) pour réserver le premier appel coaching.

### Gestion des abonnements
Toute la facturation, les annulations et la gestion du compte se font via **Mon Compte** sur le site. Depuis l'app, les utilisateurs sont redirigés vers le site pour la facturation.

---

## 4. Structure du programme ORION (basé sur ton document)

On a bien reçu ton PDF avec l'exemple de semaine type en salle. Voici ce qu'on a compris :

**Cycle** : 4 semaines par cycle
**Fréquence** : L'utilisateur choisit 3, 4 ou 5 séances/semaine

| Séance | Focus | Contenu principal |
|---|---|---|
| 1 | Pectoraux / Dos | Développé couché + tractions (superset), incliné + rowing (superset), écartés + oiseau (superset), pompes + tirage + gainage (triset) |
| 2 | Épaules / Bras | Épaulé-jeté, développé militaire, latérales + frontales + curl biceps (triset), curl + extension triceps (superset) |
| 3 | Jambes / Abdos | Soulevé de terre, fentes marchées, leg press + squats sautés + pompes Tyson (triset), V-ups lestés, burpees 1min |
| 4 | Upper Body | Dips + tractions (superset), pompes + tractions prise neutre (superset), circuit training (Arnold, reverse fly, curl marteau, relevés de jambes) |
| 5 | Bas du corps + Cardio | Fentes bulgares, leg extension + leg curl (superset), footing 20min ou marche sur tapis incliné |

**→ Alexandre** :
1. Est-ce que cette structure est représentative de tes autres programmes aussi (AMT, ATHENA) ?
2. Pour la fréquence 3 ou 4 séances : est-ce que tu supprimes des séances, ou tu restructures le programme complètement ?
3. Le programme Home/Maison — il suit le même découpage de séances mais avec des exercices différents ?

---

## 5. Questions à Confirmer

### Avant de lancer le design

| # | Question |
|---|---|
| 1 | La liste "Pas inclus au lancement" te convient ? Il manque quelque chose ? |
| 2 | L'analyse morpho-anatomique — comment tu vois ça concrètement ? (Voir section 2.1) |
| 3 | La fréquence 3/4/5 séances : tu adaptes la structure ou tu supprimes des séances ? |
| 4 | La nutrition individualisée — tu fournis les plans nutrition toi-même, ou c'est généré automatiquement dans l'app ? |
| 5 | Le quiz d'orientation sur le site — tu as déjà les questions et la logique de recommandation ? |

### Peut être décidé plus tard

| # | Question |
|---|---|
| 6 | Blog au lancement ou plus tard ? |
| 7 | Les vidéos de démonstration d'exercices : combien au total, quel timing de production ? |

---

*Ce document sert de référence commune. Une fois les points confirmés, on lance la phase design.*
