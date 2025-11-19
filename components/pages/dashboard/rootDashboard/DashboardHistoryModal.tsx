"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useGetRecentAuditQuery } from "@/redux/features/audit/admin/adminAuditApi";
import { AuditLog, TAuditAction } from "@/types/audit.types";
import { Skeleton } from "@/components/ui/skeleton";
import { convertDate } from "@/utills/dateConverter";

const actionColors: Record<TAuditAction, string> = {
  CREATE: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  UPDATE:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  LOGIN: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  LOGOUT: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
  EXPORT:
    "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  IMPORT:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
};

const DashboardHistoryModal = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetRecentAuditQuery(
    { limit: 10, offset: 0 },
    { refetchOnMountOrArgChange: false }
  );
  const activity = (data?.data?.logs as AuditLog[]) || [];
  const getActivitySentence = (log: AuditLog) => {
    const userName = log.userName || log.user?.name || "Unknown User";
    const action = log.action.toLowerCase();
    const entity = log.entityType || "Entity";
    const entityId = log.entityId ? `#${log.entityId}` : "";
    const time = convertDate(new Date(log.createdAt));
    const dateTime = `${time.creationDate}, ${time.creationTime}`;

    return (
      <p className="text-sm text-gray-700 dark:text-gray-200">
        <span className="font-bold">{userName}</span> {action.toLowerCase()}{" "}
        {entity} {entityId} at {dateTime}
      </p>
    );
  };

  if (isLoading) {
    return (
      <ScrollArea className="max-h-[600px] pr-3 space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 animate-pulse"
          >
            <Skeleton className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></Skeleton>
            <Skeleton className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></Skeleton>
          </div>
        ))}
      </ScrollArea>
    );
  }

  if (activity.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No activity yet
      </div>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="cursor-pointer">
        Watch Activity
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Recent Activity
            </DialogTitle>
            <DialogDescription>
              Here are the latest actions made by users.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[600px]">
            {activity.map((log) => (
              <div
                key={log.id}
                className="p-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mb-2"
              >
                <div className="flex items-center justify-end mb-1">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      actionColors[log.action] ||
                      "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {log.action}
                  </span>
                </div>
                {getActivitySentence(log)}
              </div>
            ))}
          </ScrollArea>

          <DialogFooter>
            <Link href="/dashboard/activity">
              <Button variant="outline" className="w-full">
                See All Activity
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardHistoryModal;
