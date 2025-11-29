/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

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
import { useGetTeamReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import { TTeamReport } from "@/types/report/teamReport.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TeamReportSkeleton from "./reportSkeleton/TeamReportSkeleton";

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

  const { data, isLoading } = useGetTeamReportsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  const teams = (data?.data?.data as TTeamReport[]) || [];

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
    return <TeamReportSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="space-y-4 px-6">
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
              →{" "}
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
              Total Teams
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalTeams}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm
                  bg-white dark:bg-gray-900
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Agents
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalAgents}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm
                  bg-white dark:bg-gray-900
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Today’s Total Sale
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.todaysTotalSale}
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

      <div className="space-y-8 p-6">
        {teams.map((team, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm">
            {/* Team Header */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{team?.teamName}</h2>
              <p className="text-sm text-gray-500">
                Leader: {team?.teamLeaderName} ({team?.teamLeaderUserId})
              </p>
              <p className="text-xs text-gray-400">{team?.teamLeaderEmail}</p>
            </div>

            {/* Table */}
            <Table>
              <TableCaption>
                Total Agents: {team?.totalAgents} | Active: {team?.activeAgents}
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Agent ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Today`s Orders</TableHead>
                  <TableHead>Single Orders</TableHead>
                  <TableHead>Double Orders</TableHead>
                  <TableHead>Payment Count</TableHead>
                  <TableHead>Paid Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {team.agents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center text-gray-500"
                    >
                      No Agents Found
                    </TableCell>
                  </TableRow>
                ) : (
                  team.agents.map((agent) => (
                    <TableRow key={agent?.id}>
                      <TableCell>{agent?.orderRank}</TableCell>
                      <TableCell>{agent?.userId}</TableCell>
                      <TableCell>{agent?.name}</TableCell>
                      <TableCell>{agent?.email}</TableCell>
                      <TableCell>{agent?.todaysOrder}</TableCell>
                      <TableCell>{agent?.singleOrder}</TableCell>
                      <TableCell>{agent?.doubleOrder}</TableCell>
                      <TableCell>{agent?.paymentCount}</TableCell>
                      <TableCell>{agent?.paidAmount}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamReport;
