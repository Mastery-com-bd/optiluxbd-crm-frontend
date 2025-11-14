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
import DeleteUSerModal from "../../admin/manageUsers/singleUSer/DeleteUSerModal";
import { Button } from "@/components/ui/button";

const ComboDropdown = ({ id, activity }: { id: number; activity: boolean }) => {
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
          <Link href={`/dashboard/combo/${id}`}>
            <Button variant="ghost" className="text-left hover:bg-transparent">
              View Details
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          <DeleteUSerModal
            handleConfirm={handleDeactive}
            id={id}
            className="cursor-pointer"
            buttonClass="text-left hover:bg-transparent"
            level=" Deactive Combo?"
            content="This action cannot be undone. It will suspend the user from the system from this time’s. He will not be able to perfor anything from now"
            disabeButton={activity === false}
            buttonName="Deactive"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComboDropdown;
