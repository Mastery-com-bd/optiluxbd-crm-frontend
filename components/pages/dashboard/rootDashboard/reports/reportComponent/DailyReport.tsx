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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Tsummary {
  activeAgents: number;
  totalOrders: number;
  newOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  returnedOrders: number;
  netRevenue: number;
  totalCommission: number;
  topAgentId: number;
  topAgentOrderCount: number;
  topCourierService: string;
  totalRevenue?: number;
  topCourierOrderCount?: number;
}

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
  const summaryData = report?.summary;

  const orderStatusData = [
    {
      name: "Delivered",
      value: summaryData?.deliveredOrders || 0,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: summaryData?.pendingOrders || 0,
      color: "#f59e0b",
    },
    {
      name: "Cancelled",
      value: summaryData?.cancelledOrders || 0,
      color: "#ef4444",
    },
    {
      name: "Returned",
      value: summaryData?.returnedOrders || 0,
      color: "#6366f1",
    },
  ];

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

  const topAgentsData = [
    {
      name: `Agent ${summaryData?.topAgentId}`,
      orders: summaryData?.topAgentOrderCount || 0,
    },
  ];

  const topCourierData = [
    {
      name: summaryData?.topCourierService,
      orders: summaryData?.topCourierOrderCount || 0,
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

      <div className="space-y-6">
        <Card className="h-[350px]">
          <CardHeader>
            <CardTitle>Top Agent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topAgentsData}>
                <XAxis dataKey="name" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip />
                <Bar dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Orders Type</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Revenue / Commission</TableHead>
                  <TableHead>Top Agent</TableHead>
                  <TableHead>Top Courier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total Orders</TableCell>
                  <TableCell>{summaryData.totalOrders}</TableCell>
                  <TableCell>{summaryData.netRevenue.toFixed(2)}</TableCell>
                  <TableCell>{`Agent ${summaryData.topAgentId}`}</TableCell>
                  <TableCell>{summaryData.topCourierService}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Delivered Orders</TableCell>
                  <TableCell>{summaryData.deliveredOrders}</TableCell>
                  <TableCell>
                    {summaryData.totalRevenue?.toFixed(2) ?? "-"}
                  </TableCell>
                  <TableCell>{`Agent ${summaryData.topAgentId}`}</TableCell>
                  <TableCell>{summaryData.topCourierService}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pending Orders</TableCell>
                  <TableCell>{summaryData.pendingOrders}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cancelled Orders</TableCell>
                  <TableCell>{summaryData.cancelledOrders}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Returned Orders</TableCell>
                  <TableCell>{summaryData.returnedOrders}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyReport;
