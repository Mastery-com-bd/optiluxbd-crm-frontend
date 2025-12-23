import AgentLeadsTable from "@/components/pages/dashboard/agentDashboard/leads/agentLeadsTable";
import LeadsStatus from "@/components/pages/dashboard/agentDashboard/leads/leadsStatus";

const Page = () => {
  return (
    <div>
      <LeadsStatus />
      <AgentLeadsTable />
    </div>
  );
};

export default Page;
