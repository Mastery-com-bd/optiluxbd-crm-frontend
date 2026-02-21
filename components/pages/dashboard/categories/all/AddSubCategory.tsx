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
import { createSubCategories } from "@/service/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Validation Schema
const formSchema = z.object({
  subCategories: z.array(
    z.object({
      name: z.string().min(1, "Subcategory name is required"),
      description: z.string().min(1, "Subcategory description is required"),
      image: z.any().optional(),
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

const AddSubCategory = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
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
      subCategories: [{ name: "", description: "", image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const onSubmit = async (data: FormValues) => {
    const subcategoryData = data?.subCategories || [];
    const categoryId = id;
    const formattedSubCategories = subcategoryData.map((sub) => ({
      name: sub.name,
      description: sub.description,
      categoryId: categoryId as number,
    }));
    const toastId = toast.loading("Creating sub-categories...");
    try {
      const result = await createSubCategories(formattedSubCategories);
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
        reset();
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId });
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
              buttonName="Create Sub-Category"
              icon={Plus}
              varient="yellow"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="w-[450px]! bg-[#1a102e] border-white/10 px-3">
          <div className="space-y-4 ">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white flex items-center justify-between">
                <p>Add New Sub-Categories</p>
                <button
                  type="button"
                  onClick={() =>
                    append({ name: "", description: "", image: null })
                  }
                  className={`size-6 rounded flex items-center justify-center border border-white/10 bg-white/10 hover:bg-white/20 cursor-pointer`}
                >
                  <Plus className="size-4 text-white" />
                </button>
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 w-full"
            >
              {/* Dynamic Sub-Categories */}
              <div className="space-y-3 ">
                {fields.length > 0 && (
                  <div className="max-h-96 overflow-y-auto space-y-3 no-scrollbar p-1">
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
                          {errors.subCategories?.[index]?.name && (
                            <p className="text-xs text-red-500">
                              {errors.subCategories[index]?.name?.message}
                            </p>
                          )}

                          <Input
                            {...register(`subCategories.${index}.description`)}
                            placeholder="Sub-category description"
                          />
                          {errors.subCategories?.[index]?.description && (
                            <p className="text-xs text-red-500">
                              {
                                errors.subCategories[index]?.description
                                  ?.message
                              }
                            </p>
                          )}
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
                            onClick={() => fields.length > 1 && remove(index)}
                            disabled={fields.length === 1}
                            className={`${
                              fields.length === 1
                                ? "text-gray-500 cursor-not-allowed opacity-40"
                                : "text-red-400 hover:text-red-500 cursor-pointer"
                            }`}
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
                  buttonName="Create Sub-Category"
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

export default AddSubCategory;
