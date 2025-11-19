"use client";

import { useGetRecentAuditQuery } from "@/redux/features/audit/admin/adminAuditApi";
import { AuditLog, TAuditAction } from "@/types/audit.types";
import { convertDate } from "@/utills/dateConverter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const Activity = () => {
  const [filters, setFilters] = useState({
    entityType: "",
    action: "",
    limit: 50,
    page: 1,
  });

  const { data, isLoading } = useGetRecentAuditQuery(filters, {
    refetchOnMountOrArgChange: false,
  });

  const activity = (data?.data?.logs as AuditLog[]) || [];

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

  const renderActivitySentence = (log: AuditLog) => {
    const userName = log.userName || log.user?.name || "Unknown User";
    const entity = log.entityType || "Entity";
    const entityId = log.entityId ? `#${log.entityId}` : "";
    const action = log.action.toLowerCase();
    const time = convertDate(new Date(log.createdAt));
    const dateTime = `${time.creationDate}, ${time.creationTime}`;

    return (
      <p className="text-sm text-gray-700 dark:text-gray-200">
        <span className="font-semibold">{userName}</span> {action}{" "}
        <span className="font-medium">{entity}</span> {entityId} at{" "}
        <span className="text-gray-500 dark:text-gray-400">{dateTime}</span>
      </p>
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <ScrollArea className="max-h-[600px] pr-3 space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Card key={idx} className="animate-pulse">
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </CardContent>
          </Card>
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
    <Card>
      <CardContent className="">
        {activity.map((log) => (
          <Card key={log.id} className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <Badge
                  className={`${
                    actionColors[log.action] ||
                    "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  } text-xs`}
                >
                  {log.action}
                </Badge>
              </div>
              {renderActivitySentence(log)}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default Activity;
