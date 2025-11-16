/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

const RoleDropdown = ({ role, id }: { role: string; id: number }) => {
  const [updateUser] = useUpdateUserInfoMutation();

  const handleOnChange = async (value: string) => {
    const currentUser = {
      role: value,
    };
    const data = {
      id: id,
      currentUser,
    };

    const toastId = toast.loading("updating status");
    try {
      const res = await updateUser(data).unwrap();
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
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full text-xs"
        >
          {role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}
          <ChevronDown size={12} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={role}
          onValueChange={(value) => handleOnChange(value)}
        >
          <DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="AGENT">Agent</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="SALES">Sales</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="INSPECTOR">
            Inspector
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleDropdown;
