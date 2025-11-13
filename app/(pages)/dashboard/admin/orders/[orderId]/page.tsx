'use client'
import { BillingDetailsCard } from "@/components/pages/dashboard/admin/orders/signleOrder/BillingDetailsCard";
import { CustomerDetailsCard } from "@/components/pages/dashboard/admin/orders/signleOrder/CustomerDetailsCard";
import { OrderSummarySection } from "@/components/pages/dashboard/admin/orders/signleOrder/OrderSummarySection";
import { ShippingActivity } from "@/components/pages/dashboard/admin/orders/signleOrder/ShippingActivity";
import { ShippingAddressCard } from "@/components/pages/dashboard/admin/orders/signleOrder/ShippingAddressCard";
import { useGetSingleOrderQuery } from "@/redux/features/orders/ordersApi";
import { useParams } from "next/navigation";

const SingleProductPage = () => {
    const { orderId } = useParams();
    const { data: orderData } = useGetSingleOrderQuery(orderId);
    const order = orderData?.data;
    const customer = order?.customer;
    return (
        <div className=" m-4 lg:m-8">
            <h3 className="mb-3 text-xl font-bold">Orders Details</h3>
            <div className="flex flex-col lg:flex-row w-full justify-between gap-6">
                <div className="lg:w-[70%] ">
                    <OrderSummarySection order={order} />
                    {/* <ShippingActivity /> */}
                </div>
                <div className="lg:w-[30%] flex flex-col lg:gap-6 ">
                    <CustomerDetailsCard customer={customer} />
                    <ShippingAddressCard order={order} />
                    <BillingDetailsCard />
                </div>

            </div>
        </div>
    );
};

export default SingleProductPage;