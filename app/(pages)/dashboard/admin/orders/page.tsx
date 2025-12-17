import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";

const page = () => {
    return (
        <div className="m-4 lg:m-8 ">
            <div className="max-w-[1140] mx-auto">
                <h3 className="text-xl mb-2 font-bold">Orders</h3>
                <div>
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

export default page;
