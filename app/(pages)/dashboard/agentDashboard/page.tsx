import DailyPerformanceCard from "@/components/pages/dashboard/agentDashboard/dailyPerformanceCard";
import LeaderBoardCard from "@/components/pages/dashboard/agentDashboard/leaderBoardCard";
import LeadQueueCard from "@/components/pages/dashboard/agentDashboard/leadQueueCard";
import MonthlyPerformance from "@/components/pages/dashboard/agentDashboard/monthlyPerformanceCard";
import StatCards from "@/components/pages/dashboard/agentDashboard/statCards";

const Page = () => {
  return (
    <div className="space-y-6">
      <StatCards />
      <div className="w-full flex justify-between items-start">
        <LeadQueueCard />
        <MonthlyPerformance />
      </div>
      <div className="w-full flex justify-between items-start gap-4">
        <LeaderBoardCard />
        <DailyPerformanceCard />
      </div>
    </div>
  );
};

export default Page;
