"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCreateBulkSteadFastOrderMutation } from "@/redux/features/couriar/steadfast/steadfastCouriarApi";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

type OrderToCourier = {
    orderId?: string;
    invoice?: string;
    recipient_name?: string;
    recipient_phone?: string;
    cod_amount?: string;
    recipient_address?: string;
    note?: string;
};

type PlaceBulkOrderProps = {
    isOpen: boolean;
    onOpenChange?: (open: boolean) => void;
    setIsDialogOpen: (open: boolean) => void;
    orders: { data?: OrderToCourier[] };
};

export function PlaceBulkOrder({
    isOpen,
    onOpenChange,
    orders,
    setIsDialogOpen,
}: PlaceBulkOrderProps) {
    const [createSteadFastBulkOrder] = useCreateBulkSteadFastOrderMutation();
    const [selectedCourier, setSelectedCourier] = useState<
        "SteedFast" | "Pathao" | "Redex"
    >("SteedFast");

    const [note, setNote] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const handleSubmit = async () => {
        const toastId = toast.loading(`Placing order to ${selectedCourier} ...`);
        try {
            const ordersWithNote = {
                data: orders?.data?.map((o) => ({
                    ...o,
                    note: note || "No note provided",
                })) ?? [],
            };

            if (selectedCourier === "SteedFast") {
                await createSteadFastBulkOrder(ordersWithNote).unwrap();
            } else if (selectedCourier === "Pathao") {
                // TODO: Pathao API
            } else if (selectedCourier === "Redex") {
                // TODO: Redex API
            }

            toast.success("Order placed successfully!", { id: toastId });
            onOpenChange?.(false);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong placing the order.", { id: toastId });
        }
    };

    const totalOrders = orders?.data?.length ?? 0;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Place Bulk Order</DialogTitle>
                    <DialogDescription>
                        You&apos;re about to book {totalOrders} order
                        {totalOrders !== 1 && "s"} to {selectedCourier}.
                    </DialogDescription>
                </DialogHeader>

                <Input
                    type="text"
                    placeholder="Enter a note for all orders"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="my-2"
                />

                <div className="flex gap-6 my-3">
                    {["SteedFast", "Pathao", "Redex"].map((courier) => (
                        <Label
                            key={courier}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="courier"
                                value={courier}
                                checked={selectedCourier === courier}
                                onChange={() =>
                                    setSelectedCourier(
                                        courier as "SteedFast" | "Pathao" | "Redex"
                                    )
                                }
                            />
                            {courier}
                        </Label>
                    ))}
                </div>

                <div className="max-h-[300px] overflow-y-auto px-1 my-2 rounded-md border p-3 bg-gray-50 dark:bg-muted">
                    {orders?.data?.length ? (
                        orders?.data?.map((order, index) => (
                            <div
                                key={index}
                                className="text-sm text-muted-foreground border-b py-2"
                            >
                                <div className="font-medium">{order?.invoice ?? "N/A"}</div>
                                <div>{order?.recipient_name ?? "N/A"}</div>
                                <div>{order?.recipient_phone ?? "N/A"}</div>
                                <div>{order?.recipient_address ?? "N/A"}</div>
                                <div>COD: {order?.cod_amount ?? "0"}৳</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm text-muted-foreground">
                            No orders to preview.
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DialogClose>

                    {/* Trigger Alert Dialog via State */}
                    <Button variant="outline" onClick={() => {
                        setIsDialogOpen(false)
                        setIsAlertOpen(true)
                    }}>
                        Continue
                    </Button>

                    {/* Alert Dialog Controlled by State */}
                    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                        <AlertDialogContent className="z-50">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will place {totalOrders} order
                                    {totalOrders !== 1 && "s"} with {selectedCourier}.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        handleSubmit();
                                        setIsAlertOpen(false);
                                    }}
                                >
                                    Book Orders
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}