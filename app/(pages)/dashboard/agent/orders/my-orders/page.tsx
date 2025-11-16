import AgentOrderTable from "@/components/pages/dashboard/agent/orders/my-orders/AgentOrderTable";
import Stat from "@/components/pages/dashboard/agent/orders/my-orders/Stat";

const page = () => {
    return (
        <div className="p-5">
            MY ORDERS
            <Stat />
            <AgentOrderTable />
        </div>
    );
};

export default page;