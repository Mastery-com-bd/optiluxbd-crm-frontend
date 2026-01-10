import { AgentOverview } from "../agentOverview";
import AllAgentTable from "../allAgentTable";


const AllAgent = () => {
    return (
        <div className="space-y-4">
            <AgentOverview/>
            <AllAgentTable/>
        </div>
    );
};

export default AllAgent;