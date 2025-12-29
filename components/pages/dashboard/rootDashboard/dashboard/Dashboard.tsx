"use client";

import FooterSection from "./FooterSection";
import Overview from "./Overview";
import RevenewSection from "./RevenewSection";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Overview />
      <RevenewSection />
      <FooterSection />
    </div>
  );
};

export default Dashboard;
