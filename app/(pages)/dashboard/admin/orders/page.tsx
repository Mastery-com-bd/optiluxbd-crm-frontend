import { MonthlyOrder } from "@/components/pages/dashboard/admin/orders/MonthlyOrder";
import { OrderStats } from "@/components/pages/dashboard/admin/orders/OrderStats";
import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";

const page = () => {
  return (
    <div className="m-4 lg:m-8">
      <h3 className="text-xl mb-2 font-bold">Orders</h3>
      <div>
        <OrderStats />
        <div className="flex justify-between my-10">
          <div className="w-1/2">
            <MonthlyOrder />
          </div>
        </div>
        <OrderTable />
      </div>
    </div>
  );
};

export default page;
