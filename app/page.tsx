import HeroBanner from "@/components/HomeComponents/HeroBanner";
import KeyFeatures from "@/components/HomeComponents/KeyFeatures";
import PricingSection from "@/components/HomeComponents/PricingSection";
import RealTimeSection from "@/components/HomeComponents/RealTimeSection";
import StatsSection from "@/components/HomeComponents/StatsSection";
import TestimonialsSection from "@/components/HomeComponents/TestimonialsSection";
import WhyChooseUs from "@/components/HomeComponents/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WhyChooseUs />
      <StatsSection />
      <KeyFeatures />
      <TestimonialsSection />
      <PricingSection />
      <RealTimeSection />
    </div>
  );
}
