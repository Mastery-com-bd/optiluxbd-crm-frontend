/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAgentReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import SearchAgentInput from "./inputFields/SearchAgentInput";
import SearchLeaderFields from "./inputFields/SearchLeaderFields";
import TeamReportSkeleton from "./reportSkeleton/TeamReportSkeleton";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TAgentReport,
  TAgentReportSummary,
} from "@/types/report/agentReportType";
import AgentReportSkeleton from "./reportSkeleton/AgentReportSkeleton";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CF0",
  "#FF6584",
];

export type TAgentReportFilter = {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
  agentId?: string;
  teamLeaderId?: string;
};

const AgentReport = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<TAgentReportFilter>({
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
    agentId: "",
    teamLeaderId: "",
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

  const { data, isLoading } = useGetAgentReportsQuery(filters, {
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
      agentId: "",
      teamLeaderId: "",
    });
    setStartDate(firstDayOfMonth);
    setEndDate(today);
  };

  const agents = (report?.data as TAgentReport[]) || [];
  const summary = report?.summary as TAgentReportSummary;

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Pie chart data: top 5 agents by totalSalesAmount
  const pieData = [...agents]
    .sort((a, b) => b.totalSalesAmount - a.totalSalesAmount)
    .slice(0, 5)
    .map((a) => ({ name: a.agentName, value: a.totalSalesAmount }));

  if (isLoading) {
    return <AgentReportSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="space-y-4 px-6">
        <div className="flex items-end justify-between gap-4">
          <SearchAgentInput
            reportFilter={filters}
            setReportFilter={setFilters}
          />
          <SearchLeaderFields
            reportFilter={filters}
            setReportFilter={setFilters}
          />
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
              {report?.period?.startDate
                ? format(new Date(report?.period?.startDate), "yyyy-MM-dd")
                : "No date"}{" "}
              →
              {report?.period?.endDate
                ? format(new Date(report?.period?.endDate), "yyyy-MM-dd")
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
              Total Agents
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {summary?.totalAgents}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Commissions
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {summary?.totalCommission.toFixed(2)}
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
              {summary?.totalOrders}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Revenue
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {summary?.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <Card className="w-full h-80">
          <CardContent className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => Number(value).toLocaleString()}
                />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Delivered</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Average Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <React.Fragment key={agent.agentId}>
                  <TableRow className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                    <TableCell>{agent?.agentUserId}</TableCell>
                    <TableCell>{agent?.agentName}</TableCell>
                    <TableCell>{agent?.agentEmail}</TableCell>
                    <TableCell>{agent?.agentPhone}</TableCell>
                    <TableCell>{agent?.totalOrders}</TableCell>
                    <TableCell>{agent?.deliveredOrders}</TableCell>
                    <TableCell>{agent?.pendingOrders}</TableCell>
                    <TableCell>{agent?.totalSalesAmount.toFixed(2)}</TableCell>
                    <TableCell>{agent?.totalCommission.toFixed(2)}</TableCell>
                    <TableCell>
                      {Number(agent?.averageOrderValue).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => toggleRow(agent?.agentId)}
                      >
                        {expandedRows.includes(agent?.agentId)
                          ? "Hide Orders"
                          : "View Orders"}
                      </button>
                    </TableCell>
                  </TableRow>

                  {expandedRows.includes(agent?.agentId) && (
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        className="bg-gray-50 dark:bg-gray-900 p-4"
                      >
                        <Table className="w-full">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Product</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Total Amount</TableHead>
                              <TableHead>Commission</TableHead>
                              <TableHead>Order Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {agent.orders.map((order) => (
                              <TableRow key={order?.id}>
                                <TableCell>{order?.id}</TableCell>
                                <TableCell>{order?.product?.name}</TableCell>
                                <TableCell>{order?.customer?.name}</TableCell>
                                <TableCell>{order?.quantity}</TableCell>
                                <TableCell>
                                  {Number(order?.totalAmount).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {Number(order?.commission).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {new Date(
                                    order?.orderDate
                                  ).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AgentReport;
