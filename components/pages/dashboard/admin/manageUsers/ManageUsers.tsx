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
import { ChevronDown, Slash, XCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import CreateUser from "./CreateUser";
import {
  useActivateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useSuspendUserMutation,
} from "@/redux/features/user/userApi";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteUSerModal from "./DeleteUSerModal";
import { toast } from "sonner";
import PaginationControls from "@/components/ui/paginationComponent";
import { TStatus, TUser } from "@/types/user/user.types";
import UserStatusDropdown from "./StatusDropdown";
import Link from "next/link";
import { debounce } from "@/utills/debounce";
import RoleDropdown from "./RoleDropdown";

const ManageUsers = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const { data, isLoading } = useGetAllUsersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });

  const users = data?.data as TUser[];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };
  const [deleteUser] = useDeleteUserMutation();
  const [activateUser] = useActivateUserMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [is_active, setIs_active] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");

  const handleConfirm = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => {
    try {
      const res = await deleteUser(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  const handleInactive = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => {
    try {
      const res = await activateUser(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  const handleSuspend = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => {
    try {
      const res = await suspendUser(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  if (isLoading) {
    return (
      <section className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-6 animate-in fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-28 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <Skeleton className="w-full sm:w-1/2 h-10 bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-40 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {[
                  "",
                  "Customer Name",
                  "Role",
                  "Email",
                  "Phone",
                  "Is Active",
                  "Status",
                  "Joined",
                  "Last Login",
                  "Action",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 py-3 px-2"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-2">
                    <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2">
                    <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2">
                    <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2">
                    <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2">
                    <Skeleton className="h-4 w-28 bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2">
                    <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2">
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2">
                    <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                  </td>

                  <td className="py-3 px-2">
                    <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="py-3 px-2 flex justify-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            All Users List
          </h2>
          <CreateUser />
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
              {["All", "Inspector", "Sales", "Agent", "Admin"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    setSelectedRole(option);
                    setFilters((prev) => ({
                      ...prev,
                      is_active:
                        option === "All" ? undefined : option.toUpperCase(),
                      page: 1,
                    }));
                  }}
                  className={option === selectedRole ? "font-medium" : ""}
                >
                  {option}
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
                Customer Name
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Role
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
              const role = user?.roles.map((r) => r?.role?.name)[0];
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
                    <Link
                      href={`/dashboard/admin/manage-users/${user?.id}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {user?.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    <RoleDropdown id={user?.id} role={role} />
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.phone}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.is_active ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <UserStatusDropdown
                      id={user?.id}
                      status={user?.status as TStatus}
                    />
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {new Date(user?.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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
                    {/* Suspend */}
                    <DeleteUSerModal
                      handleConfirm={handleSuspend}
                      id={user?.id}
                      icon={Slash}
                      className="bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600 cursor-pointer"
                      buttonClass="text-red-600 dark:text-red-300"
                      level=" Suspend user?"
                      content="This action cannot be undone. It will suspend the user from the system from this time’s. He will not be able to perfor anything from now"
                      tooltip="Suspend"
                      disabeButton={user?.status === "SUSPENDED"}
                    />

                    {/* inactive */}
                    <DeleteUSerModal
                      handleConfirm={handleInactive}
                      id={user?.id}
                      icon={XCircle}
                      className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                      buttonClass="text-gray-600 dark:text-gray-300"
                      level=" Inactive user?"
                      content="This action cannot be undone. It will inactive the user activity from the system from this time’s"
                      tooltip="Inactive"
                      disabeButton={user?.status === "SUSPENDED"}
                    />

                    {/* Delete */}
                    <DeleteUSerModal
                      handleConfirm={handleConfirm}
                      id={user?.id}
                      icon={Trash2}
                      className="bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600 cursor-pointer"
                      buttonClass="text-red-600 dark:text-red-300"
                      level=" Delete user?"
                      content="This action cannot be undone. It will permanently remove the user’s
            account and all associated data from the system."
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
