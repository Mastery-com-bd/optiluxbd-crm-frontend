/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bangladeshData } from "@/constants/DivisionDataset";
import { useCreateANewAddressMutation } from "@/redux/features/address/addressApi";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

// Zod Schema Validation
const addressSchema = z.object({
  division: z.string().min(1, "Division is required"),
  city: z.string().min(1, "District is required"),
  thana: z.string().min(1, "Thana is required"),
  post: z.string().min(1, "Post is required"),
  street: z.string().min(1, "Street is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const CreateAddressComponent = ({
  setCreateEditing,
}: {
  setCreateEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const [createAddress] = useCreateANewAddressMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const selectedDivision = watch("division");
  const selectedCity = watch("city");

  const districts =
    bangladeshData.find((d) => d.division === selectedDivision)?.districts ||
    [];
  const thanas = districts.find((d) => d.city === selectedCity)?.thanas || [];

  const onSubmit = async (data: AddressFormValues) => {
    try {
      const res = await createAddress(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        reset();
        setCreateEditing(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Division */}
        <div className="space-y-1">
          <label className="font-medium">Division</label>
          <Select onValueChange={(value) => setValue("division", value)}>
            <SelectTrigger
              className={`w-full ${errors.division && "border border-red-400"}`}
            >
              <SelectValue placeholder="Select Division" />
            </SelectTrigger>
            <SelectContent>
              {bangladeshData.map((d) => (
                <SelectItem key={d.division} value={d.division}>
                  {d.division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District / City */}
        <div className="space-y-1">
          <label className="font-medium">District</label>
          <Select onValueChange={(value) => setValue("city", value)}>
            <SelectTrigger
              className={`w-full ${errors.city && "border border-red-400"}`}
            >
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d.city} value={d.city}>
                  {d.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Thana */}
        <div className="space-y-1">
          <label className="font-medium">Thana</label>
          <Select onValueChange={(value) => setValue("thana", value)}>
            <SelectTrigger
              className={`w-full ${errors.thana && "border border-red-400"}`}
            >
              <SelectValue placeholder="Select Thana" />
            </SelectTrigger>
            <SelectContent>
              {thanas.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Post */}
        <div className="space-y-1">
          <label className="font-medium">Post</label>
          <Input
            placeholder="Post office..."
            {...register("post")}
            className={`${errors.post && "border border-red-400"}`}
          />
        </div>

        {/* Street */}
        <div className="space-y-1">
          <label className="font-medium">Street</label>
          <Input
            placeholder="Street address..."
            {...register("street")}
            className={`${errors.street && "border border-red-400"}`}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => setCreateEditing(false)}
          className=" flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
        >
          Cancell
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className=" bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
        >
          {isSubmitting ? "Creating Address..." : "Create Address"}
        </Button>
      </div>
    </form>
  );
};

export default CreateAddressComponent;
