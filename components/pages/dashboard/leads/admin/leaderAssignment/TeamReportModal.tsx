"use client";

import { useGetAdminTeamReportsQuery } from "@/redux/features/leads/adminLeedsApi";
import { TTeam } from "@/types/teamleader.types";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TeamReportModal = ({
  setSelectedTeam,
  selectedTeam,
}: {
  setSelectedTeam: Dispatch<SetStateAction<TTeam | null>>;
  selectedTeam: TTeam | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const { data, isLoading } = useGetAdminTeamReportsQuery(filters);
  const reportData = data?.data;

  const vieTeamReportHandler = () => {
    setFilters({ leaderId: selectedTeam?.leader?.id });
    setIsModalOpen(true);
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(isOpen) => {
        setIsModalOpen(isOpen);
        if (!isOpen) {
          setSelectedTeam(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          disabled={!selectedTeam}
          onClick={() => {
            setIsModalOpen(true);
            vieTeamReportHandler();
          }}
          className="cursor-pointer"
        >
          View Team Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Team Report</DialogTitle>
        </DialogHeader>

        {/* Loading State */}
        {isLoading && (
          <Card className="w-full p-4">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-6 w-10" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* No Data */}
        {!isLoading && !reportData && (
          <Card className="w-full p-4">
            <CardContent>
              <p className="text-center text-gray-500 dark:text-gray-400">
                No report found.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Render Report */}
        {!isLoading && reportData && (
          <Card className="w-full border dark:border-gray-700">
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Team Report
              </CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Batch: {reportData.batch?.id}</Badge>
                <Badge variant="secondary">
                  Leader ID: {reportData.leaderId}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-md">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Assigned
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {reportData.totals.totalAssigned}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Draft
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {reportData.totals.draft}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cancelled
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {reportData.totals.cancelled}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ordered
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {reportData.totals.ordered}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TeamReportModal;
