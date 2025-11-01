import HeroBanner from "@/components/HomeComponents/HeroBanner";
import KeyFeatures from "@/components/HomeComponents/KeyFeatures";
import StatsSection from "@/components/HomeComponents/StatsSection";
import WhyChooseUs from "@/components/HomeComponents/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WhyChooseUs />
      <StatsSection />
      <KeyFeatures />
    </div>
  );
}
