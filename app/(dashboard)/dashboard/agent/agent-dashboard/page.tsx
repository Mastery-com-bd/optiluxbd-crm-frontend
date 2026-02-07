import DailyPerformanceCard from "@/components/pages/dashboard/agentDashboard/dailyPerformanceCard";
import LeaderBoardCard from "@/components/pages/dashboard/agentDashboard/leaderBoardCard";
import LeadQueueCard from "@/components/pages/dashboard/agentDashboard/leadQueueCard";
import MonthlyPerformanceCard from "@/components/pages/dashboard/agentDashboard/monthlyPerformanceCard";
import StatCards from "@/components/pages/dashboard/agentDashboard/statCards";

const AgentDashboardPage = () => {
  return (
    <section className="space-y-6">
      <StatCards />
      <div className="w-full flex justify-between items-start">
        <LeadQueueCard />
        <MonthlyPerformanceCard />
      </div>
      <div className="w-full flex justify-between items-start gap-4">
        <LeaderBoardCard />
        <DailyPerformanceCard />
      </div>
    </section>
  );
};

export default AgentDashboardPage;
