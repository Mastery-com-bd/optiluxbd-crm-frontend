import HeroBanner from "@/components/pages/home/HeroBanner";
import KeyFeatures from "@/components/pages/home/KeyFeatures";
import PricingSection from "@/components/pages/home/PricingSection";
import TestimonialsSection from "@/components/pages/home/TestimonialsSection";
import SecondSection from "@/components/pages/home/SecondSection";
import FAQ from "@/components/pages/home/FAQ";
import { getAllPlans } from "@/service/plan";
import { Suspense } from "react";
import PricingSkeleton from "@/components/pages/home/PricingSkeleton";

const Home = async () => {
  const result = await getAllPlans();
  const plans = result?.data || [];

  return (
    <div>
      <HeroBanner />
      <SecondSection />
      <KeyFeatures />
      <TestimonialsSection />
      <Suspense fallback={<PricingSkeleton />}>
        <PricingSection plans={plans} />
      </Suspense>
      <FAQ />
    </div>
  );
};

export default Home;
