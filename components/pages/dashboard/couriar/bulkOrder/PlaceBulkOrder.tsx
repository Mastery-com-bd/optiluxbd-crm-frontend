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
import { Label } from "@/components/ui/label";
import { useCreateBulkSteadFastOrderMutation } from "@/redux/features/couriar/couriarApi";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type PlaceBulkOrderProps = {
    isOpen: boolean;
    onOpenChange?: (open: boolean) => void;
    orders: {
        orderId: string;
        invoice: string;
        recipient_name: string;
        recipient_phone: string;
        cod_amount: string;
        recipient_address: string;
    }[];
};

export function PlaceBulkOrder({
    isOpen,
    onOpenChange,
    orders,
}: PlaceBulkOrderProps) {
    const [createSteadFastBulkOrder] = useCreateBulkSteadFastOrderMutation();
    const [selectedCourier, setSelectedCourier] = useState<"SteedFast" | "Pathao" | "Redex">("SteedFast");
    const handleSubmit = async () => {
        const toastId = toast.loading(`Placing order to ${selectedCourier} ...`);
        try {
            if (selectedCourier === "SteedFast") {
                await createSteadFastBulkOrder({ data: orders }).unwrap();

            } else if (selectedCourier === "Pathao") {
                // TODO: Call pathao API
            } else if (selectedCourier === "Redex") {
                // TODO: Call redex API
            }
            toast.success("Order placed Successfully....", { id: toastId });
            onOpenChange?.(false);
        }
        catch (err) {
            console.log(err);
            toast.error("sorry....", { id: toastId });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Place Bulk Order</DialogTitle>
                    <DialogDescription>
                        You&apos;re about to book {orders.length} order{orders.length !== 1 && "s"} to courier.
                    </DialogDescription>
                </DialogHeader>

                {/* ✅ Radio Buttons (No form, no submit) */}
                <div className="flex gap-6 my-3">
                    <Label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="courier"
                            value="SteedFast"
                            checked={selectedCourier === "SteedFast"}
                            onChange={() => setSelectedCourier("SteedFast")}
                        />
                        SteedFast
                    </Label>
                    <Label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="courier"
                            value="Pathao"
                            checked={selectedCourier === "Pathao"}
                            onChange={() => setSelectedCourier("Pathao")}
                        />
                        Pathao
                    </Label>
                    <Label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="courier"
                            value="Redex"
                            checked={selectedCourier === "Redex"}
                            onChange={() => setSelectedCourier("Redex")}
                        />
                        Redex
                    </Label>
                </div>

                {/* Order preview */}
                <div className="max-h-[300px] overflow-y-auto px-1 my-2 rounded-md border p-3 bg-gray-50 dark:bg-muted">
                    {orders.map((order, index) => (
                        <div key={index} className="text-sm text-muted-foreground border-b py-2">
                            <div className="font-medium">{order.invoice}</div>
                            <div>{order.recipient_name}</div>
                            <div>{order.recipient_phone}</div>
                            <div>{order.recipient_address}</div>
                            <div>COD: {order.cod_amount}৳</div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">Continue</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>
                                    <Button onClick={handleSubmit}>
                                        Book Orders
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}