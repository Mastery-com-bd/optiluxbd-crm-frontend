/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CreateUser from "./CreateUser";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import PaginationControls from "@/components/ui/paginationComponent";
import { TStatus, TUser } from "@/types/user/user.types";
import UserStatusDropdown from "./StatusDropdown";
import { debounce } from "@/utills/debounce";
import UserActionDropdown from "./UserActionDropdown";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { useGetAllRolesQuery } from "@/redux/features/roles/roleApi";
import { useAppSelector } from "@/redux/hooks";
import UserTableSkeleton from "./UserTableSkeleton";
import { convertDate } from "@/utills/dateConverter";

const ManageUsers = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
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
  // get current user and roles
  const userInfo = useAppSelector(currentUser);
  const { permissions } = getPermissions(userInfo as TAuthUSer);
  // local state
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [is_active, setIs_active] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  if (isLoading) {
    return <UserTableSkeleton />;
  }

  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            All Users List
          </h2>
          {permissions.includes("USERS CREATE") && <CreateUser />}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="w-full sm:w-1/2">
            <Input
              type="text"
              placeholder="Search by name"
              value={filters.search}
              onChange={(e) => debouncedLog(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {selectedStatus === "All" ? "Filter by Status" : selectedStatus}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {["All", "Active", "Inactive", "Suspend", "Disabled"].map(
                (status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setFilters((prev) => ({
                        ...prev,
                        status:
                          status === "All" ? undefined : status.toUpperCase(),
                        page: 1,
                      }));
                    }}
                    className={status === selectedStatus ? "font-medium" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {is_active === "All" ? "Filter by activity" : is_active}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {["All", "Yes", "No"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setIs_active(item);
                    setFilters((prev) => ({
                      ...prev,
                      is_active: item === "All" ? undefined : item === "Yes",
                      page: 1,
                    }));
                  }}
                  className={item === is_active ? "font-medium" : ""}
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
      <div className="overflow-x-auto">
        <Table className="bg-white dark:bg-gray-800">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Name
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Email
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Phone
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Is Active
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Status
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Joined
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
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <TableCell>
                    <Image
                      src={
                        user?.avatar_secure_url ??
                        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                      }
                      alt={user.name}
                      width={500}
                      height={500}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200">
                    {user?.name}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.phone}
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
                    {user?.is_active ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    {permissions.includes("USERS UPDATE") ? (
                      <UserStatusDropdown
                        id={user?.id}
                        status={user?.status as TStatus}
                      />
                    ) : (
                      (user?.status as TStatus)
                    )}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {new Date(user?.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.last_login ? (
                      <p className="flex flex-col text-sm">
                        <span>
                          {convertDate(new Date(user?.last_login)).creationTime}
                        </span>
                        <span>
                          {convertDate(new Date(user?.last_login)).creationDate}
                        </span>
                      </p>
                    ) : (
                      "not yet"
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <UserActionDropdown
                      id={user?.id}
                      status={user?.status}
                      activity={user?.is_active}
                    />
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

export default ManageUsers;
