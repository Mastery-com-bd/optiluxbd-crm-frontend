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
  useAcceptUserApproovalMutation,
  useRejectUserApproovalMutation,
} from "@/redux/features/auth/authApi";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export type TRejectApiType = {
  data?: {
    reason: string;
  };
  id: number;
};

const ApproveUSerAction = ({ id }: { id: number }) => {
  const [acceptApproval] = useAcceptUserApproovalMutation();
  const [rejectApproval] = useRejectUserApproovalMutation();

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    const toastId = toast.loading("accepting approval request");
    try {
      const res = await acceptApproval(id).unwrap();
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

  const handleReject = async () => {
    const data = {
      reason,
    };
    const rejectInfo: TRejectApiType = {
      data,
      id,
    };

    const toastId = toast.loading("rejecting approval request");
    setLoading(true);
    try {
      const res = await rejectApproval(rejectInfo).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setLoading(false);
        setOpenRejectModal(false);
        setReason("");
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center gap-2">
            <Link
              href={`/dashboard/admin/manage-users/${id}`}
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
            className="flex items-center gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <Button
              onClick={handleAccept}
              variant="ghost"
              className="text-left hover:bg-transparent cursor-pointer"
            >
              Accept Approval
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <Button
              onClick={() => setOpenRejectModal(true)}
              variant="ghost"
              className="text-left hover:bg-transparent cursor-pointer"
            >
              Reject Approval
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Approval</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this user`s approval.
              (Optional)
            </AlertDialogDescription>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write reason here..."
              className="w-full p-2 mt-2 border rounded-md resize-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
              rows={4}
            />
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end gap-2 cursor-pointer">
            <AlertDialogCancel
              onClick={() => setOpenRejectModal(false)}
              className="cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Rejecting..." : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApproveUSerAction;
