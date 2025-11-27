/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TAuthUSer, TUSerRole } from "@/redux/features/auth/authSlice";
import {
  useAssignRoleToUserMutation,
  useGetAllRolesQuery,
  useRemoveRoleFromUserMutation,
} from "@/redux/features/roles/roleApi";
import { IProfileInfo } from "@/types/user/userProfileType";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { Edit, EllipsisVertical, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UserRoleEditComponent = ({ userInfo }: { userInfo: IProfileInfo }) => {
  const { data: roleData, isLoading } = useGetAllRolesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const roles = roleData?.data || [];

  const { role } = getPermissions(userInfo as TAuthUSer);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<"edit" | "delete" | string>("");
  const [isAddRole, setIsAddRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(role[0] || "");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [assignRoleToUser] = useAssignRoleToUserMutation();
  const [removeRoleFromUser] = useRemoveRoleFromUserMutation();
  const [loading, setLoading] = useState(false);

  const handleSaveRole = async (id: number) => {
    if (selectedRole === role[0]) {
      toast.error(`you already have ${selectedRole} role`);
      return;
    }
    if (!userInfo?.id || !id) {
      toast.error("faild to update the user!");
      return;
    }
    const data = {
      userId: userInfo?.id,
    };
    const toastId = toast.loading("updating role status");
    try {
      const res = await assignRoleToUser({ roleId, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setEditing("");
        setSelectedRole(role[0] || "");
        setLoading(false);
        setRoleId(null);
        setIsAddRole(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id: number) => {
    if (!userInfo?.id || !id) {
      toast.error("faild to update the user!");
      return;
    }
    const data = {
      userId: userInfo?.id,
    };
    const toastId = toast.loading("removing role status");

    try {
      const res = await removeRoleFromUser({ roleId, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setSelectedRole(role[0] || "");
        setLoading(false);
        setRoleId(null);
        setEditing("");
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start gap-2">
      {!editing && role.length > 0 ? (
        <div className="flex items-center gap-3 ">
          <p className=" flex items-center  gap-2">
            <User size={16} />
            <span className="text-gray-600 dark:text-gray-400"> Role:</span>

            <span className="font-medium text-gray-800 dark:text-gray-200">
              {role
                .map(
                  (r) => r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()
                )
                .join(", ")}
            </span>
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => setOpen(true)}
                variant="ghost"
                size="sm"
                className="cursor-pointer rounded-full"
              >
                <EllipsisVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            {open && (
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem
                  onClick={() => {
                    setEditing("edit");
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Edit size={16} /> Edit Role
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setEditing("delete");
                  }}
                  className="flex items-center gap-2 text-red-600 cursor-pointer"
                >
                  <Trash2 size={16} /> Delete Role
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex flex-col items-end">
          {!isAddRole && editing === "" && (
            <div className="flex items-center justify-end ">
              <Button
                className="cursor-pointer"
                onClick={() => setIsAddRole(true)}
              >
                Add Role
              </Button>
            </div>
          )}

          {isAddRole && (
            <div className="space-y-2 w-full ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-[150px] justify-between"
                  >
                    {selectedRole || "Select role"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-[150px]">
                  {isLoading ? (
                    <div className="w-[150px] p-2 space-y-2">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-8 w-full rounded-md bg-gray-200 dark:bg-gray-700"
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      {roles?.length > 0 &&
                        roles.map(
                          (role: { name: string; id: number }, i: number) => (
                            <DropdownMenuItem
                              key={i}
                              onClick={() => {
                                setSelectedRole(role?.name);
                                setRoleId(role?.id);
                              }}
                              className="cursor-pointer"
                            >
                              {role?.name}
                            </DropdownMenuItem>
                          )
                        )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-10">
                <button
                  disabled={loading}
                  className="text-blue-600 cursor-pointer"
                  onClick={() => {
                    handleSaveRole(roleId as number);
                  }}
                >
                  Save
                </button>

                {/* Cancel Button */}
                <button
                  disabled={loading}
                  className=" cursor-pointer"
                  onClick={() => {
                    setEditing("");
                    setSelectedRole(role[0] || "");
                    setRoleId(null);
                    setIsAddRole(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {editing === "edit" && (
        <div className="space-y-2 w-full ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-[150px] justify-between"
              >
                {selectedRole || role[0] || "No role assigned yet"}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[150px]">
              {isLoading ? (
                <div className="w-[150px] p-2 space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-8 w-full rounded-md bg-gray-200 dark:bg-gray-700"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {roles?.length > 0 &&
                    roles.map(
                      (role: { name: string; id: number }, i: number) => (
                        <DropdownMenuItem
                          key={i}
                          onClick={() => {
                            setSelectedRole(role?.name);
                            setRoleId(role?.id);
                          }}
                          className="cursor-pointer"
                        >
                          {role?.name}
                        </DropdownMenuItem>
                      )
                    )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-10">
            <button
              disabled={loading}
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                handleSaveRole(roleId as number);
              }}
            >
              Save
            </button>

            {/* Cancel Button */}
            <button
              disabled={loading}
              className=" cursor-pointer"
              onClick={() => {
                setEditing("");
                setSelectedRole(role[0] || "");
                setRoleId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {editing === "delete" && (
        <div className="flex items-center justify-end w-full">
          {role.length > 0 ? (
            <div className="space-y-2 w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-[150px] justify-between"
                  >
                    {selectedRole || role[0]}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-[150px]">
                  {userInfo?.roles.map((r: TUSerRole, i: number) => (
                    <DropdownMenuItem
                      key={i}
                      onClick={() => {
                        setSelectedRole(r?.role?.name);
                        setRoleId(r?.role?.id as number);
                      }}
                      className="cursor-pointer"
                    >
                      {r?.role?.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-10">
                <button
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handleDeleteRole(roleId as number)}
                >
                  Save
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setEditing("");
                    setSelectedRole(role[0] || "");
                    setRoleId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>No role assigned yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserRoleEditComponent;
