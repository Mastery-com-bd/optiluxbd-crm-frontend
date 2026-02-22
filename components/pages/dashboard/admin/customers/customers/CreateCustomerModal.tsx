"use client";
import { Image as ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/ui/ButtonComponent";
import TriggeredButton from "@/components/ui/TriggeredButton";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatLabel } from "@/utills/formatLabel";

const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(11, "Phone must be at least 11 digits")
    .regex(/^\d+$/, "Phone must contain only numbers"),
  email: z.string().email("Invalid email"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  profession: z.string().min(2, "Profession is required"),
  isMarried: z.boolean(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  customerLevel: z.enum([
    "BRONZE_PENDING",
    "BRONZE",
    "SILVER_PENDING",
    "SILVER",
    "GOLD_PENDING",
    "GOLD",
    "DIAMOND_PENDING",
    "DIAMOND",
    "PLATINUM_PENDING",
    "PLATINUM",
  ]),
  status: z.boolean(),
});
type FormValues = z.infer<typeof customerSchema>;

const CreateCustomerModal = () => {
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      status: true,
      isMarried: false,
      customerLevel: "BRONZE_PENDING",
    },
  });

  const status = watch("status");

  const married = watch("isMarried");

  const onSubmit = (data: FormValues) => {
    const finalData = {
      ...data,
      image,
    };
    console.log(finalData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TriggeredButton name="Create Customer" />
      </DialogTrigger>
      <DialogContent className="w-[50vw]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-white">
              Add New Customer
            </DialogTitle>
            <LiquidGlass
              glowIntensity="xs"
              shadowIntensity="xs"
              borderRadius="16px"
            >
              <ButtonComponent
                buttonName="Add Customer"
                varient="yellow"
                type="submit"
              />
            </LiquidGlass>
          </DialogHeader>

          <div className="flex items-start justify-between gap-8 ">
            {/* left side */}
            <div className="space-y-4 w-full ">
              {/* profile Image */}
              <div className="h-full">
                <Label className="text-white text-sm">
                  Profile Photo (Optional)
                </Label>
                <div
                  className={`flex flex-col items-center justify-center border border-dashed border-white rounded-2xl w-full h-72 py-6 bg-white/20 text-center cursor-pointer hover:bg-white/25 transition-colors `}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/png, image/jpeg";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        setImage(file);
                      }
                    };
                    input.click();
                  }}
                >
                  {image ? (
                    <div className="relative ">
                      <button
                        className="absolute top-0 right-0 border border-white rounded-full bg-rose-500 cursor-pointer z-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(null);
                        }}
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                      <Image
                        src={URL.createObjectURL(image)}
                        height={400}
                        width={400}
                        alt="customer image"
                        className="w-72 h-72 object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center ">
                      <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <ImageIcon className="size-5 text-white/70" />
                      </div>
                      <p className="text-sm text-white/90">
                        Upload Customer image.
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

              {/* Name */}
              <div>
                <Label className="text-white text-sm">Name</Label>
                <Input
                  {...register("name")}
                  className="bg-transparent"
                  placeholder="enter name"
                />
                <p className="text-red-500 text-xs">{errors.name?.message}</p>
              </div>

              {/* Phone */}
              <div>
                <Label className="text-white text-sm">Phone</Label>
                <Input {...register("phone")} placeholder="01715xxxxxx" />
                <p className="text-red-500 text-xs">{errors.phone?.message}</p>
              </div>

              {/* Email */}
              <div>
                <Label className="text-white text-sm">Email</Label>
                <Input
                  {...register("email")}
                  placeholder="something@email.com"
                />
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              </div>
            </div>

            {/* right side */}
            <div className="space-y-4 w-full">
              {/* Date of Birth */}
              <div>
                <Label className="text-white text-sm">Date of Birth</Label>
                <Input type="date" {...register("date_of_birth")} />
                <p className="text-red-500 text-xs">
                  {errors.date_of_birth?.message}
                </p>
              </div>

              {/* Profession */}
              <div>
                <Label className="text-white text-sm">Profession</Label>
                <Input
                  {...register("profession")}
                  placeholder="enter profession"
                />
                <p className="text-red-500 text-xs">
                  {errors.profession?.message}
                </p>
              </div>

              {/* Gender */}
              <div>
                <Label className="text-white text-sm">Gender</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-transparent text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>

                      <SelectContent>
                        {["MALE", "FEMALE", "OTHER"].map((item) => (
                          <SelectItem key={item} value={item}>
                            {formatLabel(item)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* customerLevel */}
              <div>
                <Label className="text-white text-sm">Customer Label</Label>
                <Controller
                  control={control}
                  name="customerLevel"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-transparent text-white">
                        <SelectValue placeholder="Select Label" />
                      </SelectTrigger>

                      <SelectContent>
                        {[
                          "BRONZE_PENDING",
                          "BRONZE",
                          "SILVER_PENDING",
                          "SILVER",
                          "GOLD_PENDING",
                          "GOLD",
                          "DIAMOND_PENDING",
                          "DIAMOND",
                          "PLATINUM_PENDING",
                          "PLATINUM",
                        ].map((item) => (
                          <SelectItem key={item} value={item}>
                            {formatLabel(item)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.customerLevel && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.customerLevel.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                {/* status switcher */}
                <div className=" space-y-2">
                  <Label className="text-sm font-normal  text-white">
                    Status
                  </Label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setValue("status", !status)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition cursor-pointer ${
                        status ? "bg-blue-600" : "bg-gray-400"
                      } `}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                          status ? "translate-x-9" : "translate-x-1"
                        } `}
                      />
                    </button>
                    <Label className="text-sm font-normal text-white">
                      {status ? "Active" : "Inactive"}
                    </Label>
                  </div>
                </div>

                {/* maritual status switcher */}
                <div className=" space-y-2">
                  <Label className="text-sm font-normal  text-white">
                    Maritual Status
                  </Label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setValue("isMarried", !married)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition cursor-pointer ${
                        married ? "bg-blue-600" : "bg-gray-400"
                      } `}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                          married ? "translate-x-9" : "translate-x-1"
                        } `}
                      />
                    </button>
                    <Label className="text-sm font-normal text-white">
                      {married ? "Married" : "Unmarried"}
                    </Label>
                  </div>
                </div>
              </div>

              {/* address */}
              <div className="space-y-2">
                <Label className="text-sm font-normal text-white">
                  Address
                </Label>
                <Input
                  placeholder="address"
                  className="w-full py-2 rounded-lg text-sm bg-transparent"
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomerModal;
