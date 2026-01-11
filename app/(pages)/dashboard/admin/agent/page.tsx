import { AgentOverview } from "@/components/pages/dashboard/agent/agentOverview";
import AllAgentTable from "@/components/pages/dashboard/agent/allAgentTable";

const Page = () => {
  return (
    <div className="min-h-screen w-full max-w-[1132px] mx-auto">
      <AgentOverview />
      <AllAgentTable />
    </div>
  );
};

export default Page;