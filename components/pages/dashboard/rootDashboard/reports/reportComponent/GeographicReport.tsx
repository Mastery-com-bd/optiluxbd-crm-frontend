/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetGeographicReportQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { bangladeshData } from "@/constants/DivisionDataset";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PackageReportSkeleton from "./reportSkeleton/PackageReportSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TGeographicRow } from "@/types/report/geographicDataType";

const GeographicReport = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);
  const [division, setDivision] = useState("");
  const [city, setCity] = useState("");

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

  const divisionList = bangladeshData.map((d) => d.division);

  const cityList =
    bangladeshData.find((d) => d.division === division)?.districts || [];

  const { data, isLoading } = useGetGeographicReportQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  const rows = (report?.data as TGeographicRow[]) || [];
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
    setDivision("");
    setCity("");
  };

  if (isLoading) {
    return <PackageReportSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          {/* divission */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Division
            </label>

            <Select
              value={division}
              onValueChange={(value) => {
                setDivision(value);
                setCity("");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                {divisionList.map((div) => (
                  <SelectItem key={div} value={div}>
                    {div}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              City
            </label>

            <Select
              value={city}
              onValueChange={(value) => {
                setCity(value);
              }}
              disabled={!division}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    !division ? "Select division first" : "Select City"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {cityList.map((c) => (
                  <SelectItem key={c.city} value={c.city}>
                    {c.city}
                  </SelectItem>
                ))}
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
              {format(new Date(report?.period.startDate), "yyyy-MM-dd")} →{" "}
              {format(new Date(report?.period.endDate), "yyyy-MM-dd")}
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
              Total Locations
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalLocations}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Orders
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalOrders}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total totalRevenue
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-6">
        <div>
          {/* Orders by Location */}
          <Card>
            <CardHeader>
              <CardTitle>Orders by Location</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rows}>
                  <XAxis dataKey="city" stroke="currentColor" />
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

                  {/* Gradient for Orders */}
                  <defs>
                    <linearGradient
                      id="ordersColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#34d399"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>

                  <Bar
                    dataKey="totalOrders"
                    fill="url(#ordersColor)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Area */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Area</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rows}>
                  <XAxis dataKey="city" stroke="currentColor" />
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

                  {/* Gradient for Revenue */}
                  <defs>
                    <linearGradient
                      id="revenueColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#a78bfa"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>

                  <Bar
                    dataKey="totalRevenue"
                    fill="url(#revenueColor)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Courier Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Top Courier Usage</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] flex justify-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={rows}
                    dataKey="topCourierCount"
                    nameKey="topCourierService"
                    outerRadius={120}
                    innerRadius={60} // makes donut for depth
                    paddingAngle={3}
                    label
                  >
                    {rows.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          [
                            "#6366f1",
                            "#f43f5e",
                            "#10b981",
                            "#fbbf24",
                            "#8b5cf6",
                            "#3b82f6",
                          ][index % 6]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* DATA TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Geographic Data</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Division</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Thana</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Return</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Success Rate (%)</TableHead>
                    <TableHead>Top Courier</TableHead>
                    <TableHead>Return Rate</TableHead>
                    <TableHead>Avarage</TableHead>
                    <TableHead>Couriar Count</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map((row: TGeographicRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{row?.division}</TableCell>
                      <TableCell>{row?.city}</TableCell>
                      <TableCell>{row?.thana}</TableCell>
                      <TableCell>{row?.totalOrders}</TableCell>
                      <TableCell>{row?.deliveredOrders}</TableCell>
                      <TableCell>{row?.returnedOrders}</TableCell>
                      <TableCell>{row?.totalRevenue.toFixed(2)}</TableCell>
                      <TableCell>{row?.deliverySuccessRate}</TableCell>
                      <TableCell>{row?.topCourierService}</TableCell>
                      <TableCell>{row?.returnRate}</TableCell>
                      <TableCell>{row?.averageOrderValue}</TableCell>
                      <TableCell>{row?.topCourierCount}</TableCell>
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

export default GeographicReport;
