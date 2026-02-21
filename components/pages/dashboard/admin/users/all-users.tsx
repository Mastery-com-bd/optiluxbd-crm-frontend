"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllUsersProps, UserResponse } from "@/types/user/organizationUsers.types";
import AddUserModal from "./AddUserModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  RejectOrganizationUser,
  SuspendOrganizationUser,
} from "@/service/user";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AllUsers = ({
  userData,
  rolesData,
  userDetails,
}: {
  userData: AllUsersProps;
  rolesData: AllUsersProps;
  userDetails?: UserResponse;
}) => {
  const users = userData?.data || [];
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const router = useRouter();

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

  const handleSuspendUser = async (userId: string) => {
    if (!userId) {
      toast.error("Please select a user to suspend");
      return;
    }

    toast.loading("Suspending user...");
    try {
      const res = await SuspendOrganizationUser(userId);

      if (res.success) {
        toast.dismiss();
        toast.success(res.message || "User suspended successfully");
        setIsRejectModalOpen(false);
        setSelectedUserId(null);
      } else {
        toast.dismiss();
        toast.error(res.message || "Failed to suspend user");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("An error occurred while suspending the user");
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Users</h2>
        <AddUserModal rolesData={rolesData} />
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
                        // onClick={() => navigator.clipboard.writeText(user.id)}
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
                        <DropdownMenuItem
                          onClick={() => handleSuspendUser(user.id.toString())}
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
    </div>
  );
};

export default AllUsers;
