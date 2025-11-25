/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetOverviewReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PackageReportSkeleton from "./reportSkeleton/PackageReportSkeleton";

const AllOverview = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);

  const [filters, setFilters] = useState({
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      if (!startDate || !endDate) return;
      setFilters((prev: any) => ({
        ...prev,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        page: 1,
      }));
    });
  }, [startDate, endDate]);

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

  const { data, isLoading } = useGetOverviewReportsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  console.log(report);
  const resetFilters = () => {
    setFilters({
      sortBy: "created_at",
      order: "desc",
      limit: 10,
      page: 1,
      startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      endDate: format(today, "yyyy-MM-dd"),
    });
    setStartDate(firstDayOfMonth);
    setEndDate(today);
  };

  if (isLoading) {
    return <PackageReportSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(startDate, "yyyy-MM-dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date: any) => date && setStartDate(date)}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(endDate, "yyyy-MM-dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date: any) => date && setEndDate(date)}
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
              {format(new Date(report?.period?.startDate), "yyyy-MM-dd")} →{" "}
              {format(new Date(report?.period?.endDate), "yyyy-MM-dd")}
            </span>
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Agent Performance */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Agents
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.agentPerformance?.summary?.totalAgents}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Orders
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.agentPerformance?.summary?.totalOrders}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Revenue
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              ${report?.agentPerformance?.summary?.totalRevenue}
            </p>
          </div>

          {/* Courier Performance */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Couriers
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.courierPerformance?.summary?.totalCouriers}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Shipments
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.courierPerformance?.summary?.totalShipments}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Delivered / Returned
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.courierPerformance?.summary?.totalDelivered} /{" "}
              {report?.courierPerformance?.summary?.totalReturned}
            </p>
          </div>

          {/* Product Performance */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Products
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.productPerformance?.summary?.totalProducts}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Orders
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.productPerformance?.summary?.totalOrders}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Revenue
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              ${report?.productPerformance?.summary?.totalRevenue}
            </p>
          </div>

          {/* Geographic Distribution */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Locations
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.geographicDistribution?.summary?.totalLocations}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Orders
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.geographicDistribution?.summary?.totalOrders}
            </p>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Revenue
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              ${report?.geographicDistribution?.summary?.totalRevenue}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Agents Bar Chart */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Top Agents
            </h3>
            {report?.agentPerformance?.topAgents.length ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={report.agentPerformance.topAgents}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="totalOrders" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No data available
              </p>
            )}
          </div>

          {/* Top Products Pie Chart */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Top Products
            </h3>
            {report?.productPerformance?.topProducts.length ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={report.productPerformance.topProducts}
                    dataKey="totalOrders"
                    nameKey="name"
                    outerRadius={80}
                    fill="#10b981"
                    label
                  >
                    {report.productPerformance.topProducts.map(
                      (_: any, index: number) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No data available
              </p>
            )}
          </div>
        </div>

        {/* Tables */}
        <div className="space-y-8">
          {/* Top Agents Table */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Top Agents
            </h3>
            {report?.agentPerformance?.topAgents.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Name
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Orders
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Revenue
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Commission
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.agentPerformance.topAgents.map((agent: any) => (
                      <tr
                        key={agent.id}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-3 py-2">{agent.name}</td>
                        <td className="px-3 py-2">{agent.totalOrders}</td>
                        <td className="px-3 py-2">${agent.totalRevenue}</td>
                        <td className="px-3 py-2">${agent.totalCommission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No data available
              </p>
            )}
          </div>

          {/* Top Products Table */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Top Products
            </h3>
            {report?.productPerformance?.topProducts.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Product Name
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Orders
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Quantity
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.productPerformance.topProducts.map(
                      (product: any) => (
                        <tr
                          key={product.id}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <td className="px-3 py-2">{product.name}</td>
                          <td className="px-3 py-2">{product.totalOrders}</td>
                          <td className="px-3 py-2">{product.totalQuantity}</td>
                          <td className="px-3 py-2">${product.totalRevenue}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No data available
              </p>
            )}
          </div>

          {/* Top Locations Table */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Top Locations
            </h3>
            {report?.geographicDistribution?.topLocations.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Location
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Orders
                      </th>
                      <th className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.geographicDistribution.topLocations.map(
                      (loc: any) => (
                        <tr
                          key={loc.id}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <td className="px-3 py-2">{loc.name}</td>
                          <td className="px-3 py-2">{loc.totalOrders}</td>
                          <td className="px-3 py-2">${loc.totalRevenue}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOverview;
