"use client";

import { AuditLog } from "@/types/audit.types";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { convertDate } from "@/utills/dateConverter";

const ExpandItem = ({ log }: { log: AuditLog }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      onClick={() => setExpanded(!expanded)}
      className="space-y-0 rounded-lg p-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <div className="flex items-start justify-between">
        {/* Main sentence */}
        <div className=" w-full not-last-of-type:text-sm text-gray-800 dark:text-gray-200 flex items-center justify-between ">
          <p>
            <span className="font-semibold text-slate-800 dark:text-slate-400">
              {log?.user?.name || log.userName || "Unknown User"}
            </span>{" "}
            {log.action.toLowerCase()}{" "}
            <span className="font-semibold text">{log.entityType}</span>{" "}
            {log.action === "CREATE" && log?.newData && (
              <span> {log?.newData?.name || log?.newData?.email}</span>
            )}
            {(log.action === "DELETE" || log.action === "UPDATE") &&
              log?.previousData && <span> {log?.previousData?.name}</span>}
          </p>
          <span className="text-gray-500">
            At: {convertDate(new Date(log.createdAt)).creationTime},{" "}
            {convertDate(new Date(log.createdAt)).creationDate}
          </span>
        </div>
        <div className="flex items-center justify-between">
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>

      {/* EXPANDED SECTION */}
      {expanded && (
        <CardContent
          onClick={() => setExpanded(!expanded)}
          className=" space-y-3 rounded-lg p-3 text-sm"
        >
          {/* User Info */}

          {log.changedFields && log.changedFields.length > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Changed:</span>{" "}
              {log.changedFields.join(", ")}
            </p>
          )}
          {log.user && (
            <div>
              <h4 className="font-semibold mb-1">User Info</h4>
              <p>Name: {log.user.name}</p>
              <p>Email: {log.user.email || log.userEmail || "-"}</p>
              <p>User ID: {log.user.userId}</p>
            </div>
          )}

          {/* Previous & New Data */}
          {(log.previousData || log.newData) && (
            <div>
              <h4 className="font-semibold mb-1">Data Changes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-2 border rounded dark:border-gray-600">
                  <h5 className="font-medium mb-1">Previous Data</h5>
                  {log.previousData ? (
                    Object.entries(log.previousData).map(([key, value]) => (
                      <p key={key}>
                        {key}: {value as string | number}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400">No previous data</p>
                  )}
                </div>

                <div className="p-2 border rounded dark:border-gray-600">
                  <h5 className="font-medium mb-1">New Data</h5>
                  {log.newData ? (
                    Object.entries(log.newData).map(([key, value]) => (
                      <p key={key}>
                        {key}: {value as string | number}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400">No new data</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* System Info */}
          <div>
            <h4 className="font-semibold mb-1">System Info</h4>
            <p>IP Address: {log.ipAddress || "-"}</p>
            <p>User Agent: {log.userAgent || "-"}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ExpandItem;
