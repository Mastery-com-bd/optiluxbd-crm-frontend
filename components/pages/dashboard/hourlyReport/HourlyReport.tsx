/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetHourlyTeamReportQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import LeaderList from "./LeaderList";
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

export type THourlyReport = {
  startDate: string;
  endDate: string;
  gap: string;
  teamLeaderId: string;
};

const hoursGap = [
  { name: "1 Hour", value: "1" },
  { name: "2 Hours", value: "2" },
  { name: "3 Hour", value: "3" },
  { name: "4 Hour", value: "4" },
  { name: "5 Hour", value: "5" },
  { name: "6 Hour", value: "6" },
];

const HourlyReport = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);
  const [gap, setGap] = useState("all");
  const [filters, setFilters] = useState<THourlyReport>({
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
    gap: "",
    teamLeaderId: "",
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      if (!startDate || !endDate) return;
      setFilters((prev: any) => ({
        ...prev,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      }));
    });
  }, [startDate, endDate]);

  const { data, isLoading } = useGetHourlyTeamReportQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  console.log(report);

  const resetFilters = () => {
    setFilters({
      startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      endDate: format(today, "yyyy-MM-dd"),
      gap: "",
      teamLeaderId: "",
    });
    setStartDate(firstDayOfMonth);
    setEndDate(today);
    setGap("all");
  };
  return (
    <div className="p-6">
      <div className="flex items-end justify-between gap-4">
        <LeaderList reportFilter={filters} setReportFilter={setFilters} />
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
          <Button variant="destructive" className="px-4" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HourlyReport;
