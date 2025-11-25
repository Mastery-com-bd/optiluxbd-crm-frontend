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

  if (isLoading) {
    return <DailyReportSkeleton />;
  }
  return (
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
          <Button variant="destructive" className="px-4" onClick={resetFilters}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Active Agents */}
        <div
          className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Active Agents
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {report?.summary?.activeAgents}
          </p>
        </div>

        {/* Total Orders */}
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

        {/* New Orders */}
        <div
          className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            New Orders
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {report?.summary?.newOrders}
          </p>
        </div>

        {/* Pending Orders */}
        <div
          className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Pending Orders
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {report?.summary?.pendingOrders}
          </p>
        </div>

        {/* Delivered Orders */}
        <div
          className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Delivered Orders
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {report?.summary?.deliveredOrders}
          </p>
        </div>

        {/* Cancelled Orders */}
        <div
          className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Cancelled Orders
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {report?.summary?.cancelledOrders}
          </p>
        </div>

        {/* Net Revenue */}
        <div
          className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Net Revenue
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {report?.summary?.netRevenue}
          </p>
        </div>

        {/* Total Commission */}
        <div
          className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            Total Commission
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {report?.summary?.totalCommission}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
