"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { THandleConfirm } from "./all-categories";

type DeleteConfirmationModalProps = {
  id: number;
  title?: string;
  description?: string;
  onConfirm: (props: THandleConfirm) => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
  buttonName?: string;
};

const DeleteCategoryModal = ({
  id,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  buttonName = "Delete",
}: DeleteConfirmationModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="py-1.5 px-2 w-full rounded-lg cursor-pointer">
            {buttonName}
          </button>
        </DialogTrigger>

        <DialogContent className="w-[400px] bg-[#1a102e] border-white/10 px-6 py-6 z-50">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              {title}
            </DialogTitle>
          </DialogHeader>

          {description && (
            <p className="text-white/70 text-sm mt-2">{description}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-red-500 cursor-pointer"
              >
                {cancelText}
              </Button>
            </DialogClose>

            <Button
              onClick={() =>
                onConfirm({
                  setLoading,
                  setOpen,
                  id,
                })
              }
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              disabled={loading}
            >
              {confirmText}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCategoryModal;
