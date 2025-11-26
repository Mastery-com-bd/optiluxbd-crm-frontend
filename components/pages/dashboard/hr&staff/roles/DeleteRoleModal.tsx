/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRemoveRoleFromUserMutation } from "@/redux/features/roles/roleApi";
import { X } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
type TUser = {
  name: string;
  id: number;
};

const DeleteRoleModal = ({ user, roleId }: { user: TUser; roleId: number }) => {
  const [open, setOpen] = useState(false);
  const [removeRoleFromUser] = useRemoveRoleFromUserMutation();
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    const data = {
      userId: user?.id,
    };
    const toastId = toast.loading("removing role");
    setLoading(true);

    try {
      const res = await removeRoleFromUser({ roleId, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setLoading(false);
        setOpen(false);
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
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="
    absolute right-2 top-1/2 -translate-y-1/2
    hidden group-hover:flex
    h-4 w-4 rounded-full
    bg-red-500 text-white
    hover:bg-red-600
    transition cursor-pointer
    p-0
  "
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <X className="h-3 w-3" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove user from this role?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{user?.name as ReactNode}</span>?
          </p>

          <DialogFooter>
            <Button
              disabled={loading}
              variant="ghost"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="cursor-pointer"
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteRoleModal;
