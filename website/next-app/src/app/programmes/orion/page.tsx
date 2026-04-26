import OrionHero from '@/components/orion/OrionHero';
import OrionPromise from '@/components/orion/OrionPromise';
import OrionSteps from '@/components/orion/OrionSteps';
import OrionWeekly from '@/components/orion/OrionWeekly';
import OrionFeatures from '@/components/orion/OrionFeatures';
import OrionProof from '@/components/orion/OrionProof';
import OrionVariants from '@/components/orion/OrionVariants';
import OrionFAQ from '@/components/orion/OrionFAQ';
import OrionCTA from '@/components/orion/OrionCTA';
import styles from './page.module.css';

export default function OrionLandingPage() {
  return (
    <main className={styles.main}>
      <OrionHero />
      <OrionPromise />
      <OrionSteps />
      <OrionWeekly />
      <OrionFeatures />
      <OrionProof />
      <OrionVariants />
      <OrionFAQ />
      <OrionCTA />
    </main>
  );
}
