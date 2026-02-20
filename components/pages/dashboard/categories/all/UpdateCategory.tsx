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
import { updateCategory, updateSubCategory } from "@/service/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Category description is required"),
});

type FormValues = z.infer<typeof formSchema>;

export type TData = {
  name: string;
  description: string;
};

type TUpdateCategoryProps = {
  title: string;
  slug: "category" | "subCategory";
  data: TData;
  id: number;
};

const UpdateCategory = ({ title, slug, data, id }: TUpdateCategoryProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("updating...", { duration: 3000 });
    try {
      let result;
      if (slug === "category") {
        result = await updateCategory(data, id);
      } else {
        result = await updateSubCategory(data, id);
      }
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { id: toastId, duration: 3000 });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (value) {
            reset({
              name: data.name,
              description: data.description,
            });
          } else {
            reset();
          }
        }}
      >
        <DialogTrigger asChild>
          <button className="py-1.5 px-2 w-full rounded-lg cursor-pointer">
            Update
          </button>
        </DialogTrigger>
        <DialogContent className="w-[430px]! bg-[#1a102e] border-white/10 px-3 max-h-[80vh]! overflow-y-auto no-scrollbar">
          <div className="space-y-4 ">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white">
                {title}
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              {/* Category Name */}
              <div className="space-y-2">
                <Label className="text-white text-sm"> Name</Label>
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
                  buttonName="Update"
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

export default UpdateCategory;
