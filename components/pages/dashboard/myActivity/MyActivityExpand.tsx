"use client";

import { AuditLogData } from "@/types/audit.types";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { convertDate } from "@/utills/dateConverter";

const actionColors: Record<string, string> = {
  CREATE: "text-green-700",
  UPDATE: "text-blue-700",
  DELETE: "text-red-700",
  LOGIN: "text-purple-700",
  LOGOUT: "text-gray-700",
  EXPORT: "text-amber-700",
  IMPORT: "text-emerald-700",
};

const MyActivityExpand = ({ log }: { log: AuditLogData }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      onClick={() => setExpanded(!expanded)}
      className="space-y-0 rounded-lg p-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="w-full text-gray-800 dark:text-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <p className="flex flex-wrap items-center gap-1">
            {/* Action */}
            <span className={actionColors[log.action] || ""}>
              {log.action.toLowerCase()}
            </span>

            {/* Entity */}
            <span className="font-semibold text-purple-500">
              {log.entityType}
            </span>

            {/* CREATE → show name/email/id/value if exists */}
            {log.action === "CREATE" && log.newData && (
              <span>
                {log.newData.name ??
                  log.newData.email ??
                  log.newData.id ??
                  log.newData.value ??
                  "-"}
              </span>
            )}

            {/* UPDATE / DELETE → show previousData name/email/id/value */}
            {(log.action === "DELETE" || log.action === "UPDATE") &&
              log.previousData && (
                <span>
                  {log.previousData.name ??
                    log.previousData.email ??
                    log.previousData.id ??
                    log.previousData.value ??
                    "-"}
                </span>
              )}
          </p>

          {/* Date */}
          <span className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-0">
            At: {convertDate(new Date(log.createdAt)).creationTime},{" "}
            {convertDate(new Date(log.createdAt)).creationDate}
          </span>
        </div>

        <div className="ml-2 flex items-center justify-center">
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>

      {/* Expanded Section */}
      {expanded && (
        <CardContent className="space-y-3 rounded-lg p-3 text-sm">
          {/* Changed fields */}
          {log.changedFields && log.changedFields.length > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">Changed:</span>{" "}
              {log.changedFields.join(", ")}
            </p>
          )}

          {/* Previous & New Data */}
          {(log.previousData || log.newData) && (
            <div>
              <h4 className="font-semibold mb-1">Data Changes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Previous */}
                <div className="p-2 border rounded dark:border-gray-600">
                  <h5 className="font-medium mb-1">Previous Data</h5>
                  {log.previousData ? (
                    Object.entries(log.previousData).map(([key, value]) => (
                      <p key={key}>
                        {key}: {String(value)}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400">No previous data</p>
                  )}
                </div>

                {/* New */}
                <div className="p-2 border rounded dark:border-gray-600">
                  <h5 className="font-medium mb-1">New Data</h5>
                  {log.newData ? (
                    Object.entries(log.newData).map(([key, value]) => (
                      <p key={key}>
                        {key}: {String(value)}
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
          {(log.ipAddress || log.userAgent || log.endpoint || log.method) && (
            <div>
              <h4 className="font-semibold mb-1">System Info</h4>
              <p>IP Address: {log.ipAddress || "-"}</p>
              <p>User Agent: {log.userAgent || "-"}</p>
              <p>Endpoint: {log.endpoint || "-"}</p>
              <p>Method: {log.method || "-"}</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default MyActivityExpand;
