"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAddCustomerMutation } from "@/redux/features/customers/cutomersApi";
import { toast } from "sonner"; // ✅ Sooner import
import { useState } from "react";

// Zod Schema 
const customerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z
        .string()
        .min(11, "Phone number is too short")
        .max(15, "Phone number is too long"),
    email: z.string().email("Invalid email address"),
});

// Type infer
type CustomerFormValues = z.infer<typeof customerSchema>;
type Props = {
    setCustomerFilters: (val: any) => void;
    filters: {
        search: string,
        limit: number,
        page: number,
    };
    onSelectCustomer?: (id: number) => void;  // Optional prop
};
export function CreateCustomer({ setCustomerFilters, filters, onSelectCustomer }: Props) {
    const [addCustomer] = useAddCustomerMutation();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
    });

    const onSubmit = async (data: CustomerFormValues) => {
        const toastId = toast.loading("Creating customer...");
        try {
            const response = await addCustomer(data).unwrap();
            if (response.success) {
                setCustomerFilters({ ...filters, search: response.data.name });
                toast.success("Customer created successfully!", { id: toastId });
                console.log(response?.data?.id);
                onSelectCustomer?.(response.data.id);
                reset();
                setOpen(false);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || "Failed to create customer", { id: toastId });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Customer</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Create Customer</DialogTitle>
                        <DialogDescription>
                            Provide customer information and click save.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Name Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register("name")} placeholder="Enter name" />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" {...register("phone")} placeholder="e.g. 017XXXXXXXX" />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" {...register("email")} placeholder="example@email.com" />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}