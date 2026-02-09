"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type TDropdownProps = {
  id?: string;
  path?: string;
  type?: string;
  handleChange: (
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  children?: ReactNode;
  buttonName?: string;
  detailsButtonName?: string;
  acceptButtonName?: string;
  title?: string;
  description?: string;
  isConfirmed?: boolean;
  confirmedButton?: string;
};

const ActionDropdown = ({
  path,
  handleChange,
  children,
  buttonName,
  detailsButtonName,
  isConfirmed,
}: TDropdownProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only ">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/5 backdrop-blur-3xl">
        {path && (
          <DropdownMenuItem asChild disabled={loading}>
            <Link href={path} className="cursor-pointer">
              {detailsButtonName}
            </Link>
          </DropdownMenuItem>
        )}
        {children && (
          <DropdownMenuItem asChild disabled={loading}>
            {children}
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleChange(setLoading)}
          disabled={loading || isConfirmed}
        >
          {buttonName}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropdown;
