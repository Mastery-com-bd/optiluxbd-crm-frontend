import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";
import PageHeader from "@/components/pages/dashboard/shared/pageHeader";

const page = () => {
    return (
        <div className="m-4 lg:m-8 ">
            <div className="max-w-[1140] mx-auto">
                <div>
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

export default page;
