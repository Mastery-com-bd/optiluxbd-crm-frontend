/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetOverviewReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import {
  AllReportData,
  TAgentPerformanceType,
} from "@/types/overAllReport/agentPerformanceType";
import { TCouriarperformanceType } from "@/types/overAllReport/couriarPerformanceType";
import { TProductPerformence } from "@/types/report/productReportdataTypes";
import { TGeographicPerformance } from "@/types/overAllReport/geographicOerformance";
import DashboardSkeleton from "./DashboardStatsSkeleton/DashboardSkeleton";
import AgentPerformence from "./allOverviewComponents/AgentPerformence";
import ProductPerofrmence from "./allOverviewComponents/ProductPerofrmence";
import CouriarPerformence from "./allOverviewComponents/CouriarPerformence";
import GeographicalComponent from "./allOverviewComponents/GeographicalComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const tabs = [
  "Agent Performence",
  "Product Performence",
  "Courier Performence",
  "Geographical Distribution",
];
type TTabs =
  | "Agent Performence"
  | "Product Performence"
  | "Courier Performence"
  | "Geographical Distribution";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState<TTabs | string>(
    "Agent Performence"
  );
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);

  // get all overview data module
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
  const { data, isLoading } = useGetOverviewReportsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data || AllReportData;
  const agentPerformance = report?.agentPerformance as TAgentPerformanceType;
  const couriarPerformance =
    report?.courierPerformance as TCouriarperformanceType;
  const profuctPerformance = report?.productPerformance as TProductPerformence;
  const geographicDistribution =
    report?.geographicDistribution as TGeographicPerformance;

  // reset system
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
    return <DashboardSkeleton />;
  }

  return (
    <section className="w-full mx-auto space-y-8 p-6">
      <div className="space-y-6">
        {/* filter and headers */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center ">
            <p className="font-semibold text-gray-900 dark:text-white">
              {report?.reportType}
            </p>
            <p className="flex flex-col space-y-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {report?.period?.startDate
                  ? format(new Date(report?.period?.startDate), "yyyy-MM-dd")
                  : "No date"}{" "}
                →{" "}
                {report?.period?.endDate
                  ? format(new Date(report?.period?.endDate), "yyyy-MM-dd")
                  : "No date"}
              </span>
            </p>
          </div>
          <div className="flex items-end gap-4 ">
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
        </div>
        {/* tabs and buttons */}
        <div className="flex items-center justify-center gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className=" justify-start cursor-pointer"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
      <div>
        {activeTab === "Agent Performence" && (
          <AgentPerformence agentPerformance={agentPerformance} />
        )}
        {activeTab === "Product Performence" && (
          <ProductPerofrmence profuctPerformance={profuctPerformance} />
        )}
        {activeTab === "Courier Performence" && (
          <CouriarPerformence couriarPerformance={couriarPerformance} />
        )}
        {activeTab === "Geographical Distribution" && (
          <GeographicalComponent
            geographicDistribution={geographicDistribution}
          />
        )}
      </div>
    </section>
  );
};

export default DashboardHome;
