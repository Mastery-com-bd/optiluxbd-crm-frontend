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

// Validation Schema
const formSchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
  categoryImage: z.any().optional(),
  subCategories: z.array(
    z.object({
      name: z.string().min(1, "Subcategory name is required"),
      image: z.any().optional(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const AddCategory = () => {
  // 1. Hook Form Setup
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      subCategories: [{ name: "", image: null }],
    },
  });

  // 2. Field Array for Subcategories
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const categoryImage = watch("categoryImage");

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    // Ekhane tomar API call hobe
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative">
            <ButtonComponent buttonName="Create Category" icon={Plus} varient="yellow" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[403px]! p-0 overflow-hidden bg-[#1a102e] border-white/10">
          <div className="p-6 space-y-3">
            <DialogHeader className="px-0 pt-0 text-left">
              <DialogTitle className="text-xl font-semibold text-white">
                Add New Category
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Category Name */}
              <div className="space-y-2">
                <Label className="text-white">Category Name</Label>
                <Input
                  {...register("categoryName")}
                  placeholder="Enter Category name"
                  className="bg-white/10 border-white/20 text-white"
                />
                {errors.categoryName && <p className="text-xs text-red-500">{errors.categoryName.message}</p>}
              </div>

              {/* Category Image Upload */}
              <div className="space-y-2">
                <Label className="text-white">Category Image</Label>
                <div
                  className="relative flex flex-col items-center justify-center border border-dashed border-white/30 rounded-2xl py-6 bg-white/5 cursor-pointer hover:bg-white/10"
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
                        alt="Preview" width={100} height={100}
                        className="rounded-lg object-cover w-24 h-24"
                      />
                      <X className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 size-5 cursor-pointer" onClick={(e) => { e.stopPropagation(); setValue("categoryImage", null); }} />
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto size-6 text-white/50 mb-2" />
                      <p className="text-xs text-white/60">Upload Category Image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Sub-Categories */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Sub Category</Label>
                  <button
                    type="button"
                    onClick={() => append({ name: "", image: null })}
                    className="size-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 border border-white/10"
                  >
                    <Plus className="size-4 text-white" />
                  </button>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-3 pr-1 custom-scrollbar p-2  ">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 ">
                      <Input
                        {...register(`subCategories.${index}.name`)}
                        placeholder="Sub-category name"
                      />

                      {/* Sub-category Image Small Upload */}
                      <div
                        className="size-10 border border-dashed border-white/30 rounded flex items-center justify-center cursor-pointer bg-white/5"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) setValue(`subCategories.${index}.image`, file);
                          };
                          input.click();
                        }}
                      >
                        {watch(`subCategories.${index}.image`) ? (
                          <Image
                            src={URL.createObjectURL(watch(`subCategories.${index}.image`))}
                            alt="sub" width={40} height={40} className="size-full object-cover rounded"
                          />
                        ) : (
                          <ImageIcon className="size-4 text-white/40" />
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-red-400 hover:text-red-500"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <DialogClose asChild>
                  <Button variant="ghost" className="text-white cursor-pointer hover:text-red-700">Cancel</Button>
                </DialogClose>
                <ButtonComponent buttonName="Create Category" type="submit" varient="yellow" clasName="cursor-pointer"/>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;