/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetDailyReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import DailyReportSkeleton from "./reportSkeleton/DailyReportSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface Tsummary {
  totalOrders: number;
  newOrders: number;
  deliveredOrders: number;
  returnedOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalCommission: number;
  totalDeliveryCharge: number;
  netRevenue: number;
  activeAgents: number;
  newCustomers: number;
  totalUniqueCustomers: number;
  overallDeliveryRate: string;
  overallReturnRate: string;
  topAgentId: number;
  topAgentOrderCount: number;
  topProductId: number;
  topProductOrderCount: number;
  topCourierService: string;
  topCourierOrderCount: number;
}

const COLORS = ["#4ade80", "#facc15", "#f87171", "#60a5fa", "#c084fc"];

const DailyReport = () => {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  const [filters, setFilters] = useState({
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
    date: format(today, "yyyy-MM-dd"),
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      if (!date) return;
      setFilters((prev: any) => ({
        ...prev,
        date: format(date, "yyyy-MM-dd"),
        page: 1,
      }));
    });
  }, [date]);

  const { data, isLoading } = useGetDailyReportsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  const summaryData = report?.summary as Tsummary;

  const resetFilters = () => {
    setFilters({
      sortBy: "created_at",
      order: "desc",
      limit: 10,
      page: 1,
      date: "",
    });
    setDate(today);
  };

  const orderData = [
    { name: "New Orders", value: summaryData.newOrders },
    { name: "Delivered Orders", value: summaryData.deliveredOrders },
    { name: "Returned Orders", value: summaryData.returnedOrders },
    { name: "Cancelled Orders", value: summaryData.cancelledOrders },
    { name: "Pending Orders", value: summaryData.pendingOrders },
  ];

  const topData = [
    {
      name: `Top Agent (${summaryData.topAgentId}) Orders`,
      value: summaryData.topAgentOrderCount,
    },
    {
      name: `Top Product (${summaryData.topProductId}) Orders`,
      value: summaryData.topProductOrderCount,
    },
    {
      name: `Top Courier (${summaryData.topCourierService}) Orders`,
      value: summaryData.topCourierOrderCount,
    },
  ];

  const metrics = [
    { title: "Total Orders", value: summaryData.totalOrders },
    {
      title: "Total Revenue",
      value: `$${summaryData.totalRevenue.toLocaleString()}`,
    },
    {
      title: "Total Commission",
      value: `$${summaryData.totalCommission.toLocaleString()}`,
    },
    {
      title: "Total Delivery Charge",
      value: `$${summaryData.totalDeliveryCharge.toLocaleString()}`,
    },
    {
      title: "Net Revenue",
      value: `$${summaryData.netRevenue.toLocaleString()}`,
    },
    { title: "Active Agents", value: summaryData.activeAgents },
    { title: "New Customers", value: summaryData.newCustomers },
    {
      title: "Total Unique Customers",
      value: summaryData.totalUniqueCustomers,
    },
    {
      title: "Overall Delivery Rate",
      value: `${summaryData.overallDeliveryRate}%`,
    },
    {
      title: "Overall Return Rate",
      value: `${summaryData.overallReturnRate}%`,
    },
  ];

  if (isLoading) {
    return <DailyReportSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "yyyy-MM-dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date: any) => date && setDate(date)}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-transparent">Reset</label>
            <Button
              variant="destructive"
              className="px-4"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-900 dark:text-white">
            {report?.reportType}
          </p>
          <p className="flex flex-col space-y-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {format(new Date(report?.reportDate), "yyyy-MM-dd")} →{" "}
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="bg-gray-800 dark:bg-gray-700">
            <CardHeader>
              <CardTitle>{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>{metric.value}</CardContent>
          </Card>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gray-800 dark:bg-gray-700">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {orderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 dark:bg-gray-700">
          <CardHeader>
            <CardTitle>Top Performance</CardTitle>{" "}
          </CardHeader>{" "}
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topData}>
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" /> <Tooltip /> <Legend />
                <Bar dataKey="value" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyReport;
