"use client";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image as ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const AddCategory = () => {
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [subCategory, setSubCategory] = useState<
    {
      name: string;
      image: File | null;
    }[]
  >([{ name: "", image: null }]);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative">
            <LiquidGlass
              glowIntensity="none"
              borderRadius="10px"
              className="w-fit"
            >
              <Button
                style={{
                  backgroundImage: "url('/svg/button-background.svg')",
                  backgroundSize: "cover",
                }}
                className="rounded-xl bg-transparent border-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Category
              </Button>
              <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FFB13F] to-transparent h-[1.5px]" />
            </LiquidGlass>
          </div>
        </DialogTrigger>
        <DialogContent className="md:max-w-[425px] p-0 overflow-hidden">
          <div className="p-6 space-y-3">
            <DialogHeader className="px-0 pt-0 text-left">
              <DialogTitle className="text-xl font-semibold text-white">
                Add New Category
              </DialogTitle>
            </DialogHeader>

            {/* Category Name */}
            <div className="space-y-2 mt-3">
              <span className="text-[16px] font-normal text-white mb-4">
                Category Name
              </span>
              <LiquidGlass
                borderRadius="14px"
                className="bg-none mt-1.5 shadow-none"
              >
                <input
                  placeholder="Enter Category name"
                  className="w-full h-11 rounded-[14px] bg-none px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
              </LiquidGlass>
            </div>

            {/* Category Image */}
            <div className="space-y-2">
              <label className="text-[16px] font-normal text-white">
                Category Image
              </label>
              <div
                className={`relative flex flex-col items-center justify-center border border-dashed border-white rounded-2xl ${
                  categoryImage ? "py-3" : "py-6"
                } bg-white/20 text-center mt-1.5 cursor-pointer hover:bg-white/25 transition-colors`}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/png, image/jpeg";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      setCategoryImage(file);
                    }
                  };
                  input.click();
                }}
              >
                {categoryImage ? (
                  <div>
                    <span
                      className="absolute top-3 right-3 border border-white p-1 rounded-full bg-rose-500 cursor-pointer z-50"
                      onClick={() => setCategoryImage(null)}
                    >
                      <X className="w-4 h-4 text-white" />
                    </span>
                    <Image
                      width={128}
                      height={128}
                      src={URL.createObjectURL(categoryImage)}
                      alt="Category preview"
                      className="w-32 h-32 object-cover rounded-xl mb-3"
                    />
                  </div>
                ) : (
                  <>
                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                      <ImageIcon className="size-5 text-white/70" />
                    </div>
                    <p className="text-sm text-white/90 mb-1">
                      Upload your Category image.
                    </p>
                    <p className="text-[10px] text-white/40">
                      Only PNG, JPG format allowed.
                    </p>
                    <p className="text-[10px] text-white/40">
                      500x500 pixels are recommended.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Sub Category Name */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[16px] font-normal text-white">
                  Sub Category Name
                </label>
                <button
                  onClick={() =>
                    setSubCategory([...subCategory, { name: "", image: null }])
                  }
                  className="size-6 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
                >
                  <Plus className="size-4 text-white/70" />
                </button>
              </div>

              <div className="space-y-3 -mt-1.5">
                {subCategory.map((i, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <LiquidGlass
                      borderRadius="14px"
                      className="bg-none mt-1.5 shadow-none flex-1"
                    >
                      <input
                        placeholder="Enter Category name"
                        className="w-full h-11 rounded-[14px] bg-none px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                      />
                    </LiquidGlass>
                    <div
                      className="w-[88px] h-11 border border-dashed border-white rounded-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/png, image/jpeg";
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const updated = [...subCategory];
                            updated[idx].image = file;
                            setSubCategory(updated);
                          }
                        };
                        input.click();
                      }}
                    >
                      {i.image ? (
                        <Image
                          width={32}
                          height={32}
                          src={URL.createObjectURL(i.image)}
                          alt="Sub preview"
                          className="w-8 h-8 object-cover rounded"
                        />
                      ) : (
                        <>
                          <ImageIcon className="size-3 text-white" />
                          <span className="text-[8px] text-white">Upload Img</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-2">
              <DialogClose>
                <Button
                  asChild
                  variant="outline"
                  className=" h-11 rounded-xl bg-none bg-transparent text-white hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
              <LiquidGlass
                borderRadius="14px"
                className="bg-none mt-1.5 shadow-none"
              >
                <Button
                  style={{
                    backgroundImage: "url('/svg/button-background.svg')",
                  }}
                  className="w-[142px] h-12 rounded-[14px]"
                >
                  Add
                </Button>
              </LiquidGlass>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
