"use client";

import { useGetTeamReportQuery } from "@/redux/features/leads/teamLeaderLeadsApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TeamReportModal = () => {
  const { data, isLoading } = useGetTeamReportQuery(undefined);
  const [open, setOpen] = useState(false);
  const report = data?.data;
  const hasReport = !!report;

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="cursor-pointer">
        View Team Report
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold ">
              Team Report
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Team Report
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm p-3">
                <div className="grid grid-cols-2 gap-2 p-3 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <Skeleton className="h-4 w-3/4" />{" "}
                  <Skeleton className="h-4 w-1/2" />{" "}
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-2 mt-2">
                <Skeleton className="h-10 w-20" />{" "}
                <Skeleton className="h-10 w-20" />{" "}
              </DialogFooter>
            </DialogContent>
          ) : !hasReport ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No report available for your team.
            </div>
          ) : (
            <>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-2 p-3 rounded-md bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700">
                  <span className="font-medium">Total Assigned:</span>
                  <span>{report.totals.totalAssigned}</span>

                  <span className="font-medium">Ordered:</span>
                  <span>{report.totals.ordered}</span>

                  <span className="font-medium">Cancelled:</span>
                  <span>{report.totals.cancelled}</span>

                  <span className="font-medium">Draft:</span>
                  <span>{report.totals.draft}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamReportModal;
