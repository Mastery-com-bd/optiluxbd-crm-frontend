/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
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
import { useGetCurrierReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import CuriarSkeleton from "./reportSkeleton/CuriarSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TCourierPerformanceItem } from "@/types/report/couriarServiceDataType";

export type TCoriarReportFilter = {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
  courierService: string;
};

const CourierReport = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);
  const [courierService, setCourierService] = useState("All");

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

  const { data, isLoading } = useGetCurrierReportsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  const rows = (report?.data as TCourierPerformanceItem[]) || [];

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

  const pieColors = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#8b5cf6",
    "#14b8a6",
    "#f43f5e",
  ];

  if (isLoading) {
    return <CuriarSkeleton />;
  }
  return (
    <div className="space-y-4 p-6">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Select
              value={courierService}
              onValueChange={(value) => {
                setCourierService(value);
                setFilters((prev) => ({
                  ...prev,
                  courierService: value === "All" ? "" : value,
                  page: 1,
                }));
              }}
            >
              <SelectTrigger
                className="w-40"
                aria-label="Couriar Service Filter"
              >
                <SelectValue placeholder="Couriar Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Couriar</SelectItem>
                <SelectItem value="Steadfast">Stead Fast</SelectItem>
                <SelectItem value="Pathao">Pathao</SelectItem>
                <SelectItem value="RedX">RedX</SelectItem>
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
              {report?.period.startDate
                ? format(new Date(report?.period.startDate), "yyyy-MM-dd")
                : "No date"}{" "}
              →{" "}
              {report?.period.startDate
                ? format(new Date(report?.period.endDate), "yyyy-MM-dd")
                : "No date"}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className="border rounded-xl p-4 shadow-sm
                  bg-white dark:bg-gray-900
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Couriars
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalCouriers}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm
                  bg-white dark:bg-gray-900
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Deliveried
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalDelivered}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm
                  bg-white dark:bg-gray-900
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Returned
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalReturned}
            </p>
          </div>
          <div
            className="border rounded-xl p-4 shadow-sm
                  bg-white dark:bg-gray-900
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Shipments
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalShipments}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {/* 1️⃣ TOTAL SHIPMENTS BAR CHART */}
        <div className="flex justify-between gap-8">
          {/* 1️⃣ TOTAL SHIPMENTS BAR CHART */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Total Shipments by Courier</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rows}>
                  <XAxis dataKey="courierService" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    wrapperClassName="rounded-lg overflow-hidden"
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                    labelStyle={{
                      color: "var(--text-color)",
                    }}
                    itemStyle={{
                      color: "var(--text-color)",
                    }}
                  />

                  <defs>
                    <linearGradient
                      id="shipmentsColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>

                  <Bar
                    dataKey="totalShipments"
                    fill="url(#shipmentsColor)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 2️⃣ DELIVERY SUCCESS PIE CHART */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Delivery Success Share</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="70%" height="100%">
                <PieChart>
                  <Pie
                    data={rows}
                    dataKey="deliveredShipments"
                    nameKey="courierService"
                    outerRadius={115}
                    label
                    isAnimationActive={false}
                  >
                    {rows.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={pieColors[idx % pieColors.length]}
                        stroke="#ffffff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 3️⃣ FULL DATA TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Courier Statistics Table</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Courier</TableHead>
                    <TableHead>Total Shipments</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Returned</TableHead>
                    <TableHead>Cancelled</TableHead>
                    <TableHead>COD Amount</TableHead>
                    <TableHead>Delivery Charge</TableHead>
                    <TableHead>Success Rate (%)</TableHead>
                    <TableHead>Avg Charge</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map((item: TCourierPerformanceItem, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.courierService}</TableCell>
                      <TableCell>{item.totalShipments}</TableCell>
                      <TableCell>{item.deliveredShipments}</TableCell>
                      <TableCell>{item.pendingShipments}</TableCell>
                      <TableCell>{item.returnedShipments}</TableCell>
                      <TableCell>{item.cancelledShipments}</TableCell>
                      <TableCell>{item.totalCODAmount}</TableCell>
                      <TableCell>{item.totalDeliveryCharge}</TableCell>
                      <TableCell>{item.deliverySuccessRate}%</TableCell>
                      <TableCell>{item.averageDeliveryCharge}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourierReport;
