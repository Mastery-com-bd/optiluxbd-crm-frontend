/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUpdateComboPackageMutation } from "@/redux/features/combo/comboApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";

const ComboDropdown = ({ id, activity }: { id: number; activity: boolean }) => {
  const [updatePackage] = useUpdateComboPackageMutation();
  const user = useAppSelector(currentUser);
  const { permissions } = getPermissions(user as TAuthUSer);

  const handleDeactive = async () => {
    const currentComboPackage = {
      is_active: !activity,
    };
    const data = {
      id,
      currentComboPackage,
    };

    const toastId = toast.loading(
      `${activity ? "deactivating combo" : "activating combo"}`,
      { duration: 3000 }
    );
    try {
      const res = await updatePackage(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="flex items-center gap-2">
          <Link href={`/dashboard/combo/${id}`}>
            <Button
              variant="ghost"
              className="text-left hover:bg-transparent cursor-pointer"
            >
              View Details
            </Button>
          </Link>
        </DropdownMenuItem>
        {permissions.includes("ROLES UPDATE") && (
          <DropdownMenuItem className="flex items-center gap-2">
            <Button
              onClick={() => handleDeactive()}
              variant="ghost"
              className="text-left hover:bg-transparent"
            >
              {activity ? "Deactivate" : "Inactive"}
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComboDropdown;
