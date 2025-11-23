/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Role } from "@/types/role.types";
import { Check, UserPlus, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utills/debounce";
import { useState } from "react";
import { useGetUnassignedUsersQuery } from "@/redux/features/user/userApi";
import { Badge } from "@/components/ui/badge";
import { TUser } from "@/types/user/user.types";
import Image from "next/image";
import { useAssignRoleToUserMutation } from "@/redux/features/roles/roleApi";
import { toast } from "sonner";

type TUnassignedUserProps = {
  role: Role;
};

const AssignedUsers = ({ role }: TUnassignedUserProps) => {
  // get unassigned users
  const [filters, setFilters] = useState({
    search: "",
  });
  const { data, isLoading } = useGetUnassignedUsersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const unAssignedUsers = data?.data || [];
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assignRoleToUser] = useAssignRoleToUserMutation();
  const handleSearch = async (value: string) => {
    setFilters({ ...filters, search: value });
    // setNewUser({ name: "", email: "" });
    // add the user to the role
  };
  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  const handleAddUser = async (roleId: number) => {
    const data = {
      userId: selectedUserId,
    };

    if (!roleId) {
      toast.error("Role ID is missing!");
      return;
    }
    if (!selectedUserId) {
      toast.error("Please select a user first!");
      return;
    }
    setLoading(true);
    try {
      const res = await assignRoleToUser({ roleId, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setFilters({
          search: "",
        });
        setSelectedUserId(null);
        setLoading(false);
        setOpen(false);
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

  return (
    <div className="h-full flex flex-col">
      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
        <Users className="h-4 w-4" /> Assigned Users
      </h4>

      {/* CONTENT AREA — takes all available height */}
      <div className="flex flex-col justify-between h-full p-2 rounded">
        {/* Assigned user list (scrollable + consistent) */}
        <div className="flex-1 overflow-y-auto">
          {role.users.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {role.users.map((ru) => (
                <Badge
                  key={ru.id}
                  variant="secondary"
                  className="max-w-[150px] truncate"
                >
                  {ru.user.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No users assigned.</p>
          )}
        </div>

        {/* BUTTON AREA — stays fixed at bottom */}
        <div className="pt-3">
          <Dialog
            open={open}
            onOpenChange={(value) => {
              setOpen(value);
              if (!value) {
                setFilters({ search: "" });
                setSelectedUserId(null);
                setLoading(false);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 w-full"
              >
                <UserPlus className="h-4 w-4" /> Add User
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add User to {role.name}</DialogTitle>
              </DialogHeader>

              {/* MODAL CONTENT */}
              <div className="space-y-3 py-1">
                <Input
                  value={filters.search}
                  onChange={(e) => debouncedLog(e.target.value)}
                  placeholder="Search by Name, Email or Phone"
                />

                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {!filters.search.trim() ? (
                    <p className="text-sm text-muted-foreground">
                      Type to search users...
                    </p>
                  ) : isLoading ? (
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  ) : unAssignedUsers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No users found.
                    </p>
                  ) : (
                    unAssignedUsers.map((user: TUser) => (
                      <div
                        key={user.id}
                        onClick={() =>
                          setSelectedUserId((prev) =>
                            prev === user.id ? null : user.id
                          )
                        }
                        className={`flex items-center justify-between py-1 px-2 rounded-lg border cursor-pointer transition
                      ${
                        selectedUserId === user.id
                          ? "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                      }
                    `}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              user?.avatar_secure_url ||
                              "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&q=80&w=687"
                            }
                            alt={user?.name}
                            width={500}
                            height={500}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        {selectedUserId === user.id && (
                          <Check className="text-green-600" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <Button
                  disabled={loading}
                  className="w-full"
                  onClick={() => handleAddUser(role.id)}
                >
                  {loading ? "Adding User..." : "Add User"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AssignedUsers;
