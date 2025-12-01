/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useAcceptBatchMutation,
  useGetAllInProgressLeadsQuery,
  useRejectBatchMutation,
} from "@/redux/features/leads/teamLeaderLeadsApi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { convertDate } from "@/utills/dateConverter";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TCreator {
  id: number;
  name: string;
  email: string;
  userId: string;
}

export interface TProgressdata {
  id: number;
  createdAt: string;
  customerCount: number;
  startDate: string | null;
  endDate: string | null;
  status: string;
  creator: TCreator;
}

const InprogressdataModal = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAllInProgressLeadsQuery(undefined);
  const reports = (data?.data as TProgressdata[]) || [];
  const hasReport = !!reports;

  const [acceptbatch] = useAcceptBatchMutation();
  const [rejectBatch] = useRejectBatchMutation();

  const handleAccept = async () => {
    const payload = {
      batchId: data?.data[0]?.id,
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
      {/* Open Modal Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            View Progress Report
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            You have{" "}
            <span
              className={
                reports?.length === 0 ? "text-red-600" : "text-green-600"
              }
            >
              {reports?.length}
            </span>{" "}
            reports.
          </p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Progress Report
            </DialogTitle>
          </DialogHeader>

          {/* If loading */}
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading progress report...
            </div>
          ) : reports.length < 1 ? (
            /* If empty */
            <div className="p-4 text-center text-sm text-muted-foreground">
              No progress report available.
            </div>
          ) : (
            /* Progress Reports List */
            <div className="space-y-4">
              {reports.map((item: TProgressdata) => (
                <div
                  key={item?.id}
                  className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
                >
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium">Report ID:</span>
                    <span>{item?.id}</span>

                    <span className="font-medium">Customer Count:</span>
                    <span>{item?.customerCount}</span>

                    <span className="font-medium">Status:</span>
                    <span className="uppercase">{item?.status}</span>

                    <span className="font-medium">Created By:</span>
                    <span>{item?.creator?.name}</span>

                    <span className="font-medium">Created At:</span>
                    <span>{new Date(item?.createdAt).toLocaleString()}</span>

                    <span className="font-medium">Start Date:</span>
                    <span>
                      {item?.startDate
                        ? convertDate(new Date(item?.startDate as string))
                            .creationDate
                        : "no start date"}
                    </span>

                    <span className="font-medium">End Date:</span>
                    <span>
                      {item?.endDate
                        ? convertDate(new Date(item?.endDate as string))
                            .creationDate
                        : "no end date"}
                    </span>
                  </div>
                </div>
              ))}
              {reports?.length && (
                <DialogFooter className="flex justify-between">
                  {hasReport && (
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        onClick={handleReject}
                        className="cursor-pointer"
                      >
                        Reject
                      </Button>
                      <Button onClick={handleAccept} className="cursor-pointer">
                        Accept
                      </Button>
                    </div>
                  )}
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InprogressdataModal;
