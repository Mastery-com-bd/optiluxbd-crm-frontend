"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetUserAuditQuery } from "@/redux/features/audit/admin/adminAuditApi";
import { AuditLog } from "@/types/audit.types";
import { Card } from "@/components/ui/card";
import ActivityListSkeleton from "../ActivityListSkeleton";
import PaginationControls from "@/components/ui/paginationComponent";
import UserActivityExpandItem from "./UserActivityExpandItem";

const UserActivityModal = ({ id, name }: { id: number; name: string }) => {
  const [open, setOpen] = useState(false);
  const [entityType, setEntityType] = useState("All");
  const [action, setAction] = useState("All");
  const [filters, setFilters] = useState({
    entityType: "",
    action: "",
    startDate: "",
    endDate: "",
    limit: 50,
    page: 1,
  });
  const { data, isLoading } = useGetUserAuditQuery(
    { id, filters },
    { refetchOnMountOrArgChange: false }
  );
  const activity = (data?.data?.logs as AuditLog[]) || [];
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };
  // Filters inside child

  return (
    <>
      {/* This button stays INSIDE CHILD */}
      <Button onClick={() => setOpen(true)} className="cursor-pointer">
        View Activity
      </Button>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
             w-full rounded-xl 
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            max-h-[90vh] overflow-y-auto py-2 
          "
        >
          <h1>{name}`s Activity logs</h1>
          {/* FILTER BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                {["Customer", "User", "Order", "Product", "Test"].map(
                  (item) => (
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
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Card className="p-0 border-none bg-transparent">
            {isLoading ? (
              <ActivityListSkeleton />
            ) : (
              <>
                {activity.map((log) => (
                  <UserActivityExpandItem key={log.id} log={log} />
                ))}
                <PaginationControls
                  pagination={pagination}
                  onPrev={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                  onNext={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                />
              </>
            )}
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserActivityModal;
