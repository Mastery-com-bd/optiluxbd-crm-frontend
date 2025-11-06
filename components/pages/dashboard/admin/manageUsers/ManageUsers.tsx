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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, Edit, Trash2, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import CreateUser from "./CreateUser";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteUSerModal from "./DeleteUSerModal";
import { toast } from "sonner";

export type TUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "SUPER-ADMIN" | "AGENT" | "USER";
  is_active: boolean;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  email_verified: boolean;
  phone_verified: boolean;
  avatar_secure_url: string | null;
  created_at: string;
  updated_at: string;
  last_login: string | null;
};

const ManageUsers = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const users = data?.data as TUser[];
  const meta = data?.pagination;
  const [deleteUser] = useDeleteUserMutation();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const options = ["Today", "This Week", "This Month", "This Year"];
  const [selected, setSelected] = useState("This Month");
  const [page, setPage] = useState(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
              placeholder="Search by name, email, or phone..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
              {["All", "Active", "Pending", "Inactive"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  className={status === selectedStatus ? "font-medium" : ""}
                >
                  {status}
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
                {selected} <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`${
                    selected === option ? "font-semibold text-primary" : ""
                  }`}
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
            {users?.map((user, index) => (
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
                  {user?.role}
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      user?.status
                    )}`}
                  >
                    {user.status}
                  </span>
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Eye
                      size={16}
                      className="text-gray-600 dark:text-gray-200"
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-yellow-100 dark:bg-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-600"
                  >
                    <Edit
                      size={16}
                      className="text-yellow-600 dark:text-yellow-300"
                    />
                  </Button>
                  <DeleteUSerModal
                    handleConfirm={handleConfirm}
                    id={user?.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                aria-disabled={page === 1}
                className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 ${
                  page === 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:text-gray-500"
                    : "border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white cursor-pointer"
                }`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 cursor-pointer ${
                  p === page
                    ? "border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {p}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                aria-disabled={page === totalPages}
                className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 ${
                  page === totalPages
                    ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:text-gray-500"
                    : "border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </section>
  );
};

export default ManageUsers;
