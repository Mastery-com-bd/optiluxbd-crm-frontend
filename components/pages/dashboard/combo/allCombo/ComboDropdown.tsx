/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeactiveAomboPackageMutation } from "@/redux/features/combo/comboApi";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const ComboDropdown = ({ id }: { id: number }) => {
  const [deactiveCombo] = useDeactiveAomboPackageMutation();
  const handleDeactive = async () => {
    try {
      const res = await deactiveCombo(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
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
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="flex items-center gap-2">
          <Link href={`/dashboard/combo/${id}`}>View</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeactive}
          className="flex items-center gap-2"
        >
          Deactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComboDropdown;
