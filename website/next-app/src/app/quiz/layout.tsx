import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quel programme est fait pour toi ? | APEX METHOD',
  description:
    'Réponds à quelques questions simples et découvre le programme APEX METHOD qui correspond à ton profil, tes objectifs et ton mode de vie.',
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
