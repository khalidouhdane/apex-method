import HeroScroll from '@/components/HeroScroll';
import BrandDivider from '@/components/BrandDivider';
import MetricsReels from '@/components/MetricsReels';
import Programs from '@/components/Programs';
import PapaStrongPlan from '@/components/PapaStrongPlan';
import MonthlySubscription from '@/components/MonthlySubscription';
import AppPreview from '@/components/AppPreview';
import Results from '@/components/Results';
import About from '@/components/About';
import QuizCTA from '@/components/QuizCTA';

export default function Home() {
  return (
    <main>
      <HeroScroll />
      <BrandDivider />
      <MetricsReels />
      <Programs />
      <PapaStrongPlan />
      <MonthlySubscription />
      <AppPreview />
      <Results />
      <About />
      <QuizCTA />
    </main>
  );
}
