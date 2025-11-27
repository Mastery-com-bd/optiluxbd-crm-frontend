/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetPackagesReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import SearchPackageInput from "./inputFields/SearchPackageInput";
import PackageReportSkeleton from "./reportSkeleton/PackageReportSkeleton";

export type TPackageReportFIlter = {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
  packageId: string;
};

const PackageReport = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);

  const [filters, setFilters] = useState<TPackageReportFIlter>({
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
    packageId: "",
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

  const { data, isLoading } = useGetPackagesReportsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;

  const resetFilters = () => {
    setFilters({
      sortBy: "created_at",
      order: "desc",
      limit: 10,
      page: 1,
      startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      endDate: format(today, "yyyy-MM-dd"),
      packageId: "",
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
          <SearchPackageInput
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
              Total Order
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
              Total Package
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalPackages}
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
              {report?.summary?.totalRevenue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageReport;
