/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCancelReminderMutation,
  useCompleteReminderMutation,
  useDeleteReminderMutation,
} from "@/redux/features/reminders/reminderApi";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import DeleteUSerModal from "../../admin/manageUsers/singleUSer/DeleteUSerModal";
import CreateReminder from "../createReminder/CreateReminder";

const AllReminderActionDropdown = ({
  id,
  customerId,
}: {
  id: number;
  customerId: number;
}) => {
  const [complete, { isLoading }] = useCompleteReminderMutation();
  const [cancelReminder] = useCancelReminderMutation();
  const [deleteReminder] = useDeleteReminderMutation();

  const handleComplete = async () => {
    const toastId = toast.loading("reminder completing");
    try {
      const res = await complete(id).unwrap();
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

  const handleCancel = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => {
    const toastId = toast.loading("reminder cencelling");
    try {
      const res = await cancelReminder(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setLoading(false);
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

  const handleDelete = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => {
    const toastId = toast.loading("reminder Deleting");
    try {
      const res = await deleteReminder(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setLoading(false);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="flex items-center gap-2">
          <Link
            href={`/dashboard/reminders/${id}`}
            className="flex w-full cursor-pointer items-center gap-2"
          >
            <Button
              variant="ghost"
              className="text-left hover:bg-transparent cursor-pointer"
            >
              View Details
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="flex items-center gap-2"
        >
          <CreateReminder customerId={customerId} />
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2">
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={handleComplete}
            className="text-left hover:bg-transparent cursor-pointer"
          >
            Complete
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteUSerModal
            handleConfirm={handleCancel}
            id={id}
            className=" cursor-pointer"
            buttonClass="text-red-600 dark:text-red-300"
            level=" Cancell Reminder"
            content="If you perform this operation then the reminder will be cancell and it can1t be undone"
            disabeButton={true}
            buttonName="Cancell"
          />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteUSerModal
            handleConfirm={handleDelete}
            id={id}
            className=" cursor-pointer"
            buttonClass="text-red-600 dark:text-red-300"
            level=" Delete Reminder"
            content="If you delete the reminder this action can`t be undone . it will parmanently deleted"
            disabeButton={true}
            buttonName="Delete"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AllReminderActionDropdown;
