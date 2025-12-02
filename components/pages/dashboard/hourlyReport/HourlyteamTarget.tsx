/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { THourlyReport } from "./HourlyTeamreport";
import { useGetHourlyTeamTargetQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import HourlyReportSkeleton from "./skeleton/HourlyReportSkeleton";
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
import { format } from "date-fns";
import LeaderList from "./LeaderList";
import HourlyTeamtargetSkeleton from "./skeleton/HourlyTeamtargetSkeleton";

const hoursGap = [
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
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  console.log(report);
  const resetFilters = () => {
    setFilters({
      date: "",
      gap: "",
      leaderId: "",
    });
    setGap("all");
  };
  if (isLoading) {
    return <HourlyTeamtargetSkeleton />;
  }
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <LeaderList
          reportFilter={filters}
          setReportFilter={setFilters}
          field="leaderId"
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
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date ? filters.date : "Select a date"}
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
                    date: date.toISOString().split("T")[0],
                  }))
                }
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
    </div>
  );
};

export default HourlyTeamTarget;
