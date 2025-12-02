"use client";

import { useGetAgentReportQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import { TeamPerformance } from "@/types/report/hourlyTeamTarget";
import {
  TAGentHourlyBucket,
  THourly,
  THourlyTarget,
  TMyAgentsReport,
} from "@/types/report/myAgentReportType";
import { useState } from "react";
import { THourlyReport } from "../hourlyReport/HourlyTeamreport";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hoursGap } from "../hourlyReport/HourlyteamTarget";
import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Target,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Clock,
  AlertCircle,
  CheckCircle,
  CalendarIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AgentReportSkeleton from "./AgentReportSkeleton";

const MyAgentsReport = () => {
  const [gap, setGap] = useState("all");
  const [filters, setFilters] = useState<THourlyReport>({
    date: "",
    gap: "",
  });

  // get all agents report
  const { data, isLoading } = useGetAgentReportQuery(filters, {
    refetchOnMountOrArgChange: true,
  });
  const report = data?.data as TMyAgentsReport;
  const hourlyReport = report?.hourly as THourly;
  const hourlyTarget = report?.hourlyTarget as THourlyTarget;
  const hourlyBuckets = (hourlyReport?.buckets as TAGentHourlyBucket[]) || [];
  const hourlyTargetBuckets =
    (hourlyTarget?.buckets as TeamPerformance[]) || [];

  // summary data
  const totalTarget = hourlyTarget?.totalTarget;
  const totalAchievedSales = hourlyTarget?.totalSale;
  const overallAchievement = hourlyTarget?.overallAchievement;
  const fallbackActualSales = hourlyBuckets.reduce(
    (sum, b) => sum + b?.totalAmount,
    0
  );
  const totalActualSales =
    totalAchievedSales > 0 ? totalAchievedSales : fallbackActualSales;
  const totalActualOrders = hourlyBuckets.reduce(
    (sum, b) => sum + b?.totalOrders,
    0
  );
  const hoursOnTarget = hourlyTargetBuckets.filter(
    (b) => b.achievementPercent >= 100
  ).length;

  // marge data
  const mergedData = hourlyBuckets.map((bucket) => {
    const targetBucket = hourlyTargetBuckets.find(
      (t) => t.timestampLocal === bucket?.timestampLocal
    );

    const timeLabel = new Date(bucket?.timestampLocal).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    return {
      time: timeLabel,
      actualSales: bucket?.totalAmount,
      actualOrders: bucket?.totalOrders,
      targetSales: targetBucket?.teamSale || 0,
      targetAmount: targetBucket?.teamTarget || 0,
      achievement: targetBucket?.achievementPercent || 0,
      gap: (targetBucket?.teamTarget || 0) - bucket?.totalAmount,
    };
  });

  // Achievement Distribution for Pie Chart
  const achievementDist = [
    { name: "Excellent (>120%)", value: 0, color: "#10b981" },
    { name: "Good (100-120%)", value: 0, color: "#3b82f6" },
    { name: "Average (80-100%)", value: 0, color: "#f59e0b" },
    { name: "Below (<80%)", value: 0, color: "#ef4444" },
  ];

  hourlyTargetBuckets.forEach((b) => {
    if (b?.achievementPercent > 120) achievementDist[0].value++;
    else if (b?.achievementPercent >= 100) achievementDist[1].value++;
    else if (b?.achievementPercent >= 80) achievementDist[2].value++;
    else achievementDist[3].value++;
  });

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const resetFilters = () => {
    setFilters({ date: "", gap: "" });
    setGap("all");
  };

  if (isLoading) {
    return <AgentReportSkeleton />;
  }

  if (!report || hourlyBuckets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <p>No report data available for selected filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <div className="flex items-end gap-4">
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
              <h1 className="text-2xl font-bold">{hourlyReport?.reportType}</h1>
              <p className="opacity-90">
                {hourlyTarget?.date
                  ? new Date(hourlyTarget?.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No date available"}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">
                  {formatTime(hourlyTarget?.workWindow?.startLocal || "")} -{" "}
                  {formatTime(hourlyTarget?.workWindow?.endLocal || "")}
                </span>
              </div>
              <p className="text-sm opacity-90">
                Interval: {hourlyReport?.intervalHours} hour
                {hourlyReport?.intervalHours > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </Card>
      </div>
      {/* summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Achievement
            </CardTitle>
            {overallAchievement >= 100 ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Target className="h-5 w-5 text-amber-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallAchievement.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {hoursOnTarget} / {hourlyTargetBuckets.length} hours on target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actual Sales</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{totalActualSales.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalActualOrders} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Sales</CardTitle>
            <Target className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{totalTarget.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Assigned target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Achievement Gap
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                totalTarget - totalActualSales > 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              ৳{Math.abs(totalTarget - totalActualSales).toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalTarget > totalActualSales ? "Behind" : "Ahead"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg AOS</CardTitle>
            <ShoppingCart className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳
              {totalActualOrders > 0
                ? (totalActualSales / totalActualOrders).toFixed(0)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">Average Order Size</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievement Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Achievement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={achievementDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {achievementDist.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {achievementDist.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
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
          </CardContent>
        </Card>

        {/* Target vs Actual Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Target vs Actual Sales</CardTitle>
            <CardDescription>Hourly performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={mergedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="targetAmount"
                  fill="#6366f1"
                  name="Target"
                />
                <Bar
                  yAxisId="left"
                  dataKey="actualSales"
                  fill="#10b981"
                  name="Actual Sales"
                />
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
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Breakdown</CardTitle>
          <CardDescription>
            Detailed target vs actual performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Time Slot</th>
                  <th className="text-right py-3 px-4">Target</th>
                  <th className="text-right py-3 px-4">Actual Sales</th>
                  <th className="text-center py-3 px-4">Orders</th>
                  <th className="text-right py-3 px-4">Gap</th>
                  <th className="text-center py-3 px-4">Achievement</th>
                  <th className="text-center py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.map((row, i) => {
                  const isOnTarget = row.achievement >= 100;
                  const isGood = row.achievement >= 80;

                  return (
                    <tr
                      key={i}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-4 px-4 font-medium">
                        {row.time}
                        <span className="text-xs text-gray-500 block">
                          ~ {formatTime(hourlyBuckets[i]?.bucketEndLocal || "")}
                        </span>
                      </td>
                      <td className="text-right">
                        ৳{row.targetAmount.toFixed(0)}
                      </td>
                      <td className="text-right font-semibold text-green-600">
                        ৳{row.actualSales.toFixed(0)}
                      </td>
                      <td className="text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {row.actualOrders}
                        </span>
                      </td>
                      <td
                        className={`text-right font-medium ${
                          row.gap > 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {row.gap > 0 ? "-" : "+"}৳{Math.abs(row.gap).toFixed(0)}
                      </td>
                      <td className="text-center">
                        <div className="inline-block">
                          <div
                            className={`font-bold ${
                              isOnTarget
                                ? "text-green-600"
                                : isGood
                                ? "text-blue-600"
                                : "text-red-600"
                            }`}
                          >
                            {row.achievement.toFixed(1)}%
                          </div>
                          <div className="w-20 h-2 bg-gray-200 rounded-full mt-1 mx-auto overflow-hidden">
                            <div
                              className={`h-full ${
                                isOnTarget
                                  ? "bg-green-500"
                                  : isGood
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.min(row.achievement, 100)}%`,
                              }}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAgentsReport;
