import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
    ShoppingCart,
    CheckCheck,
    PackageCheck,
    Truck,
    MapPin,
    BadgeCheck,
} from "lucide-react";

// Handled dynamically
const trackingData = {
    trackingNumber: "SBC-1234567890",
    shippingMethod: "Express Delivery",
    courierService: "Sundarban Courier",
    currentLocation: "Dhaka Distribution Center",
    progress: [
        {
            title: "Order Placed",
            description: "Your order has been received and is being processed",
            date: "Nov 25, 2024 at 10:30 AM",
            status: "done",
            icon: <ShoppingCart size={18} className="rotate-45" />
        },
        {
            title: "Order Confirmed",
            description: "Order confirmed and payment verified",
            date: "Nov 25, 2024 at 11:15 AM",
            status: "done",
            icon: <CheckCheck size={18} className="rotate-45"/>
        },
        {
            title: "Packed",
            description: "Your items have been packed and ready for shipment",
            date: "Nov 25, 2024 at 2:45 PM",
            status: "done",
            icon: <PackageCheck size={18} className="rotate-45"/>
        },
        {
            title: "Shipped",
            description: "Package picked up by courier and in transit",
            date: "Nov 26, 2024 at 9:00 AM",
            status: "current",
            icon: <Truck size={18} className="rotate-45" />
        },
        {
            title: "Out for Delivery",
            description: "Package is out for delivery to your address",
            date: "Expected: Nov 27, 2024",
            status: "pending",
            icon: <MapPin size={18} className="rotate-45"/>
        },
        {
            title: "Delivered",
            description: "Package successfully delivered",
            date: "",
            status: "pending",
            icon: <BadgeCheck size={18} className="rotate-45" />
        },
    ],
};

const TrackOrderCard = () => {
    const data = trackingData;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="yellow">Track Order</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[631px]!">
                <div className="">
                    {/* Header */}
                    {/* <DialogHeader>
                        <DialogTitle className="text-xl font-bold pb-4">
                            Tracking Information
                        </DialogTitle>
                    </DialogHeader> */}

                    {/* Top info */}
                    <div className="p-4 bgGlass grid grid-cols-2 text-sm gap-2 pb-4 border-b border-gray-700">
                        <div>
                            <p className="text-muted-foreground">Tracking Number</p>
                            <p className="text-[#DE9C3A] font-medium">{data.trackingNumber}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Shipping Method</p>
                            <p>{data.shippingMethod}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Courier Service</p>
                            <p>{data.courierService}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Current Location</p>
                            <p>{data.currentLocation}</p>
                        </div>
                    </div>

                    {/* Delivery Progress */}
                    <div className="">
                        <h4 className="font-semibold text-sm my-4">Delivery Progress</h4>
                        <div className="relative space-y-2 ">

                            {data.progress.map((item, i) => (
                                <div key={i} className="group relative flex  gap-2">
                                    {/* Status Icon */}
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <div
                                            className={` bgGlass border-l-0! border-r-0! -rotate-45  w-12 h-12 flex justify-center items-center rounded-full! -left-8 top-0.5  p-1 ${item.status === "done"
                                                ? "text-[#DE9C3A] border-[#DE9C3A]"
                                                : item.status === "current"
                                                    ? "text-[#DE9C3A] border-[#DE9C3A]"
                                                    : "text-gray-400 border-gray-500 bg-gray-500/10"
                                                }`}
                                        >
                                            {item.icon}
                                        </div>
                                        <hr className={` h-12 w-0.5 rounded-full ${item.status == "done" ? "bg-[#DE9C3A]" : "bg-gray-500"} ${item.title === "Delivered" ? "hidden" : ""}`}

                                        />
                                    </div>
                                    {/* Text Content */}
                                    <div className="flex flex-col gap-1 pt-2 w-full">
                                        <h5
                                            className={`font-semibold text-md ${item.status === "current"
                                                ? "text-[#DE9C3A]"
                                                : item.status === "done"
                                                    ? "text-white"
                                                    : "text-gray-400"
                                                }`}
                                        >
                                            {item.title}
                                        </h5>

                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                        <p className=" flex  justify-between text-xs text-muted-foreground pt-1 w-full">
                                            <span>
                                                {item.date}
                                            </span>
                                            <span>
                                                {item.status === "current" && (
                                                    <span className="bgGlass text-yellow-500 text-xs px-2 py-0.5 ml-2 rounded-md align-middle">
                                                        Current
                                                    </span>
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TrackOrderCard;