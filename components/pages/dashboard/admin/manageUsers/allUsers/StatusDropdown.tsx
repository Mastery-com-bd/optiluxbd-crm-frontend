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
import { useUpdateUSerStatusMutation } from "@/redux/features/user/userApi";
import { TStatus } from "@/types/user/user.types";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

const StatusDropdown = ({ id, status }: { id: number; status: TStatus }) => {
  const [updateStatus] = useUpdateUSerStatusMutation();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-700";
      case "SUSPENDED":
        return "bg-red-100 text-red-700";
      case "DISABLED":
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const handleOnChangeStatus = async (value: TStatus) => {
    const data = {
      status: value,
    };
    const toastId = toast.loading("updating status");
    try {
      const res = await updateStatus({ data, id }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-2 rounded-full text-xs ${getStatusBadge(
            status
          )}`}
        >
          {status}
          <ChevronDown size={12} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(value) => handleOnChangeStatus(value as TStatus)}
        >
          <DropdownMenuRadioItem value="ACTIVE">Active</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="INACTIVE">
            Inactive
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="SUSPENDED">
            Suspended
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="DISABLED">
            Disabled
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
