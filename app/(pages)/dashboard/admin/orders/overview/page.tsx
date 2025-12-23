'use client'
import { MonthlyOrder } from "@/components/pages/dashboard/admin/orders/MonthlyOrder";11
import { OrderStatusRatio } from "@/components/pages/dashboard/admin/orders/OrderStatusRatio";
import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";
import { OverviewCard } from "@/components/pages/dashboard/shared/overviewCard";
import { AlertTriangle, Box, User, XCircle } from "lucide-react";

const page = () => {
  const stats = [
    {
      icon: Box,
      label: "Total Product",
      value: "128",
      isPositive: true,
      change: "36.8%",
      highlight: false,
    },
    {
      icon: User,
      label: "Active Products",
      value: "512",
      isPositive: false,
      change: "36.8%",
      highlight: false,
    },
    {
      icon: AlertTriangle,
      label: "Low Stock Products",
      value: "12",
      isPositive: true,
      change: "36.8%",
      highlight: true,
    },
    {
      icon: XCircle,
      label: "Out Of Stock Product",
      value: "85",
      isPositive: false,
      change: "36.8%",
      highlight: true,
      highlightColor: "text-red-600"
    },
  ];
  return (
    <div className="">
      <div className="w-full mx-auto">
        <h3 className="text-xl mb-2 font-bold">Orders</h3>
        <div>
          <OverviewCard stats={stats} />
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
