/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetPendingApproveUserQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";
import UserTableSkeleton from "../manageUsers/allUsers/UserTableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utills/debounce";
import { TUser } from "@/types/user/user.types";
import PaginationControls from "@/components/ui/paginationComponent";
import ApproveUSerAction from "./ApproveUSerAction";

const ApproveUserComponent = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });
  // get all users
  const { data, isLoading } = useGetPendingApproveUserQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const users = data?.data?.users as TUser[];
  const metaInfo = {
    page: data?.data?.page,
    total: data?.data?.total,
    totalPages: data?.data?.totalPages,
  };
  const pagination = metaInfo || {
    page: 1,
    totalPages: 1,
    total: 0,
  };
  console.log(users);
  console.log(pagination);

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="w-full sm:w-1/2">
            <Input
              type="text"
              placeholder="Search by name email or user id"
              value={filters.search}
              onChange={(e) => debouncedLog(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="bg-white dark:bg-gray-800 px-4">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Name
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                userId
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Email
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Phone
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Verify Email
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Approoval
              </TableHead>
              <TableHead className="text-center text-gray-800 dark:text-gray-200">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map((user, index: number) => {
              return (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200">
                    {user?.name}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200">
                    {user?.userId}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.phone}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.email_verified ? "Yes" : "No"}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {user?.is_approved ? "Yes" : "No"}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-center">
                    <ApproveUSerAction id={user?.id} />
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

export default ApproveUserComponent;
