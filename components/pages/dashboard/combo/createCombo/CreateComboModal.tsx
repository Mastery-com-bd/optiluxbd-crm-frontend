/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  LinkIcon,
  ImageIcon,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TComboData } from "./CreateCombo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateComboMutation } from "@/redux/features/combo/comboApi";
import { TComboPack } from "@/types/comboPackage";

const CreateComboModal = ({
  selectedProducts,
}: {
  selectedProducts: TComboData[];
}) => {
  const [open, setOpen] = useState(false);
  const [createCombo] = useCreateComboMutation();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TComboPack>({});

  const onSubmit = async (data: TComboPack) => {
    data.sku = `PKG-${data.sku}`;
    if (data.tags as string) {
      data.tags = (data.tags as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    const finalData = { ...data, items: selectedProducts };
    console.log(finalData);
    return;
    try {
      const res = await createCombo(finalData).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        reset();
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error);
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          disabled={selectedProducts.length < 2}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Combo
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] w-[90vw] rounded-xl">
        <DialogHeader>
          <DialogTitle>Create A New Combo</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new combo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="combo name"
              className={`${
                errors.name
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
              {...register("name", { required: "Name is required" })}
            />
          </div>

          <div>
            <Label htmlFor="description">Product Description</Label>
            <div className="mt-2 border rounded">
              <div className="flex gap-2 border-b p-2 bg-muted overflow-auto">
                <Bold className="w-4 h-4" />
                <Italic className="w-4 h-4" />
                <Underline className="w-4 h-4" />
                <Strikethrough className="w-4 h-4" />
                <Code className="w-4 h-4" />
                <List className="w-4 h-4" />
                <LinkIcon className="w-4 h-4" />
                <ImageIcon className="w-4 h-4" />
              </div>
              <Textarea
                id="description"
                {...register("description", {
                  required: "description is required",
                })}
                placeholder="Product description..."
                rows={6}
                className={`${
                  errors.description
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="sku">SKU *</Label>
            <Input
              id="sku"
              placeholder="SKU can only contain letters, numbers, hyphens, and underscores"
              {...register("sku", {
                required: "SKU is required",
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message:
                    "SKU can only contain letters, numbers, hyphens, and underscores",
                },
              })}
              className={`${
                errors.sku
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountPrice">Discount Price</Label>
            <Input
              id="discountPrice"
              type="number"
              step="0.01"
              placeholder="Enter discount price"
              {...register("discountPrice", {
                required: "Discount price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price cannot be negative" },
              })}
              className={`${
                errors.discountPrice
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="is_featured">Is Featured?</Label>

            <Controller
              name="is_featured"
              control={control}
              rules={{
                validate: (v) =>
                  v === true || v === false || "Please select a value",
              }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={
                    field.value === undefined
                      ? ""
                      : field.value
                      ? "true"
                      : "false"
                  }
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.is_featured
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                  >
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* ✅ Tags Input */}
          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="e.g. electronics, starter, bundle"
              {...register("tags")}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate tags with commas (e.g., mobile, laptop, offer)
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
          >
            {isSubmitting ? "Creating Combo..." : "Create Combo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComboModal;
