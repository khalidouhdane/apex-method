// ============================================================
// APEX METHOD — Quiz Recommendation Engine
// Reference: docs/QUIZ_STRATEGY.md (update strategy doc FIRST)
// ============================================================

// ── Types ──────────────────────────────────────────────────

export type Gender = 'homme' | 'femme';
export type Experience = 'debutant' | 'intermediaire' | 'confirme';
export type Goal = 'perte' | 'masse' | 'les-deux';
export type Availability = '2-3' | '4' | '5+';
export type Location = 'maison' | 'salle' | 'outdoor';
export type HealthConstraint =
  | 'aucune'
  | 'articulaire'
  | 'dos'
  | 'blessure'
  | 'autre';

export interface QuizAnswers {
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  experience: Experience;
  goal: Goal;
  availability: Availability;
  location: Location;
  isFather: boolean; // only asked if gender === 'homme'
  healthConstraints: HealthConstraint[];
}

export type ProgramId =
  | 'orion-salle'
  | 'orion-maison'
  | 'leo-grizzly'
  | 'athena'
  | 'papa-strong';

export interface Program {
  id: ProgramId;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  priceType: string;
  location: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  pills: string[];
}

export interface QuizResult {
  primary: Program;
  alternatives: Program[];
  scores: Record<ProgramId, number>;
  hasHealthConstraints: boolean;
}

// ── Program Catalog ────────────────────────────────────────

export const PROGRAMS: Record<ProgramId, Program> = {
  'orion-salle': {
    id: 'orion-salle',
    title: 'ORION SALLE',
    subtitle: 'La transformation absolue',
    duration: '90 jours',
    price: '97€',
    priceType: 'Paiement unique',
    location: 'Salle de sport',
    description:
      "La transformation absolue en salle. Machines, haltères et poids du corps pour sculpter un physique d'élite.",
    ctaText: 'Découvrir ORION Salle',
    ctaHref: '/programmes/orion',
    image:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    pills: ['FONDATION', 'SALLE', '90 JOURS'],
  },
  'orion-maison': {
    id: 'orion-maison',
    title: 'ORION MAISON',
    subtitle: 'La méthode APEX chez toi',
    duration: '90 jours',
    price: '97€',
    priceType: 'Paiement unique',
    location: 'Maison / Outdoor',
    description:
      "Le moteur principal de la méthode APEX adapté pour la maison ou l'extérieur avec des élastiques de résistance.",
    ctaText: 'Découvrir ORION Maison',
    ctaHref: '/programmes/orion',
    image:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
    pills: ['FONDATION', 'MAISON', '90 JOURS'],
  },
  'leo-grizzly': {
    id: 'leo-grizzly',
    title: 'LÉO / GRIZZLY',
    subtitle: "L'intensif Home",
    duration: '28 jours',
    price: '49€',
    priceType: 'Paiement unique',
    location: 'Maison',
    description:
      'Brise tes plateaux et relance ton métabolisme avec un format court et brutal. 100% poids du corps.',
    ctaText: 'Découvrir LÉO / GRIZZLY',
    ctaHref: '/#programmes',
    image:
      'https://images.unsplash.com/photo-1598136490937-f77b0ce520fe?q=80&w=800&auto=format&fit=crop',
    pills: ['INTENSIF', '28 JOURS'],
  },
  athena: {
    id: 'athena',
    title: 'ATHENA',
    subtitle: 'La puissance au féminin',
    duration: '28 jours',
    price: '49€',
    priceType: 'Paiement unique',
    location: 'Maison',
    description:
      'Une méthode structurée pour sculpter un physique fort et dessiné, avec la philosophie APEX.',
    ctaText: 'Découvrir ATHENA',
    ctaHref: '/#programmes',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    pills: ['FEMMES', '28 JOURS'],
  },
  'papa-strong': {
    id: 'papa-strong',
    title: 'PAPA STRONG',
    subtitle: 'Coaching Premium 1:1',
    duration: '4 mois',
    price: 'Sur devis',
    priceType: 'Coaching personnalisé',
    location: 'Flexible',
    description:
      "L'accompagnement premium pour les pères. Programme structuré sur 4 mois avec suivi personnalisé, nutrition et mindset.",
    ctaText: 'Réserver un appel gratuit',
    ctaHref: '#', // Calendly link — to be added
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    pills: ['PREMIUM', '4 MOIS', '1:1'],
  },
};

// ── Scoring Matrix ─────────────────────────────────────────

type ScoreMatrix = Record<string, Record<ProgramId, number>>;

const SCORES: ScoreMatrix = {
  // Gender
  'gender:homme': {
    'orion-salle': 1,
    'orion-maison': 1,
    'leo-grizzly': 1,
    athena: 0,
    'papa-strong': 1,
  },
  'gender:femme': {
    'orion-salle': 0,
    'orion-maison': 0,
    'leo-grizzly': 0,
    athena: 3,
    'papa-strong': 0,
  },

  // Experience
  'experience:debutant': {
    'orion-salle': 0,
    'orion-maison': 1,
    'leo-grizzly': 2,
    athena: 2,
    'papa-strong': 2,
  },
  'experience:intermediaire': {
    'orion-salle': 1,
    'orion-maison': 1,
    'leo-grizzly': 1,
    athena: 1,
    'papa-strong': 1,
  },
  'experience:confirme': {
    'orion-salle': 2,
    'orion-maison': 1,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 0,
  },

  // Goal
  'goal:perte': {
    'orion-salle': 1,
    'orion-maison': 1,
    'leo-grizzly': 2,
    athena: 2,
    'papa-strong': 1,
  },
  'goal:masse': {
    'orion-salle': 2,
    'orion-maison': 1,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 1,
  },
  'goal:les-deux': {
    'orion-salle': 2,
    'orion-maison': 2,
    'leo-grizzly': 1,
    athena: 1,
    'papa-strong': 1,
  },

  // Availability
  'availability:2-3': {
    'orion-salle': 0,
    'orion-maison': 1,
    'leo-grizzly': 2,
    athena: 2,
    'papa-strong': 2,
  },
  'availability:4': {
    'orion-salle': 2,
    'orion-maison': 2,
    'leo-grizzly': 1,
    athena: 1,
    'papa-strong': 1,
  },
  'availability:5+': {
    'orion-salle': 2,
    'orion-maison': 2,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 0,
  },

  // Location
  'location:maison': {
    'orion-salle': 0,
    'orion-maison': 3,
    'leo-grizzly': 2,
    athena: 2,
    'papa-strong': 1,
  },
  'location:salle': {
    'orion-salle': 3,
    'orion-maison': 0,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 0,
  },
  'location:outdoor': {
    'orion-salle': 0,
    'orion-maison': 2,
    'leo-grizzly': 2,
    athena: 1,
    'papa-strong': 1,
  },

  // Father
  'father:true': {
    'orion-salle': 0,
    'orion-maison': 0,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 3,
  },
  'father:false': {
    'orion-salle': 0,
    'orion-maison': 0,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 0,
  },

  // Health constraints
  'health:has-constraints': {
    'orion-salle': -1,
    'orion-maison': 0,
    'leo-grizzly': -1,
    athena: 0,
    'papa-strong': 3,
  },
  'health:aucune': {
    'orion-salle': 0,
    'orion-maison': 0,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 0,
  },
};

// ── Engine ─────────────────────────────────────────────────

function initScores(): Record<ProgramId, number> {
  return {
    'orion-salle': 0,
    'orion-maison': 0,
    'leo-grizzly': 0,
    athena: 0,
    'papa-strong': 0,
  };
}

function addScore(
  totals: Record<ProgramId, number>,
  key: string
): void {
  const row = SCORES[key];
  if (!row) return;
  for (const pid of Object.keys(row) as ProgramId[]) {
    totals[pid] += row[pid];
  }
}

export function getRecommendation(answers: QuizAnswers): QuizResult {
  const totals = initScores();

  // Apply scoring
  addScore(totals, `gender:${answers.gender}`);
  addScore(totals, `experience:${answers.experience}`);
  addScore(totals, `goal:${answers.goal}`);
  addScore(totals, `availability:${answers.availability}`);
  addScore(totals, `location:${answers.location}`);
  addScore(totals, `father:${answers.isFather}`);

  const hasHealthConstraints =
    answers.healthConstraints.length > 0 &&
    !answers.healthConstraints.includes('aucune');

  addScore(
    totals,
    hasHealthConstraints ? 'health:has-constraints' : 'health:aucune'
  );

  // Gender filtering: exclude programs not for this gender
  const excluded: ProgramId[] =
    answers.gender === 'femme'
      ? ['orion-salle', 'orion-maison', 'leo-grizzly', 'papa-strong']
      : ['athena'];

  for (const pid of excluded) {
    totals[pid] = -999;
  }

  // Sort by score descending
  const sorted = (Object.keys(totals) as ProgramId[])
    .filter((pid) => totals[pid] > -999)
    .sort((a, b) => totals[b] - totals[a]);

  const primaryId = sorted[0];
  const primaryScore = totals[primaryId];

  // Alternatives: next 1-2 with score > 50% of primary
  const alternatives = sorted
    .slice(1)
    .filter((pid) => totals[pid] > primaryScore * 0.5)
    .slice(0, 2)
    .map((pid) => PROGRAMS[pid]);

  return {
    primary: PROGRAMS[primaryId],
    alternatives,
    scores: totals,
    hasHealthConstraints,
  };
}
