/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import DeleteUSerModal from "../singleUSer/DeleteUSerModal";
import { TStatus } from "@/types/user/user.types";
import {
  useActivateUserMutation,
  useSuspendUserMutation,
} from "@/redux/features/user/userApi";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";
const UserActionDropdown = ({
  id,
  status,
  activity,
}: {
  id: number;
  status: TStatus;
  activity: boolean;
}) => {
  const [activateUser] = useActivateUserMutation();
  const [suspendUser] = useSuspendUserMutation();
  const userInfo = useAppSelector(currentUser);
  const { permissions } = getPermissions(userInfo as TAuthUSer);

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="flex items-center gap-2">
          <Link
            href={`/dashboard/admin/manage-users/${id}`}
            className="flex w-full cursor-pointer items-center gap-2"
          >
            <Button variant="ghost" className="text-left hover:bg-transparent">
              View Details
            </Button>
          </Link>
        </DropdownMenuItem>
        {permissions.includes("USERS UPDATE") && (
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <DeleteUSerModal
              handleConfirm={handleSuspend}
              id={id}
              className=" cursor-pointer"
              buttonClass="text-red-600 dark:text-red-300"
              level=" Suspend user?"
              content="This action cannot be undone. It will suspend the user from the system from this time’s. He will not be able to perfor anything from now"
              disabeButton={status === "SUSPENDED"}
              buttonName="Suspend"
            />
          </DropdownMenuItem>
        )}
        {permissions.includes("USERS UPDATE") && (
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <DeleteUSerModal
              handleConfirm={handleInactive}
              id={id}
              className=" cursor-pointer"
              buttonClass="text-red-600 dark:text-red-300"
              level=" Deactive user?"
              content="This action cannot be undone. It will suspend the user from the system from this time’s. He will not be able to perfor anything from now"
              disabeButton={activity === false}
              buttonName="Inactive"
            />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionDropdown;
