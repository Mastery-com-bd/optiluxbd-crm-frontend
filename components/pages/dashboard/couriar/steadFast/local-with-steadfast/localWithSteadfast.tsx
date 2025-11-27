"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCouriarWithSteadFastMutation } from "@/redux/features/couriar/couriarApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientPhone: z.string().min(1, "Recipient phone is required"),
  recipientAddress: z.string().min(1, "Recipient address is required"),
  codAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "COD amount must be a non-negative number",
    })
    .min(1, "COD amount is required"),
  deliveryCharge: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Delivery charge must be a non-negative number",
    })
    .min(1, "Delivery charge is required"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LocalCreateWithSteadfast() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: "",
      recipientName: "",
      recipientPhone: "",
      recipientAddress: "",
      codAmount: "",
      deliveryCharge: "",
      note: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createCouriarWithSteadFast] = useCreateCouriarWithSteadFastMutation();

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    toast.loading("Saving courier...");

    try {
      const payload = {
        ...values,
        orderId: Number(values.orderId),
        codAmount: Number(values.codAmount),
        deliveryCharge: Number(values.deliveryCharge),
      };
      const res = await createCouriarWithSteadFast(payload).unwrap();
      console.log("Create Courier Response", res);
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, {
          duration: 3000,
        });
        form.reset();
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
      form.reset();
      toast.error(errorInfo, { duration: 3000 });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Courier with Steadfast</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Local + Steadfast</CardTitle>
          <CardDescription>
            POST /api/v1/couriers/with-steadfast
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ORD-1002" {...field} />
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
                      <Input placeholder="+8801XXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipientAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Recipient Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Address..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="codAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>COD Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryCharge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Charge</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Note (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Notes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2 flex justify-end">
                <div className="md:col-span-2 flex justify-end">
                  <Button disabled={isLoading} type="submit">
                    {isLoading && <Loader2 className="animate-spin" />}
                    {isLoading ? "Saving..." : "Submit"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
