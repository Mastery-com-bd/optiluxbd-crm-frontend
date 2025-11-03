import Footer from "@/components/common/Footer";
import HeroBanner from "@/components/HomeComponents/HeroBanner";
import KeyFeatures from "@/components/HomeComponents/KeyFeatures";
import PricingSection from "@/components/HomeComponents/PricingSection";
import RealTimeSection from "@/components/HomeComponents/RealTimeSection";
import StatsSection from "@/components/HomeComponents/StatsSection";
import TestimonialsSection from "@/components/HomeComponents/TestimonialsSection";
import WhyChooseUs from "@/components/HomeComponents/WhyChooseUs";

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <WhyChooseUs />
      <StatsSection />
      <KeyFeatures />
      <TestimonialsSection />
      <PricingSection />
      <RealTimeSection />
      <Footer />
    </div>
  );
}

export default Home
