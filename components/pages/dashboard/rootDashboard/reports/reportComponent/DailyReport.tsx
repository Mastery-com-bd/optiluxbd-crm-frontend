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
import { Tsummary } from "@/types/report/TDailyReportSummaryType";

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
  console.log(report);
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

  const metrics = [
    { title: "Total Orders", value: summaryData?.totalOrders },
    { title: "New Orders", value: summaryData?.newOrders },
    { title: "Delivered Orders", value: summaryData?.deliveredOrders },
    { title: "Returned Orders", value: summaryData?.returnedOrders },
    { title: "Cancelled Orders", value: summaryData?.cancelledOrders },
    { title: "Pending Orders", value: summaryData?.pendingOrders },
    { title: "Net Revenue", value: `$${summaryData?.netRevenue}` },
    { title: "Total Revenue", value: `$${summaryData?.totalRevenue}` },
    { title: "Total Commission", value: `$${summaryData?.totalCommission}` },
    {
      title: "Total Delivery Charge",
      value: `$${summaryData?.totalDeliveryCharge}`,
    },
    { title: "Active Agents", value: summaryData?.activeAgents },
    { title: "New Customers", value: summaryData?.newCustomers },
    {
      title: "Total Unique Customers",
      value: summaryData?.totalUniqueCustomers,
    },
    {
      title: "Overall Delivery Rate",
      value: `${summaryData?.overallDeliveryRate}%`,
    },
    {
      title: "Overall Return Rate",
      value: `${summaryData?.overallReturnRate}%`,
    },
    { title: "Top Agent ID", value: summaryData?.topAgentId ?? "N/A" },
    { title: "Top Agent Orders", value: summaryData?.topAgentOrderCount },
    { title: "Top Product ID", value: summaryData?.topProductId ?? "N/A" },
    { title: "Top Product Orders", value: summaryData?.topProductOrderCount },
    {
      title: "Top Courier Service",
      value: summaryData?.topCourierService ?? "N/A",
    },
    { title: "Top Courier Orders", value: summaryData?.topCourierOrderCount },
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
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {metrics.map((metric, i) => {
            let numericValue = 0;
            let displayValue = "0";

            if (metric.value !== null && metric.value !== undefined) {
              if (typeof metric.value === "number") {
                numericValue = metric.value;
                displayValue = metric.value.toString();
              } else if (typeof metric.value === "string") {
                const parsed = parseFloat(metric.value.replace(/[^\d.]/g, ""));
                numericValue = isNaN(parsed) ? 0 : parsed;
                displayValue = displayValue = isNaN(parsed)
                  ? "0"
                  : metric.value;
              }
            }

            const isRate = metric.title.toLowerCase().includes("rate");

            return (
              <div
                key={i}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm flex flex-col items-center justify-center"
              >
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  {metric.title}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1 text-center">
                  {displayValue}
                </p>
                {isRate && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${numericValue}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "New Orders", value: summaryData?.newOrders },
                      {
                        name: "Delivered Orders",
                        value: summaryData?.deliveredOrders,
                      },
                      {
                        name: "Returned Orders",
                        value: summaryData?.returnedOrders,
                      },
                      {
                        name: "Cancelled Orders",
                        value: summaryData?.cancelledOrders,
                      },
                      {
                        name: "Pending Orders",
                        value: summaryData?.pendingOrders,
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {[
                      "#60a5fa",
                      "#10b981",
                      "#f43f5e",
                      "#fbbf24",
                      "#8b5cf6",
                    ].map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Top Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: `Top Agent (${summaryData?.topAgentId ?? "N/A"})`,
                      value: summaryData?.topAgentOrderCount,
                    },
                    {
                      name: `Top Product (${
                        summaryData?.topProductId ?? "N/A"
                      })`,
                      value: summaryData?.topProductOrderCount,
                    },
                    {
                      name: `Top Courier (${
                        summaryData?.topCourierService ?? "N/A"
                      })`,
                      value: summaryData?.topCourierOrderCount,
                    },
                  ]}
                >
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
