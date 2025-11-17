"use client";

import { useGetAllInProgressLeadsQuery } from "@/redux/features/leads/leadsApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { convertDate } from "@/utills/dateConverter";

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
  return (
    <div>
      {/* Open Modal Button */}
      <Button onClick={() => setOpen(true)}>View Progress Report</Button>

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
          ) : !hasReport ? (
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InprogressdataModal;
