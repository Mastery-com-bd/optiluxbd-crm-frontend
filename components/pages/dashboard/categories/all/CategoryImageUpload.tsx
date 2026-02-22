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
import { Label } from "@/components/ui/label";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type TImageUploadProps = {
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
  id: number;
};

const CategoryImageUpload = ({ handleSubmit, id }: TImageUploadProps) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="py-1.5 px-2 w-full rounded-lg cursor-pointer">
            Set Image
          </button>
        </DialogTrigger>

        <DialogContent className="w-[430px]! bg-[#1a102e] border-white/10 px-3">
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white">
                Add New Category
              </DialogTitle>
            </DialogHeader>

            {/* Image Upload Section */}
            <div className="space-y-3">
              <Label className="text-white text-sm">Category Image</Label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center border-2 border-dashed border-white/50 rounded-2xl w-full h-44 bg-white/20 text-center cursor-pointer hover:bg-white/25 transition-colors"
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {image ? (
                  <div className="relative">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      width={250}
                      height={250}
                      className="rounded-lg object-cover w-40 h-40"
                    />
                    <X
                      className="absolute top-0 right-0 bg-red-500 rounded-full p-1 size-5 cursor-pointer"
                      onClick={handleRemoveImage}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <ImageIcon className="size-5 text-white/70" />
                    </div>
                    <p className="text-sm text-white/90">
                      Upload Your Category image.
                    </p>
                    <p className="text-[10px] text-white/40">
                      Only PNG, JPG format allowed.
                    </p>
                    <p className="text-[10px] text-white/40">
                      500x500 pixels are recommended.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="text-white cursor-pointer hover:text-red-700"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                disabled={!image || loading}
                onClick={() => {
                  if (!image) return;

                  handleSubmit({
                    image,
                    id,
                    setLoading,
                    setOpen,
                  });
                }}
              >
                {loading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryImageUpload;
