"use client";

import { useState } from "react";
import { THourlyReport } from "./HourlyTeamreport";
import { useGetHourlyTeamTargetQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LeaderList from "./LeaderList";
import HourlyTeamtargetSkeleton from "./skeleton/HourlyTeamtargetSkeleton";
import {
  TeamPerformance,
  TTeamTargetReport,
  TWorkWindow,
} from "@/types/report/hourlyTeamTarget";
import { Card } from "@/components/ui/card";
import {
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Target,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export const hoursGap = [
  { name: "1 Hour", value: "1" },
  { name: "2 Hours", value: "2" },
  { name: "3 Hour", value: "3" },
  { name: "4 Hour", value: "4" },
  { name: "5 Hour", value: "5" },
  { name: "6 Hour", value: "6" },
];

const HourlyTeamTarget = () => {
  const [gap, setGap] = useState("all");
  const [filters, setFilters] = useState<THourlyReport>({
    date: "",
    gap: "",
    leaderId: "",
  });

  const { data, isLoading } = useGetHourlyTeamTargetQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const report = data?.data as TTeamTargetReport;
  const workWindow = report?.workWindow as TWorkWindow;
  const targetReports = (report?.buckets as TeamPerformance[]) || [];

  // Summary Calculations
  const totalOrders = targetReports.reduce(
    (sum, item) => sum + (item?.orderCount || 0),
    0
  );

  const hoursAboveTarget = targetReports.filter(
    (item) => (item?.achievementPercent || 0) >= 100
  ).length;

  const totalHours = targetReports.length;

  // Prepare Data for Charts
  const prepareHourlyData = () => {
    return targetReports.map((item) => {
      const time = new Date(item?.timestampLocal).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return {
        time,
        target: item?.teamTarget,
        sales: item?.teamSale,
        achievement: Number(item?.achievementPercent.toFixed(1)),
        orders: item?.orderCount,
        gap: item?.teamTarget - item?.teamSale,
      };
    });
  };

  const prepareAchievementDistribution = () => {
    const ranges: Record<
      string,
      { count: number; color: string; sales: number }
    > = {
      "Excellent (>120%)": { count: 0, color: "#10b981", sales: 0 },
      "Good (100-120%)": { count: 0, color: "#3b82f6", sales: 0 },
      "Average (80-100%)": { count: 0, color: "#f59e0b", sales: 0 },
      "Below Target (<80%)": { count: 0, color: "#ef4444", sales: 0 },
    };

    targetReports.forEach((item) => {
      const percent = item?.achievementPercent;
      if (percent > 120) {
        ranges["Excellent (>120%)"].count++;
        ranges["Excellent (>120%)"].sales += item?.teamSale;
      } else if (percent >= 100) {
        ranges["Good (100-120%)"].count++;
        ranges["Good (100-120%)"].sales += item?.teamSale;
      } else if (percent >= 80) {
        ranges["Average (80-100%)"].count++;
        ranges["Average (80-100%)"].sales += item?.teamSale;
      } else {
        ranges["Below Target (<80%)"].count++;
        ranges["Below Target (<80%)"].sales += item?.teamSale;
      }
    });

    return Object.entries(ranges).map(([name, { count, color, sales }]) => ({
      name,
      value: count,
      sales,
      color,
    }));
  };

  const getTopPerformingHours = () => {
    return [...targetReports]
      .sort((a, b) => b?.achievementPercent - a?.achievementPercent)
      .slice(0, 5)
      .map((item) => ({
        time: new Date(item?.timestampLocal).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        target: item?.teamTarget,
        sales: item?.teamSale,
        achievement: item?.achievementPercent,
        orders: item?.orderCount,
      }));
  };

  const getBottomPerformingHours = () => {
    return [...targetReports]
      .filter((item) => item?.achievementPercent < 80)
      .sort((a, b) => a?.achievementPercent - b?.achievementPercent)
      .slice(0, 5)
      .map((item) => ({
        time: new Date(item?.timestampLocal).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        target: item?.teamTarget,
        sales: item?.teamSale,
        achievement: item?.achievementPercent,
        gap: item?.teamTarget - item?.teamSale,
      }));
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const resetFilters = () => {
    setFilters({ date: "", gap: "", leaderId: "" });
    setGap("all");
  };

  const hourlyData = prepareHourlyData();
  const achievementDistribution = prepareAchievementDistribution();
  const topHours = getTopPerformingHours();
  const bottomHours = getBottomPerformingHours();

  if (isLoading) {
    return <HourlyTeamtargetSkeleton />;
  }

  if (!report || targetReports.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No data available for selected filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* filters */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <LeaderList
            reportFilter={filters}
            setReportFilter={setFilters}
            field="leaderId"
          />

          <Select
            value={gap}
            onValueChange={(value) => {
              setGap(value);
              setFilters((prev) => ({
                ...prev,
                gap: value === "all" ? "" : value,
              }));
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Hour Gap" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hours</SelectItem>
              {hoursGap.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date
                  ? new Date(filters.date).toLocaleDateString()
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.date ? new Date(filters.date) : undefined}
                onSelect={(date) =>
                  setFilters((prev) => ({
                    ...prev,
                    date: date ? date.toISOString().split("T")[0] : "",
                  }))
                }
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>

          <Button variant="destructive" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>

        {/* Header */}
        <Card className="px-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Team Hourly Target Report</h1>
              <p className="opacity-90">
                {new Date(report.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">
                  {formatTime(workWindow?.startLocal || "")} -{" "}
                  {formatTime(workWindow?.endLocal || "")}
                </span>
              </div>
              <p className="text-sm opacity-90">
                Interval: {report.intervalHours} hour
                {report.intervalHours > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  Overall Achievement
                </p>
                <p className="text-3xl font-bold">
                  {report.overallAchievement.toFixed(1)}%
                </p>
              </div>
              {report.overallAchievement >= 100 ? (
                <CheckCircle className="w-10 h-10 text-green-500" />
              ) : (
                <Target className="w-10 h-10 text-amber-500" />
              )}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-3xl font-bold">
                  ৳{report.totalSale.toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Target: ৳{report.totalTarget.toFixed(0)}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
                <p className="text-xs text-muted-foreground">
                  Avg: {(totalOrders / totalHours || 0).toFixed(1)}/hr
                </p>
              </div>
              <ShoppingCart className="w-10 h-10 text-blue-600" />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Hours On Target</p>
                <p className="text-3xl font-bold">
                  {hoursAboveTarget}/{totalHours}
                </p>
                <p className="text-xs text-muted-foreground">
                  {totalHours > 0
                    ? ((hoursAboveTarget / totalHours) * 100).toFixed(1)
                    : 0}
                  % Success
                </p>
              </div>
              <Award className="w-10 h-10 text-purple-600" />
            </div>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Achievement Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={achievementDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {achievementDistribution.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {achievementDistribution.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value} hrs</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Composed Chart */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-4">Target vs Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" angle={-45} textAnchor="end" height={70} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar
                yAxisId="left"
                dataKey="target"
                fill="#6366f1"
                name="Target"
              />
              <Bar yAxisId="left" dataKey="sales" fill="#10b981" name="Sales" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="achievement"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: "#f59e0b" }}
                name="Achievement %"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top & Bottom Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Top Performing Hours</h3>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Top 5
            </span>
          </div>
          <div className="space-y-3">
            {topHours.map((h, i) => (
              <div
                key={i}
                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                      #{i + 1}
                    </span>
                    <span className="font-medium">{h.time}</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {h.achievement.toFixed(1)}%
                  </span>
                </div>
                <div className="grid grid-cols-3 text-sm mt-2 text-gray-600">
                  <div>Target: ৳{h.target.toFixed(0)}</div>
                  <div>Sales: ৳{h.sales.toFixed(0)}</div>
                  <div>Orders: {h.orders}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Areas for Improvement</h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
              Bottom 5
            </span>
          </div>
          <div className="space-y-3">
            {bottomHours.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                All hours are above 80%!
              </p>
            ) : (
              bottomHours.map((h, i) => (
                <div
                  key={i}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-red-200 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                        #{i + 1}
                      </span>
                      <span className="font-medium">{h.time}</span>
                    </div>
                    <span className="text-xl font-bold text-red-600">
                      {h.achievement.toFixed(1)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 text-sm mt-2 text-gray-600">
                    <div>Target: ৳{h.target.toFixed(0)}</div>
                    <div>Sales: ৳{h.sales.toFixed(0)}</div>
                    <div>Gap: ৳{Math.abs(h.gap).toFixed(0)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Complete Hourly Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Time Slot</th>
                <th className="text-right py-3 px-4">Target</th>
                <th className="text-right py-3 px-4">Sales</th>
                <th className="text-center py-3 px-4">Orders</th>
                <th className="text-right py-3 px-4">Gap</th>
                <th className="text-center py-3 px-4">Achievement</th>
                <th className="text-center py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {targetReports.map((item, i) => {
                const gap = item.teamTarget - item.teamSale;
                const percent = item.achievementPercent;
                const isOnTarget = percent >= 100;
                const isGood = percent >= 80;

                return (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">
                          {formatTime(item.timestampLocal)}
                        </div>
                        <div className="text-xs text-gray-500">
                          ~ {formatTime(item.bucketEndLocal)}
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-medium">
                      ৳{item.teamTarget.toFixed(0)}
                    </td>
                    <td className="text-right font-medium">
                      ৳{item.teamSale.toFixed(0)}
                    </td>
                    <td className="text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {item.orderCount}
                      </span>
                    </td>
                    <td
                      className={`text-right font-medium ${
                        gap > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {gap > 0 ? "-" : "+"}৳{Math.abs(gap).toFixed(0)}
                    </td>
                    <td className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <span
                          className={`font-bold ${
                            isOnTarget
                              ? "text-green-600"
                              : isGood
                              ? "text-blue-600"
                              : "text-red-600"
                          }`}
                        >
                          {percent.toFixed(1)}%
                        </span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full ${
                              isOnTarget
                                ? "bg-green-500"
                                : isGood
                                ? "bg-blue-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      {isOnTarget ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : isGood ? (
                        <TrendingUp className="w-5 h-5 text-blue-500 mx-auto" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default HourlyTeamTarget;
