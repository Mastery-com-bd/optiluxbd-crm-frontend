/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useAcceptBatchMutation,
  useGetTeamReportQuery,
  useRejectBatchMutation,
} from "@/redux/features/leads/leadsApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const TeamReportModal = () => {
  const { data, isLoading } = useGetTeamReportQuery(undefined);
  const [open, setOpen] = useState(false);
  const [acceptbatch] = useAcceptBatchMutation();
  const [rejectBatch] = useRejectBatchMutation();

  const report = data?.data;
  const hasReport = !!report;

  const handleAccept = async () => {
    const payload = {
      batchId: data?.data?.batch?.id,
    };

    const toastId = toast.loading("accepting asigned customer batch");
    try {
      const res = await acceptbatch(payload).unwrap();
      toast.dismiss(toastId);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setOpen(false);
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      const errorInfo =
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setOpen(false);
    }
  };

  const handleReject = async () => {
    const payload = {
      batchId: data?.data?.batch?.id,
    };
    const toastId = toast.loading("rejecting asigned customer batch");
    try {
      const res = await rejectBatch(payload).unwrap();
      toast.dismiss(toastId);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setOpen(false);
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      const errorInfo =
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>View Team Report</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
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
              <DialogFooter className="flex justify-between">
                {hasReport && (
                  <div className="flex gap-2">
                    <Button variant="destructive" onClick={handleReject}>
                      Reject
                    </Button>
                    <Button onClick={handleAccept}>Accept</Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamReportModal;
