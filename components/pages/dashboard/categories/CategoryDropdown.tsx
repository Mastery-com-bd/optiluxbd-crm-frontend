"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import DeleteCategoryModal from "./all/DeleteCategoryModal";
import { THandleConfirm } from "./all/all-categories";

type TCategoryDropdownProps = {
  id: number;
  title?: string;
  description?: string;
  onConfirm: (props: THandleConfirm) => Promise<void> | void;
  buttonName?: string;
};

const CategoryDropdown = ({
  id,
  title,
  description,
  onConfirm,
  buttonName,
}: TCategoryDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full hover:bg-white/10 cursor-pointer duration-500">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="effect text-white z-10">
        <DropdownMenuItem
          onClick={() => console.log("Details")}
          className="cursor-pointer"
        >
          Details
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => console.log("Update")}
          className="cursor-pointer"
        >
          Update
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => console.log("Set Image")}
          className="cursor-pointer"
        >
          Set Image
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => console.log("Delete Image")}
          className="cursor-pointer text-yellow-400"
        >
          Delete Image
        </DropdownMenuItem>

        {/* Delete Category with Modal */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
          <DeleteCategoryModal
            title={title}
            description={description}
            id={id}
            onConfirm={onConfirm}
            buttonName={buttonName}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
