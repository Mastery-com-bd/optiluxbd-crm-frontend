/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllRolesQuery } from "@/redux/features/roles/roleApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user/user.types";
import { debounce } from "@/utills/debounce";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { TAuthUSer } from "@/redux/features/auth/authSlice";
import PaginationControls from "@/components/ui/paginationComponent";
import UserActivityTableSkeleton from "./UserActivityTableSkeleton";
import UserActivityModal from "./UserActivityModal";

const UserActivity = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 50,
    page: 1,
  });
  // get all users
  const { data, isLoading } = useGetAllUsersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const users = data?.data as TUser[];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };
  // get all roles
  const { data: roleData, isLoading: roleLoading } = useGetAllRolesQuery(
    undefined,
    { refetchOnMountOrArgChange: false }
  );
  const roles = roleData?.data || [];

  // local state
  const [selectedRole, setSelectedRole] = useState("All");

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  if (isLoading) {
    return <UserActivityTableSkeleton />;
  }

  return (
    <section className=" w-full rounded-2xl shadow p-6 space-y-6 border">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="w-full sm:w-1/2">
            <Input
              type="text"
              placeholder="Search by name"
              value={filters.search}
              onChange={(e) => debouncedLog(e.target.value)}
              className="w-full  text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {selectedRole === "All" ? "Filter by role" : selectedRole}{" "}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRole("All");
                  setFilters((prev) => ({
                    ...prev,
                    role: "",
                    page: 1,
                  }));
                }}
                className={selectedRole === "All" ? "font-medium" : ""}
              >
                All
              </DropdownMenuItem>

              {roleLoading
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <DropdownMenuItem key={idx} className="pointer-events-none">
                      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </DropdownMenuItem>
                  ))
                : roles?.map((role: { id: number; name: string }) => (
                    <DropdownMenuItem
                      key={role.id}
                      onClick={() => {
                        setSelectedRole(role.name);
                        setFilters((prev) => ({
                          ...prev,
                          role: role.name === "All" ? "" : role.name,
                          page: 1,
                        }));
                      }}
                      className={
                        role.name === selectedRole ? "font-medium" : ""
                      }
                    >
                      {role.name}
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Name
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Email
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Role
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Last Login
              </TableHead>
              <TableHead className="text-center text-gray-800 dark:text-gray-200">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map((user, index) => {
              const { role } = getPermissions(user as TAuthUSer);
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200 ">
                    {user?.name}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {role
                      .map(
                        (r) =>
                          r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()
                      )
                      .join(", ") || "no role"}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.last_login
                      ? new Date(user?.last_login).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "not yet"}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <UserActivityModal id={user?.id} name={user?.name} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        pagination={pagination}
        onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
        onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
      />
    </section>
  );
};

export default UserActivity;
