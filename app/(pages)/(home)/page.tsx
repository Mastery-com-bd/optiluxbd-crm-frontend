import HeroBanner from "@/components/pages/home/HeroBanner";
import KeyFeatures from "@/components/pages/home/KeyFeatures";
import PricingSection from "@/components/pages/home/PricingSection";
import TestimonialsSection from "@/components/pages/home/TestimonialsSection";
import SecondSection from "@/components/pages/home/SecondSection";
import FAQ from "@/components/pages/home/FAQ";

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <SecondSection />
      <KeyFeatures />
      <TestimonialsSection />
      <PricingSection />
      <FAQ />
    </div>
  );
};

export default Home;
