import { OrderStats } from "@/components/pages/dashboard/admin/orders/OrderStats";
import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";

const page = () => {
  return (
    <div className="m-4 lg:m-8">
      <h3 className="text-xl mb-2 font-bold">Orders</h3>
      <div>
        <OrderStats />
        <OrderTable />
      </div>
    </div>
  );
};

export default page;
