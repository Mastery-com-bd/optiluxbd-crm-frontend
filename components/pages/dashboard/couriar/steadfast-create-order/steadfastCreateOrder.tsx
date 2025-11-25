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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSteadFastOrderMutation } from "@/redux/features/couriar/couriarApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  invoice: z.string().min(1, "Invoice is required"),
  recipient_name: z.string().min(1, "Recipient name is required"),
  recipient_phone: z
    .string()
    .min(1, "Recipient phone is required")
    .regex(
      /^(\+8801|01)[0-9]{9}$/,
      "Must be a valid Bangladeshi number (e.g. +8801XXXXXXXXX or 01XXXXXXXXX)"
    ),
  recipient_address: z.string().min(1, "Recipient address is required"),
  cod_amount: z.string().min(1, "COD amount is required"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SteadfastCreateOrder() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice: "",
      recipient_name: "",
      recipient_phone: "",
      recipient_address: "",
      cod_amount: "",
      note: "",
    },
  });

  const [createSteadFastOrder] = useCreateSteadFastOrderMutation();
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {

    const payload = {
      ...values,
      cod_amount: Number(values.cod_amount),
    }

    toast.loading("Saving courier...");
    try {
      const res = await createSteadFastOrder(payload).unwrap();
      console.log("Create Steadfast Order Response", res);
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, { duration: 3000 });
        router.refresh();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.dismiss();
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Steadfast Order</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Steadfast Order</CardTitle>
          <CardDescription>
            POST /api/v1/couriers/steadfast/create-order
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
                name="recipient_name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice</FormLabel>
                    <FormControl>
                      <Input placeholder="INV-1001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipient_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+8801XXXXXXXXX" maxLength={11} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipient_address"
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
                name="cod_amount"
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
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin" />
                  )}
                  {form.formState.isSubmitting ? "Saving..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
