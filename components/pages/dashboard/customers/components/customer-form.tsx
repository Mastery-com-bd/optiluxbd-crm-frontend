"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useAddCustomerMutation } from "@/redux/features/customers/cutomersApi";
import { toast } from "sonner";
import { TCustomer } from "@/types/customer.types";

const customerFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(?:\+?880|0)1[3-9]\d{8}$/,
      "Please enter a valid Bangladeshi phone number"
    ),
  address: z.string().optional(),
  district: z.string().optional(),
  thana: z.string().optional(),
  date_of_birth: z.string().optional(),
  profession: z.string().optional(),
  isMarried: z.boolean().optional(),
  gender: z
    .enum(["MALE", "FEMALE", "OTHER", "NOT_SPECIFIED"])
    .default("NOT_SPECIFIED")
    .optional(),
  customerLevel: z
    .enum(["BRONZE_PENDING", "BRONZE", "SILVER", "GOLD", "PLATINUM"])
    .default("BRONZE_PENDING")
    .optional(),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  customer?: TCustomer;
}

export default function CustomerForm({
  customer: initialData,
}: CustomerFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [addCustomer] = useAddCustomerMutation();

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: initialData
      ? {
          name: initialData?.name ?? "",
          phone: initialData?.phone ?? "",
          address: initialData?.address ?? "",
          district: initialData?.district ?? "",
          thana: initialData?.thana ?? "",
          date_of_birth: initialData?.date_of_birth ?? "",
          profession: initialData?.profession ?? "",
          isMarried: initialData?.isMarried ?? false,
          gender:
            (initialData?.gender as CustomerFormValues["gender"]) ??
            "NOT_SPECIFIED",
          customerLevel:
            (initialData?.customerLevel as CustomerFormValues["customerLevel"]) ??
            "BRONZE_PENDING",
        }
      : {
          name: "Test User",
          phone: "",
          address: "",
          district: "",
          thana: "",
          date_of_birth: undefined,
          profession: undefined,
          isMarried: undefined,
          gender: "NOT_SPECIFIED",
          customerLevel: "BRONZE_PENDING",
        },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    setIsLoading(true);
    toast.loading("Saving customer...");
    console.log(values);

    try {
      const res = await addCustomer(values).unwrap();
      console.log("Add Customer Response", res);
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, {
          duration: 3000,
        });
        router.refresh();
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.dismiss();
      toast.dismiss();
      toast.error(errorInfo, { duration: 3000 });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg border border-border bg-card p-6"
      >
        {/* Personal Information Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Personal Information
          </h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={11}
                        placeholder="01XXXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
                        {...field}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length > 2)
                            val = val.slice(0, 2) + "-" + val.slice(2);
                          if (val.length > 5)
                            val = val.slice(0, 5) + "-" + val.slice(5, 9);
                          field.onChange(val);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                        <SelectItem value="NOT_SPECIFIED">
                          Not Specified
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter profession" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            <FormField
              control={form.control}
              name="isMarried"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Marital Status</FormLabel>
                  <FormDescription className="text-xs">
                    Indicate whether the customer is currently married
                  </FormDescription>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label className="text-sm font-medium cursor-pointer select-none">
                      Married
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Address Information Section */}
        <div className="border-t border-border pt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Address Information
          </h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter district" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thana/Upazila</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter thana or upazila" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Customer Classification Section */}
        <div className="border-t border-border pt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Customer Classification
          </h2>
          <FormField
            control={form.control}
            name="customerLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BRONZE_PENDING">
                      Bronze Pending
                    </SelectItem>
                    <SelectItem value="BRONZE">Bronze</SelectItem>
                    <SelectItem value="SILVER">Silver</SelectItem>
                    <SelectItem value="GOLD">Gold</SelectItem>
                    <SelectItem value="PLATINUM">Platinum</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="border-t border-border pt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : initialData
              ? "Update Customer"
              : "Create Customer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
