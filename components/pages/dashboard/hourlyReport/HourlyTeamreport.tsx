/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetHourlyTeamReportQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import { THourlyReportItem } from "@/types/report/hourlyReportType";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HourlyReportSkeleton from "./skeleton/HourlyReportSkeleton";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { convertDate } from "@/utills/dateConverter";
import LeaderList from "./LeaderList";

export type THourlyReport = {
  startDate?: string;
  endDate?: string;
  gap: string;
  teamLeaderId?: string;
  leaderId?: string;
  date?: string;
};

const hoursGap = [
  { name: "1 Hour", value: "1" },
  { name: "2 Hours", value: "2" },
  { name: "3 Hour", value: "3" },
  { name: "4 Hour", value: "4" },
  { name: "5 Hour", value: "5" },
  { name: "6 Hour", value: "6" },
];

const HourlyTeamreport = () => {
  const [gap, setGap] = useState("all");
  const [filters, setFilters] = useState<THourlyReport>({
    startDate: "",
    endDate: "",
    gap: "",
    teamLeaderId: "",
  });

  const { data, isLoading } = useGetHourlyTeamReportQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  const teamReports = (report?.buckets as THourlyReportItem[]) || [];

  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      gap: "",
      teamLeaderId: "",
    });
    setGap("all");
  };

  const calculateSummary = () => {
    const totalAmount = teamReports.reduce(
      (sum, item) => sum + item?.totalAmount,
      0
    );
    const totalOrders = teamReports.reduce(
      (sum, item) => sum + item?.totalOrders,
      0
    );
    const avgOrderValue = totalOrders > 0 ? totalAmount / totalOrders : 0;
    const peakHour = teamReports.reduce(
      (max, item) => (item?.totalAmount > max?.totalAmount ? item : max),
      teamReports[0] || { totalAmount: 0, timestampLocal: "N/A" }
    );

    return {
      totalAmount,
      totalOrders,
      avgOrderValue,
      peakHour: peakHour.timestampLocal,
      peakHourAmount: peakHour.totalAmount,
    };
  };

  // Prepare hourly chart data
  const prepareHourlyData = () => {
    return teamReports.map((item) => {
      const time = new Date(item?.timestampLocal).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return {
        time,
        orders: item?.totalOrders,
        amount: item?.totalAmount,
        avgOrder:
          item?.totalOrders > 0 ? item?.totalAmount / item?.totalOrders : 0,
      };
    });
  };

  // Prepare performance distribution data
  const prepareDistributionData = () => {
    const totalAmount = teamReports.reduce(
      (sum, item) => sum + item?.totalAmount,
      0
    );

    // Group by time periods (Morning, Afternoon, Evening, Night)
    const periods = {
      Morning: { amount: 0, orders: 0, color: "#fbbf24" },
      Afternoon: { amount: 0, orders: 0, color: "#f97316" },
      Evening: { amount: 0, orders: 0, color: "#8b5cf6" },
      Night: { amount: 0, orders: 0, color: "#3b82f6" },
    };

    teamReports.forEach((item) => {
      const hour = new Date(item?.timestampLocal).getHours();
      if (hour >= 6 && hour < 12) {
        periods.Morning.amount += item.totalAmount;
        periods.Morning.orders += item.totalOrders;
      } else if (hour >= 12 && hour < 17) {
        periods.Afternoon.amount += item.totalAmount;
        periods.Afternoon.orders += item.totalOrders;
      } else if (hour >= 17 && hour < 21) {
        periods.Evening.amount += item.totalAmount;
        periods.Evening.orders += item.totalOrders;
      } else {
        periods.Night.amount += item.totalAmount;
        periods.Night.orders += item.totalOrders;
      }
    });

    return Object.entries(periods).map(([name, data]) => ({
      name,
      value:
        totalAmount > 0 ? Math.round((data?.amount / totalAmount) * 100) : 0,
      amount: data?.amount,
      orders: data?.orders,
      color: data?.color,
    }));
  };

  // Get top performing hours
  const getTopPerformingHours = () => {
    return [...teamReports]
      .sort((a, b) => b?.totalAmount - a?.totalAmount)
      .slice(0, 5)
      .map((item) => ({
        time: new Date(item?.timestampLocal).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          day: "2-digit",
          month: "short",
        }),
        amount: item?.totalAmount,
        orders: item?.totalOrders,
        avgOrder:
          item?.totalOrders > 0 ? item?.totalAmount / item?.totalOrders : 0,
      }));
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const summary = calculateSummary();
  const hourlyData = prepareHourlyData();
  const distributionData = prepareDistributionData();
  const topHours = getTopPerformingHours();

  if (isLoading) {
    return <HourlyReportSkeleton />;
  }
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <LeaderList
            reportFilter={filters}
            setReportFilter={setFilters}
            field="teamLeaderId"
          />
          <div>
            <Select
              value={gap}
              onValueChange={(value) => {
                setGap(value);
                setFilters((prev) => ({
                  ...prev,
                  gap: value === "all" ? "" : value,
                  page: 1,
                }));
              }}
            >
              <SelectTrigger className="w-40" aria-label="Category Filter">
                <SelectValue placeholder="Hours Gap" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Select Hours gap</SelectItem>
                {hoursGap.map(
                  (item: { name: string; value: string }, index: number) => (
                    <SelectItem key={index} value={item?.value}>
                      {item?.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? filters.startDate : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    filters.startDate ? new Date(filters.startDate) : undefined
                  }
                  onSelect={(date: any) =>
                    date &&
                    setFilters((prev) => ({
                      ...prev,
                      startDate: date.toISOString().split("T")[0],
                    }))
                  }
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
                  {filters.endDate ? filters.endDate : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    filters.endDate ? new Date(filters.endDate) : undefined
                  }
                  onSelect={(date: any) =>
                    date &&
                    setFilters((prev) => ({
                      ...prev,
                      endDate: date.toISOString().split("T")[0],
                    }))
                  }
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
        <Card className="px-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{report?.reportType}</h1>
              <p className="opacity-90 flex items-center gap-2">
                {report?.period?.startLocal
                  ? new Date(report?.period?.startLocal).toLocaleDateString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }
                    )
                  : ""}
                →
                {report?.period?.endLocal
                  ? new Date(report?.period?.endLocal).toLocaleDateString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }
                    )
                  : ""}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">
                  {formatTime(report?.period?.startLocal || "")} -{" "}
                  {formatTime(report?.period?.endLocal || "")}
                </span>
              </div>
              <p className="text-sm opacity-90">
                Interval: {report.intervalHours} hour
                {report.intervalHours > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  ৳{summary.totalAmount.toFixed(2)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Revenue
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {summary.totalOrders}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Orders
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  ৳{summary.avgOrderValue.toFixed(2)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Avg Order Value
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 flex flex-col">
                  {/* {summary.peakHour.split(",")[1] || summary.peakHour} */}
                  <span>
                    {convertDate(new Date(summary?.peakHour)).creationDate}
                  </span>
                  <span>
                    {" "}
                    {convertDate(new Date(summary?.peakHour)).creationTime}
                  </span>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Peak Hour
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Distribution by Time Period */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Sales by Time Period
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Distribution across different times of day
            </p>

            <div className="flex items-center justify-center mb-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {distributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Hourly Performance Trends */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Hourly Performance Trends
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Orders and revenue over time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-gray-600 dark:text-gray-300">Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Revenue
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={hourlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="orders"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Orders"
                />
                <Bar
                  yAxisId="right"
                  dataKey="amount"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  name="Revenue Amount"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top Performing Hours Table */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Top Performing Hours
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Best performing time slots by revenue
              </p>
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
              Top 5
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Rank
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Time Slot
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Orders
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Avg Order Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {topHours.map((hour, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                            index === 0
                              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              : index === 1
                              ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              : index === 2
                              ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          }`}
                        >
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {hour.time}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold">
                        <ShoppingCart className="w-3 h-3" />
                        {hour.orders}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-sm font-bold text-gray-900 dark:text-gray-100 text-right">
                      ৳{hour.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-2 text-sm font-semibold text-green-600 dark:text-green-400 text-right">
                      ৳{hour.avgOrder.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detailed Hourly Breakdown Table */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Detailed Hourly Breakdown
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Complete hourly performance data
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Time Slot
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Bucket End
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Orders
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Avg Order Value
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamReports.map((item, index) => {
                  const avgOrder =
                    item.totalOrders > 0
                      ? item.totalAmount / item.totalOrders
                      : 0;
                  const performancePercent =
                    summary.totalAmount > 0
                      ? (item.totalAmount / summary.totalAmount) * 100
                      : 0;

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 px-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {new Date(item.timestampLocal).toLocaleString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="py-4 px-2 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(item.bucketEndLocal).toLocaleString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="py-4 px-2 text-center">
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {item.totalOrders}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-sm font-bold text-gray-900 dark:text-gray-100 text-right">
                        ৳{item.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-4 px-2 text-sm font-semibold text-green-600 dark:text-green-400 text-right">
                        ৳{avgOrder.toFixed(2)}
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-blue-500 to-green-500 rounded-full"
                              style={{
                                width: `${Math.min(
                                  performancePercent * 10,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {performancePercent.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HourlyTeamreport;
