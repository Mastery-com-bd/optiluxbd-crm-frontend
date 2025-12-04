"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { useCreatePathaoCouriarMutation } from "@/redux/features/couriar/pathao/pathaoCouriarAPI";
import { Loader2 } from "lucide-react";

const phoneRegex = /^(\+?88)?01[3-9]\d{8}$/;

const PathaoSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  storeId: z.number().int().min(1, "Store ID is required"),
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z.string().regex(phoneRegex, "Enter a valid BD phone number"),
  recipientAddress: z.string().min(10, "Provide a detailed address"),
  deliveryType: z.number().int().min(1, "Select a delivery type"),
  itemType: z.number().int().min(1, "Select an item type"),
  itemQuantity: z.number().int().min(1, "Quantity must be at least 1"),
  itemWeight: z.number().min(0, "Weight must be zero or more"),
  itemDescription: z.string().min(2, "Description is required"),
  amountToCollect: z.number().min(0, "Amount must be zero or more"),
  specialInstruction: z.string().optional(),
});

type PathaoFormValues = z.infer<typeof PathaoSchema>;

export default function CreatePathaoCouriar() {
  const form = useForm<PathaoFormValues>({
    resolver: zodResolver(PathaoSchema),
    defaultValues: {
      orderId: "",
      storeId: 149048,
      recipientName: "",
      recipientPhone: "",
      recipientAddress: "",
      deliveryType: 48,
      itemType: 2,
      itemDescription: "",
      specialInstruction: "",
    },
  });

  const [createPathaoCouriar, { isLoading }] = useCreatePathaoCouriarMutation();

  const onSubmit = async (values: PathaoFormValues) => {
    toast.loading("Saving courier...");

    try {
      const payload = {
        ...values,
        orderId: Number(values.orderId)
      }
      const res = await createPathaoCouriar(payload).unwrap();
      console.log("Create Courier Response", res);
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, {
          duration: 3000,
        });
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.dismiss();
      form.reset();
      toast.error(errorInfo, { duration: 3000 });
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Pathao Courier</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order ID</FormLabel>
                      <FormControl>
                        <Input type="number" inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <section className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="01XXXXXXXXX"
                          inputMode="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Address</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="House, Road, Area, City, Postcode"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="deliveryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Type</FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        value={String(field.value ?? "")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select delivery type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="48">Regular (48)</SelectItem>
                          <SelectItem value="12">Express (12)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="itemType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Type</FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        value={String(field.value ?? "")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Parcel (1)</SelectItem>
                          <SelectItem value="2">Document (2)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="itemQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="itemWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          inputMode="decimal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amountToCollect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount to Collect</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          inputMode="decimal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <section className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="itemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Describe the item"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialInstruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Instruction</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={2}
                          placeholder="Optional instructions"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <div className="flex items-center justify-end gap-3">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />{" "}
                      &quot;Submitting...&quot;
                    </>
                  ) : (
                    "Create Courier"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
