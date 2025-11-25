/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetTeamReportQuery } from "@/redux/features/leads/teamLeaderLeadsApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import SearchLeaderFields from "./inputFields/SearchLeaderFields";
import { TAgentReportFilter } from "./AgentReport";

const TeamReport = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);

  const [filters, setFilters] = useState<TAgentReportFilter>({
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
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
  console.log(filters);
  const { data, isLoading } = useGetTeamReportQuery(filters, {
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
      teamLeaderId: "",
    });
    setStartDate(firstDayOfMonth);
    setEndDate(today);
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
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
          <Button variant="destructive" className="px-4" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamReport;
