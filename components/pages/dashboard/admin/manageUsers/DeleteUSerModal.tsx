"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const DeleteUSerModal = ({
  handleConfirm,
  id,
}: {
  handleConfirm: (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => Promise<void>;
  id: number;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600"
        >
          <Trash2 size={16} className="text-red-600 dark:text-red-300" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Delete user?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            This action cannot be undone. It will permanently remove the user’s
            account and all associated data from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleConfirm(setLoading, id)}
            className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUSerModal;
