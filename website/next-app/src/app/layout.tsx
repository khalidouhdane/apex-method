import type { Metadata } from 'next';
import '@/styles/globals.css';
import GSAPProvider from '@/components/GSAPProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
  title: 'APEX METHOD — Un corps fort. Un mental solide. Une vie maîtrisée.',
  description:
    'APEX METHOD par Alexandre Monteiro. Programmes de transformation physique et mentale pour hommes. ORION, Papa Strong, LÉO — atteins ton sommet.',
  openGraph: {
    title: 'APEX METHOD — Transformation Physique & Mentale',
    description:
      'Programmes structurés pour hommes : ORION (90 jours), LÉO (28 jours), Papa Strong (coaching 1:1). Atteins ton sommet.',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="dark">
      <body>
        {/* Global Background / Studio Lighting */}
        <div className="global-bg">
          <div className="global-gradient" />
          <div className="global-glow-bottom" />
        </div>

        <CustomCursor />
        <Loader />

        <GSAPProvider>
          <Navbar />
          {children}
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
