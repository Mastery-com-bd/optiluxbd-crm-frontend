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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateCouriarStatusMutation } from "@/redux/features/couriar/couriarApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  id: z.string().min(1, "Courier ID is required"),
  status: z.enum([
    "PENDING",
    "IN_TRANSIT",
    "DELIVERED",
    "RETURNED",
    "CANCELLED",
  ]),
  consignmentId: z.string().optional(),
  trackingCode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LocalUpdateCourierStatus() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      status: "PENDING",
      consignmentId: "",
      trackingCode: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
    const [updateCouriarStatus] = useUpdateCouriarStatusMutation();
    const router = useRouter();
  

  const onSubmit = async (values: FormValues) => {
    const payload = {
      id: values.id,
      data: {
        status: values.status,
        consignmentId: values.consignmentId || undefined,
        trackingCode: values.trackingCode || undefined,
      },
    };
    setIsLoading(true);
    toast.loading("Updating courier status...");

    try {
      const res = await updateCouriarStatus(payload).unwrap();
      console.log("Update Courier Status Response", res);
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
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Update Courier Status</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Status Update</CardTitle>
          <CardDescription>PATCH /api/v1/couriers/:id/status</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Courier ID</FormLabel>
                    <FormControl>
                      <Input placeholder="UUID or numeric ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="IN_TRANSIT">IN_TRANSIT</SelectItem>
                        <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                        <SelectItem value="RETURNED">RETURNED</SelectItem>
                        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consignmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consignment ID (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trackingCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tracking Code (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
