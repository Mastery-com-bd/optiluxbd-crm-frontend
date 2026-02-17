"use client";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
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
import { Input } from "@/components/ui/input";;
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createScratchCard } from "@/service/scratch-cards/scratchCard";
import { TCreateScratchCard } from "@/types/scratch-cards/scratch-cards.type";
import { toast } from "sonner";

// Zod Schema
const couponSchema = z.object({
    amount: z.number().min(1, { message: "Amount is required" }),
    count: z.number().min(1, { message: "Count is required" }),
    expiryDate: z.string({ message: "Expiry date is required" }),
    batchId: z
        .string()
        .min(1, { message: "Batch ID is required" })
        .regex(/^[a-zA-Z0-9_-]+$/, {
            message: "Batch ID can only contain letters, numbers, hyphens, and underscores",
        }),
    isPublic: z.boolean(),
});

type CouponFormData = z.infer<typeof couponSchema>;

export default function CreateCoupon() {
    const [open, setOpen] = useState(false);
    const form = useForm<CouponFormData>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            isPublic: false,
        },
    });


    const onSubmit = async (data: CouponFormData) => {
        const toastId = toast.loading("Creating scratch cards...");
        const res = await createScratchCard(data as TCreateScratchCard);
        console.log(res);
        if (res.success) {
            toast.success("Scratch cards created successfully!", { id: toastId });
            form.reset();
            setOpen(false);
        } else {
            toast.error("Failed to create scratch cards.", { id: toastId });
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <ButtonComponent
                        buttonName="Create New Coupon"
                        varient="yellow"
                        icon={Plus}
                    />
                </DialogTrigger>
                <DialogContent className="max-w-[500px]!">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Create New Coupon</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to generate new coupon codes. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-2 ">
                                {/* Amount Field */}
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Amount <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl >
                                                <Input
                                                    type="number"
                                                    placeholder="Enter coupon amount"
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value === "" ? undefined : Number(e.target.value)
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Count Field */}
                                <FormField
                                    control={form.control}
                                    name="count"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Count <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Number of coupons to generate"
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value === "" ? undefined : Number(e.target.value)
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Expiry Date Field */}
                                <FormField
                                    control={form.control}
                                    name="expiryDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Expiry Date <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Batch ID Field */}
                                <FormField
                                    control={form.control}
                                    name="batchId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Batch ID <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., BATCH-001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Is Public Switch */}
                                <FormField
                                    control={form.control}
                                    name="isPublic"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Make Public</FormLabel>
                                                <p className="text-sm text-muted-foreground">
                                                    Allow this coupon to be visible to all users
                                                </p>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <ButtonComponent type="submit" buttonName="Create Coupons" varient="yellow" />
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}