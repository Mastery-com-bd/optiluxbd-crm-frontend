'use client'
import { MonthlyOrder } from "@/components/pages/dashboard/admin/orders/MonthlyOrder"; 11
import { OrderStatusRatio } from "@/components/pages/dashboard/admin/orders/OrderStatusRatio";
import { OrderTable } from "@/components/pages/dashboard/admin/orders/OrderTable";
import { OverviewCard } from "@/components/pages/dashboard/shared/overviewCard";
import PageHeader from "@/components/pages/dashboard/shared/pageHeader";
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
        <PageHeader title="Order Overview" description="View and manage all orders" />
        <div className="mt-4">
          <OverviewCard stats={stats} />
          <div className="flex justify-between my-10 gap-4">
            <div className="w-[65%]">
              <MonthlyOrder />
            </div>
            <div className="w-[35%]">
              <OrderStatusRatio />
            </div>
          </div>
          <PageHeader title="Recent Orders" description="Latest orders from your customers" />
          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default page;
