import { MonthlyOrder } from "@/components/pages/dashboard/admin/orders/MonthlyOrder";
import { OrderStats } from "@/components/pages/dashboard/admin/orders/OrderStats";
import { OrderStatusRatio } from "@/components/pages/dashboard/admin/orders/OrderStatusRatio";
import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";

const page = () => {
  return (
    <div className="m-4 lg:m-8 ">
      <div className="max-w-[1140] mx-auto">
        <h3 className="text-xl mb-2 font-bold">Orders</h3>
        <div>
          <OrderStats />
          <div className="flex justify-between my-10 gap-4">
            <div className="w-[65%]">
              <MonthlyOrder />
            </div>
            <div className="w-[35%]">
              <OrderStatusRatio />
            </div>
          </div>
          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default page;
