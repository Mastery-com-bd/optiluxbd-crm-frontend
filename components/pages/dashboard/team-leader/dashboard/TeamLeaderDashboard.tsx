"use client";
import DailyChartSection from "./DailyChartSection";
import LeaderBoardTable from "./LeaderBoardTable";
import OverviewSection from "./OverviewSection";
import PerformanceChart from "./PerformanceChart";

const TeamLeaderDashboard = () => {
  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full">
      {/* headers */}
      <h1 className="text-3xl font-semibold text-[#FDFDFD]">
        Dashboard Overview
      </h1>

      <OverviewSection />
      <DailyChartSection />

      <div className="flex items-start justify-between gap-4">
        <LeaderBoardTable />
        <PerformanceChart />
      </div>
    </div>
  );
};

export default TeamLeaderDashboard;
