import { AgentOverview } from "../agentOverview";
import AllAgentTable from "../allAgentTable";


const AllAgent = () => {
    return (
        <div className="my-6">
            <AgentOverview/>
            <AllAgentTable/>
        </div>
    );
};

export default AllAgent;