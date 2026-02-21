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
import CategoryImageUpload from "./all/CategoryImageUpload";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Link from "next/link";

type TCategoryDropdownProps = {
  id: number;
  title?: string;
  description?: string;
  imageTitle?: string;
  imageDescription?: string;
  onConfirm: (props: THandleConfirm) => Promise<void> | void;
  onDeleteConfirm?: (props: THandleConfirm) => Promise<void> | void;
  buttonName?: string;
  secondButtonName?: string;
  handleSubmit: ({
    image,
    id,
    setLoading,
    setOpen,
  }: {
    image: File;
    id: number;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => Promise<void>;
  imageUrl?: string;
  children?: ReactNode;
  path: string;
};

const CategoryDropdown = ({
  id,
  title,
  description,
  imageTitle,
  imageDescription,
  onConfirm,
  onDeleteConfirm,
  buttonName,
  secondButtonName,
  handleSubmit,
  imageUrl,
  children,
  path,
}: TCategoryDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full hover:bg-white/10 cursor-pointer duration-500">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="effect text-white z-10">
        <DropdownMenuItem className="cursor-pointer">
          <Link href={path} className="w-full ">
            Details
          </Link>
        </DropdownMenuItem>
        {children && (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="p-0"
          >
            {children}
          </DropdownMenuItem>
        )}

        {imageUrl ? (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="p-0"
          >
            <DeleteCategoryModal
              title={imageTitle}
              description={imageDescription}
              id={id}
              onConfirm={onDeleteConfirm!}
              buttonName={secondButtonName}
            />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="p-0"
            onSelect={(e) => e.preventDefault()}
          >
            <CategoryImageUpload handleSubmit={handleSubmit} id={id} />
          </DropdownMenuItem>
        )}

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
