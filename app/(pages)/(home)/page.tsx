import HeroBanner from "@/components/pages/home/HeroBanner";
import KeyFeatures from "@/components/pages/home/KeyFeatures";
import PricingSection from "@/components/pages/home/PricingSection";
import RealTimeSection from "@/components/pages/home/RealTimeSection";
import StatsSection from "@/components/pages/home/StatsSection";
import TestimonialsSection from "@/components/pages/home/TestimonialsSection";
import SecondSection from "@/components/pages/home/SecondSection";

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <SecondSection />
      <KeyFeatures />
      <StatsSection />

      <TestimonialsSection />
      <PricingSection />
      <RealTimeSection />
    </div>
  );
};

export default Home;
