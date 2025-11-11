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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type TDeleteModal = {
  handleConfirm: (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => Promise<void>;
  id: number;
  icon?: LucideIcon;
  className: string;
  buttonClass: string;
  level: string;
  content: string;
  tooltip?: string;
  disabeButton?: boolean;
  buttonName?: string;
};

const DeleteUSerModal = ({
  handleConfirm,
  id,
  icon: Icon,
  className,
  buttonClass,
  level,
  content,
  tooltip = "Delete",
  disabeButton = false,
  buttonName,
}: TDeleteModal) => {
  const [loading, setLoading] = useState(false);
  return (
    <AlertDialog>
      {buttonName && (
        <AlertDialogTrigger asChild>
          <Button
            disabled={disabeButton}
            variant="outline"
            className={className}
          >
            {buttonName}{" "}
          </Button>
        </AlertDialogTrigger>
      )}
      {Icon && (
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                disabled={disabeButton}
                variant="outline"
                size="icon"
                className={className}
              >
                <Icon size={16} className={buttonClass} />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      )}

      <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {level}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            {content}
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
