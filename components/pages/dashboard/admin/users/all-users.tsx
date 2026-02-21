"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  RejectOrganizationUser,
  UpdateOrganizationUserStatus
} from "@/service/user";
import { AllUsersProps, RolesResponse, UserResponse } from "@/types/user/organizationUsers.types";
import { ChevronLeft, ChevronRight, MoreHorizontal, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddUserModal from "./AddUserModal";

const TUserStatus = {
  Active: "ACTIVE",
  Inactive: "INACTIVE",
  Suspended: "SUSPENDED",
  Disabled: "DISABLED",
  Rejected: "REJECTED",
} as const;


const AllUsers = ({
  userData,
  rolesData,
  userDetails,
}: {
  userData: AllUsersProps;
  rolesData: RolesResponse;
  userDetails?: UserResponse;
}) => {
  const users = userData?.data || [];
  const pagination = userData?.pagination;
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for search to handle debounce
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  // Debounce search update
  useEffect(() => {
    const handler = setTimeout(() => {
      const current = searchParams.get("search") || "";
      if (searchTerm !== current) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
          params.set("search", searchTerm);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, pathname, router, searchParams]);

  // Update filter params
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleEditModalOpenChange = (open: boolean) => {
    if (!open) {
      router.push("/dashboard/admin/users");
    }
  };

  const handleRejectUser = async () => {
    if (!selectedUserId || !rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    toast.loading("Rejecting user...");
    try {
      const res = await RejectOrganizationUser(selectedUserId, rejectReason);

      if (res.success) {
        toast.dismiss();
        toast.success(res.message || "User rejected successfully");
        setIsRejectModalOpen(false);
        setRejectReason("");
        setSelectedUserId(null);
      } else {
        toast.dismiss();
        toast.error(res.message || "Failed to reject user");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("An error occurred while rejecting the user");
    }
  };

  const handleUserStatus = async (userId: string, status: (typeof TUserStatus)[keyof typeof TUserStatus]) => {
    if (!userId) {
      toast.error("Please select a user to update status");
      return;
    }

    toast.loading(`Updating user status to ${status}...`);
    try {
      const res = await UpdateOrganizationUserStatus(userId, status);

      if (res.success) {
        toast.dismiss();
        toast.success(res.message || `User status updated to ${status}`);
        setIsRejectModalOpen(false);
        setSelectedUserId(null);
      } else {
        toast.dismiss();
        toast.error(res.message || `Failed to update user status to ${status}`);
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("An error occurred while updating the user status");
    }
  };

  const handleEditUser = (userId: string) => {
    router.push(`/dashboard/admin/users?userId=${userId}`);
  };

  const openRejectModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsRejectModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Users</h2>
          <AddUserModal rolesData={rolesData} />
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              value={searchParams.get("role") || "all"}
              onValueChange={(value) => updateFilter("role", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {rolesData?.data?.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={searchParams.get("status") || "all"}
              onValueChange={(value) => updateFilter("status", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {Object.values(TUserStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={searchParams.get("is_active") || "all"}
              onValueChange={(value) => updateFilter("is_active", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Active Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={searchParams.get("sortBy") || "created_at"}
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Date Created</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={searchParams.get("sort") || "desc"}
              onValueChange={(value) => updateFilter("sort", value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.userId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>
                    {user.roles.length > 0
                      ? user.roles.map((r) => r.role.name).join(", ")
                      : "User"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(user.id.toString());
                            toast.success("User ID copied to clipboard");
                          }}
                        >
                          Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditUser(user.id.toString())}
                        >
                          Edit user
                        </DropdownMenuItem>
                      {user.status === TUserStatus.Inactive ? (
                        <DropdownMenuItem
                          onClick={() => handleUserStatus(user.id.toString(), TUserStatus.Active)}
                          className="text-green-600 cursor-pointer"
                        >
                          Activate user
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleUserStatus(user.id.toString(), TUserStatus.Inactive)}
                          className="text-red-600 cursor-pointer"
                        >
                          Deactivate user
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                          onClick={() => handleUserStatus(user.id.toString(), TUserStatus.Disabled)}
                          className="text-red-600 cursor-pointer"
                        >
                          Disable user
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUserStatus(user.id.toString(), TUserStatus.Suspended)}
                          className="text-red-600 cursor-pointer"
                        >
                          Suspend user
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openRejectModal(user.id.toString())}
                          className="text-red-600 cursor-pointer"
                        >
                          Reject user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {userDetails && (
        <AddUserModal
          rolesData={rolesData}
          userData={userDetails.data}
          open={!!userDetails}
          onOpenChange={handleEditModalOpenChange}
        />
      )}

      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-[125px] bg-[#1A1129] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Reject User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              id="reason"
              placeholder="Enter reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="col-span-3 bg-white/10 border-none text-white placeholder:text-gray-400"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectModalOpen(false)}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectUser}>
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {pagination?.page || 1} of {pagination?.totalPages || 1} ({pagination?.total || 0} items)
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={pagination?.limit?.toString() || "10"}
              onValueChange={(value) => updateFilter("limit", value)}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pagination?.limit?.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange((pagination?.page || 1) - 1)}
              disabled={!pagination?.hasPrev}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange((pagination?.page || 1) + 1)}
              disabled={!pagination?.hasNext}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
