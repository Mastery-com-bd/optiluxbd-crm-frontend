"use client";
import { ShippingAddressCard } from "@/components/pages/dashboard/admin/orders/signleOrder/BillingDetailsCard";
import { CustomerDetailsCard } from "@/components/pages/dashboard/admin/orders/signleOrder/CustomerDetailsCard";
import { OrderSummarySection } from "@/components/pages/dashboard/admin/orders/signleOrder/OrderSummarySection";
import { ContactPersonCard } from "@/components/pages/dashboard/admin/orders/signleOrder/ShippingAddressCard";
import { useGetSingleOrderQuery } from "@/redux/features/orders/ordersApi";
import { useParams } from "next/navigation";
import Loading from "../../../customers/loading";
import { Card, CardHeader } from "@/components/ui/card";
import { OrderInformationSection } from "@/components/pages/dashboard/admin/orders/signleOrder/OrderInformationSection";
import Image from "next/image";
import TrackOrderCard from "@/components/pages/dashboard/admin/orders/signleOrder/TrackOrderCard";
import OrderDetailsPDF from "@/components/pages/dashboard/admin/orders/signleOrder/OrderDetailsPDF";

const SingleProductPage = () => {
  const { orderId } = useParams();
  const { data: orderData, isLoading: orderLoading } =
    useGetSingleOrderQuery(orderId);
  const order = orderData?.data;
  const customer = order?.customer;
  const formattedDate = new Date(order?.orderDate).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  if (orderLoading) return <Loading />;
  return (
    <div className=" m-4 lg:m-8">
      <div className="flex justify-between items-center">
        <div className="">
          <h3 className="mb-3 text-xl font-bold">Orders Details</h3>
          <p className="text-gray-400">
            OrderID ORD-{order?.id} .placed on {formattedDate}{" "}
          </p>
        </div>
        <div className="flex gap-3">
          <TrackOrderCard />
          <OrderDetailsPDF />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between gap-6 my-4">
        <div className="lg:w-[70%]">
          <Card className="bgGlass">
            <OrderInformationSection order={order} />
          </Card>
          <Card className="my-6 bgGlass">
            <OrderSummarySection order={order} />
          </Card>
          <Card className="bgGlass">
            <CardHeader className=" text-lg font-semibold">
              Transactions
            </CardHeader>
            <div className="grid grid-cols-3 items-center justify-between w-full">
              {/* Left: Payment Method */}
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/bkash.svg"
                  alt="bKash"
                  className="rounded-full object-contain"
                  height={40}
                  width={40}
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">bKash</span>
                  <span className="text-xs text-muted-foreground">
                    bKash pay
                  </span>
                </div>
                {order?.payment?.trxId && (
                  <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-lg ml-2">
                    {order?.payment?.trxId}
                  </span>
                )}
              </div>

              {/* Middle: Date */}
              <div className="text-center text-sm">
                <p className="text-gray-400">Date</p>
                {order?.payment?.paidAt &&
                  new Date(order?.payment?.paidAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </div>

              {/* Right: Amount */}
              <div className="text-right ">
                <p className="text-gray-400">Total</p>৳{" "}
                {parseFloat(order?.payment?.amount)?.toLocaleString()}
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:w-[30%] flex flex-col lg:gap-6 ">
          <CustomerDetailsCard customer={customer} />
          <ContactPersonCard order={order} />
          <ShippingAddressCard />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
