import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PaginationControls from "@/components/ui/paginationComponent";
import { useGetRecentAuditQuery } from "@/redux/features/audit/admin/adminAuditApi";
import { AuditLog } from "@/types/audit.types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ActivityListSkeleton from "../ActivityListSkeleton";
import ExpandItem from "./ExpandItem";

const RecentActivity = () => {
  // get all activity
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
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };
  const [action, setAction] = useState("All");
  const [entityType, setEntityType] = useState("All");

  return (
    <CardContent className="w-full p-0 lg:p-4">
      <Card className="bg-card text-card-foreground border shadow-sm px-2 lg:p-4 mb-5 flex">
        <div className="flex flex-row items-center justify-between">
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
        </div>
      </Card>
      <Card className="px-4">
        {isLoading ? (
          <ActivityListSkeleton />
        ) : (
          <>
            {activity.map((log) => (
              <ExpandItem key={log.id} log={log} />
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

export default RecentActivity;
