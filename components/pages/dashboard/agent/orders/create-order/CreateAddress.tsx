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
import { toast } from "sonner";
import { useState } from "react";
import { useCreateCustomerAddressMutation } from "@/redux/features/customers/cutomersApi";

// Validation schema
const addressSchema = z.object({
    division: z.string().min(1, "Division is required"),
    city: z.string().min(1, "City is required"),
    thana: z.string().min(1, "Thana is required"),
    post: z.string().min(1, "Post Office is required"),
    street: z.string().min(1, "Street is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

type Props = {
    id: number | null | string;
    refetch: () => void;
};

const CreateAddress = ({ id, refetch }: Props) => {
    const [addAddress] = useCreateCustomerAddressMutation();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
    });

    const onSubmit = async (
        data: AddressFormValues,
        event?: React.BaseSyntheticEvent
    ) => {
        event?.preventDefault();
        const toastId = toast.loading("Creating address...");

        try {
            await addAddress({
                customerId: id,
                data,
            }).unwrap();

            toast.success("Address created successfully", { id: toastId });
            reset();
            setOpen(false);
            refetch();
        } catch (error: unknown) {
            console.error("Create address failed:", error);
            toast.error("Failed to create address", { id: toastId });
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) reset();
            }}
        >
            <DialogTrigger asChild>
                <Button type="button" variant="outline">
                    Add Address
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <DialogHeader>
                        <DialogTitle>Create Address</DialogTitle>
                        <DialogDescription>
                            Fill out the address details below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="division">Division</Label>
                            <Input
                                id="division"
                                placeholder="e.g. Dhaka"
                                {...register("division")}
                            />
                            {errors.division && (
                                <p className="text-sm text-red-500">
                                    {errors.division.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                placeholder="e.g. Dhaka City"
                                {...register("city")}
                            />
                            {errors.city && (
                                <p className="text-sm text-red-500">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="thana">Thana</Label>
                            <Input
                                id="thana"
                                placeholder="e.g. Dhanmondi"
                                {...register("thana")}
                            />
                            {errors.thana && (
                                <p className="text-sm text-red-500">
                                    {errors.thana.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="post">Post Office</Label>
                            <Input
                                id="post"
                                placeholder="e.g. 1209"
                                {...register("post")}
                            />
                            {errors.post && (
                                <p className="text-sm text-red-500">
                                    {errors.post.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="street">Street</Label>
                            <Input
                                id="street"
                                placeholder="e.g. 123 Main St"
                                {...register("street")}
                            />
                            {errors.street && (
                                <p className="text-sm text-red-500">
                                    {errors.street.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Address"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAddress;