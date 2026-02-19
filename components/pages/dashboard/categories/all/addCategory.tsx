/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Plus, X, Trash2 } from "lucide-react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  createCategories,
  createSubCategories,
  uploadCategoryImage,
} from "@/service/category";
import { useState } from "react";

// Validation Schema
const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Category description is required"),
  categoryImage: z.any().optional(),
  subCategories: z
    .array(
      z.object({
        name: z.string().min(1, "Subcategory name is required"),
        description: z.string().min(1, "Subcategory description is required"),
        image: z.any().optional(),
      }),
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddCategory = () => {
  const [open, setOpen] = useState(false);
  // 1. Hook Form Setup
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      subCategories: [],
    },
  });

  // 2. Field Array for Subcategories
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const categoryImage = watch("categoryImage");
  const categoryName = watch("name");
  const categoryDescription = watch("description");

  const isCategoryValid =
    categoryName?.trim() !== "" && categoryDescription?.trim() !== "";

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    const categoryData = {
      name: data?.name,
      description: data?.description,
    };
    const subcategoryData = data?.subCategories || [];
    const toastId = toast.loading("Creating category...");

    try {
      const result = await createCategories(categoryData);
      if (!result?.success) {
        toast.error(result?.message, { id: toastId });
        return;
      }
      toast.success(result?.message, { id: toastId });
      const categoryId = result?.data?.id;
      if (data?.categoryImage) {
        const imageLoadingId = toast.loading("image uploading", {
          duration: 3000,
        });
        formData.append("category_image", data?.categoryImage);
        const imageUploadResult = await uploadCategoryImage(
          formData,
          categoryId,
        );
        console.log(imageUploadResult);
        if (imageUploadResult?.success) {
          toast.success(imageUploadResult?.message, { id: imageLoadingId });
        } else {
          toast.error(imageUploadResult?.message, { id: imageLoadingId });
        }
      }

      if (!subcategoryData.length) {
        reset();
        setOpen(false);
        return;
      }

      const formattedSubCategories = subcategoryData.map((sub) => ({
        name: sub.name,
        description: sub.description,
        categoryId: categoryId as number,
      }));

      const toastId2 = toast.loading("Creating subcategories...");
      const result2 = await createSubCategories(formattedSubCategories);

      if (result2?.success) {
        toast.success(result2?.message, { id: toastId2 });
        reset();
        setOpen(false);
      } else {
        toast.error(result2?.message, { id: toastId2 });
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            reset();
          }
        }}
      >
        <DialogTrigger asChild>
          <div className="relative">
            <ButtonComponent
              buttonName="Create Category"
              icon={Plus}
              varient="yellow"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="w-[430px]! bg-[#1a102e] border-white/10 px-3">
          <div className="space-y-4 ">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white">
                Add New Category
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              {/* Category Name */}
              <div className="space-y-2">
                <Label className="text-white text-sm">Category Name</Label>
                <Input
                  {...register("name")}
                  placeholder="Enter Category name"
                  className="bg-white/10 border-white/20 text-white"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">Description</Label>
                <Input
                  {...register("description")}
                  placeholder="Enter category description"
                  className="bg-white/10 border-white/20 text-white"
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Category Image Upload */}
              <div className="space-y-3 ">
                <Label className="text-white text-sm">Category Image</Label>
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-white/50 rounded-2xl w-full h-44 bg-white/20 text-center cursor-pointer hover:bg-white/25 transition-colors"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) setValue("categoryImage", file);
                    };
                    input.click();
                  }}
                >
                  {categoryImage ? (
                    <div className="relative">
                      <Image
                        src={URL.createObjectURL(categoryImage)}
                        alt="Preview"
                        width={250}
                        height={250}
                        className="rounded-lg object-cover w-40 h-40"
                      />
                      <X
                        className="absolute top-0 right-0 bg-red-500 rounded-full p-1 size-5 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue("categoryImage", null);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center ">
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

              {/* Dynamic Sub-Categories */}
              <div className="space-y-3 ">
                <div className="flex items-center justify-between ">
                  <Label className="text-white">Sub Category</Label>
                  <button
                    type="button"
                    disabled={!isCategoryValid}
                    onClick={() =>
                      append({ name: "", description: "", image: null })
                    }
                    className={`size-6 rounded flex items-center justify-center border border-white/10 ${isCategoryValid ? "bg-white/10 hover:bg-white/20 cursor-pointer" : "bg-white/5 opacity-40 cursor-not-allowed"}`}
                  >
                    <Plus className="size-4 text-white" />
                  </button>
                </div>

                {fields.length > 0 && (
                  <div className="max-h-66 overflow-y-auto space-y-3 no-scrollbar p-1">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex flex-col gap-2 w-full">
                          <Input
                            {...register(`subCategories.${index}.name`)}
                            placeholder="Sub-category name"
                          />

                          <Input
                            {...register(`subCategories.${index}.description`)}
                            placeholder="Sub-category description"
                          />
                        </div>

                        {/* Sub-category Image Small Upload */}
                        <div className="flex items-center gap-2">
                          <div
                            className="border-2 border-dashed border-white/50 flex items-center justify-center cursor-pointer bg-white/5 w-24 h-20 rounded-lg"
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement)
                                  .files?.[0];
                                if (file)
                                  setValue(
                                    `subCategories.${index}.image`,
                                    file,
                                  );
                              };
                              input.click();
                            }}
                          >
                            {watch(`subCategories.${index}.image`) ? (
                              <div>
                                <Image
                                  src={URL.createObjectURL(
                                    watch(`subCategories.${index}.image`),
                                  )}
                                  alt="sub"
                                  width={250}
                                  height={250}
                                  className="rounded w-[75px] h-[75px]"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <ImageIcon className="size-8 text-white/50" />
                                <p className="text-white text-xs">
                                  Upload Image
                                </p>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className=" text-red-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Buttons */}

              <div className="flex justify-end gap-3 ">
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="text-white cursor-pointer hover:text-red-700 "
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <ButtonComponent
                  buttonName="Create Category"
                  type="submit"
                  varient="yellow"
                  clasName="cursor-pointer"
                />
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
