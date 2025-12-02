/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetHourlyTeamReportQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import { THourlyReportItem } from "@/types/report/hourlyReportType";
import { useState } from "react";
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
import { format } from "date-fns";
import HourlyReportSkeleton from "./skeleton/HourlyReportSkeleton";

export type THourlyReport = {
  startDate?: string;
  endDate?: string;
  gap: string;
  teamLeaderId?: string;
  leaderId?: string;
  date?: string;
};

const hoursGap = [
  { name: "1 Hour", value: "1" },
  { name: "2 Hours", value: "2" },
  { name: "3 Hour", value: "3" },
  { name: "4 Hour", value: "4" },
  { name: "5 Hour", value: "5" },
  { name: "6 Hour", value: "6" },
];

const HourlyTeamreport = () => {
  const [gap, setGap] = useState("all");
  const [filters, setFilters] = useState<THourlyReport>({
    startDate: "",
    endDate: "",
    gap: "",
    teamLeaderId: "",
  });

  const { data, isLoading } = useGetHourlyTeamReportQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  const teamReports = (report?.buckets as THourlyReportItem[]) || [];
  console.log(teamReports);

  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      gap: "",
      teamLeaderId: "",
    });
    setGap("all");
  };
  if (isLoading) {
    return <HourlyReportSkeleton />;
  }
  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <LeaderList
            reportFilter={filters}
            setReportFilter={setFilters}
            field="teamLeaderId"
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
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? filters.startDate : "Select a date"}
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
                      startDate: date.toISOString().split("T")[0],
                    }))
                  }
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
                  {filters.endDate ? filters.endDate : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    filters.endDate ? new Date(filters.endDate) : undefined
                  }
                  onSelect={(date: any) =>
                    date &&
                    setFilters((prev) => ({
                      ...prev,
                      endDate: date.toISOString().split("T")[0],
                    }))
                  }
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
          <p className="font-semibold text-gray-900 dark:text-white">
            Intreval: {report?.intervalHours} Hours
          </p>
          <p className="flex flex-col space-y-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {report?.period?.startLocal
                ? format(new Date(report?.period?.startLocal), "yyyy-MM-dd")
                : "No date"}{" "}
              →{" "}
              {report?.period?.endLocal
                ? format(new Date(report?.period?.endLocal), "yyyy-MM-dd")
                : "No date"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HourlyTeamreport;
