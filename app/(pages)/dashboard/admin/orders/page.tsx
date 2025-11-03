import { OrderStats } from "@/components/pages/dashboard/admin/orders/OrderStats";
import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";

const page = () => {
    return (
        <div className="m-4 lg:m-8">
            <OrderStats />
            <OrderTable />
        </div>
    );
};

export default page;