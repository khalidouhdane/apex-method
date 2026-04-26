import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ORION — 90 Jours de Transformation | APEX METHOD',
  description:
    'Le programme structuré de 90 jours pour hommes. Deviens la version la plus forte de toi-même. Gain musculaire, recomposition, discipline.',
};

export default function OrionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
