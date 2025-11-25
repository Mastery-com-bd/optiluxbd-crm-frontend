"use client";

import { useGetMyAuditQuery } from "@/redux/features/audit/user/userAuditApi";
import { AuditLogData } from "@/types/audit.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import PaginationControls from "@/components/ui/paginationComponent";
import MyActivityExpand from "./MyActivityExpand";
import ActivityListSkeleton from "../activity/ActivityListSkeleton";
import { Input } from "@/components/ui/input";

const MyActivity = () => {
  const [filters, setFilters] = useState({
    entityType: "",
    action: "",
    startDate: "",
    endDate: "",
    limit: 50,
    page: 1,
  });
  const [action, setAction] = useState("All");
  const [entityType, setEntityType] = useState("All");
  // get my all activity
  const { data, isLoading } = useGetMyAuditQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const activity = (data?.data?.logs as AuditLogData[]) || [];
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

  const handleReset = () => {
    setFilters({
      entityType: "",
      action: "",
      startDate: "",
      endDate: "",
      limit: 50,
      page: 1,
    });
    setEntityType("All");
    setAction("All");
  };

  return (
    <CardContent className=" w-full">
      <Card className="bg-card text-card-foreground border shadow-sm p-4 md:p-5 mb-5 flex">
        <div className="flex flex-col md:flex-row items-end justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {action === "All" ? "Filter by action" : action}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <DropdownMenuItem
                onClick={() => {
                  setAction("All");
                  setFilters((prev) => ({
                    ...prev,
                    action: "",
                    page: 1,
                  }));
                }}
                className={action === "All" ? "font-medium" : ""}
              >
                All
              </DropdownMenuItem>
              {[
                "CREATE",
                "UPDATE",
                "DELETE",
                "LOGIN",
                "LOGOUT",
                "EXPORT",
                "IMPORT",
              ].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setAction(item);
                    setFilters((prev) => ({
                      ...prev,
                      action: item === "All" ? "" : item,
                      page: 1,
                    }));
                  }}
                  className={item === action ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {entityType === "All" ? "Filter by entity" : entityType}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <DropdownMenuItem
                onClick={() => {
                  setEntityType("All");
                  setFilters((prev) => ({
                    ...prev,
                    entityType: "",
                    page: 1,
                  }));
                }}
                className={entityType === "All" ? "font-medium" : ""}
              >
                All
              </DropdownMenuItem>
              {["Customer", "User", "Order", "Product", "Test"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setEntityType(item);
                    setFilters((prev) => ({
                      ...prev,
                      entityType: item === "All" ? "" : item,
                      page: 1,
                    }));
                  }}
                  className={item === entityType ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <Input
              type="date"
              value={filters.startDate ? filters.startDate.split("T")[0] : ""}
              max={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
              onChange={(e) => {
                const date = e.target.value;
                const iso = date ? `${date}T00:00:00Z` : "";
                setFilters((prev) => ({ ...prev, startDate: iso, page: 1 }));
              }}
            />
          </div>
          {/* end date */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              End Date
            </label>
            <Input
              type="date"
              value={filters.endDate ? filters.endDate.split("T")[0] : ""}
              max={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
              onChange={(e) => {
                const date = e.target.value;
                const iso = date ? `${date}T23:59:59Z` : "";
                setFilters((prev) => ({ ...prev, endDate: iso, page: 1 }));
              }}
            />
          </div>
          <div>
            <Button className="cursor-pointer" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>
      <Card className="px-4">
        {isLoading ? (
          <ActivityListSkeleton />
        ) : (
          <>
            {activity.map((log) => (
              <MyActivityExpand key={log.id} log={log} />
            ))}
            <PaginationControls
              pagination={pagination}
              onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
              onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
            />
          </>
        )}
      </Card>
    </CardContent>
  );
};

export default MyActivity;
