import HeroScroll from '@/components/HeroScroll';
import BrandDivider from '@/components/BrandDivider';
import MetricsReels from '@/components/MetricsReels';
import Programs from '@/components/Programs';
import PapaStrongPlan from '@/components/PapaStrongPlan';
import MonthlySubscription from '@/components/MonthlySubscription';
import AppPreviewV2 from '@/components/AppPreviewV2';
import ResultsCenter from '@/components/ResultsCenter';
import QuizCTA from '@/components/QuizCTA';

export default function HomeV2() {
  return (
    <main>
      <HeroScroll />
      <BrandDivider />
      <MetricsReels />
      <Programs />
      <PapaStrongPlan />
      <MonthlySubscription />
      <AppPreviewV2 />
      <ResultsCenter />
      <QuizCTA />
    </main>
  );
}
