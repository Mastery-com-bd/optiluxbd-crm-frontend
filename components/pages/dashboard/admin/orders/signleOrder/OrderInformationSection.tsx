import { OrderData } from "@/types/orders"

export const OrderInformationSection = ({ order }: { order: OrderData }) => {
    const formattedDate = new Date(order?.orderDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="rounded-xl text-white space-y-6">
            <h2 className="text-xl font-semibold">Order Information</h2>

            <div className="flex justify-between text-sm md:text-base">
                {/* Date */}
                <div className="space-y-1">
                    <p className="text-muted-foreground">Date</p>
                    <p className="text-xl">{formattedDate}</p>
                </div>

                {/* Items */}
                <div className="space-y-1">
                    <p className="text-muted-foreground">Items</p>
                    <p className="text-xl">{order?.quantity} items</p>
                </div>

                {/* Commission Rate */}
                <div className="space-y-1">
                    <p className="text-muted-foreground">Paid</p>
                    <span className="border border-white/30 text-green-700 px-4 py-1 bg-white/10 z-10 backdrop-blur-3xl rounded-sm">
                        {/* {order?.commissionRate}% */}
                        yes
                    </span>
                </div>

                {/* Commission Amount */}
                <div className="space-y-1">
                    <p className="text-muted-foreground">Status</p>
                   <span className="border border-white/30 text-blue-700 px-4 py-1 bg-white/10 z-10 backdrop-blur-3xl rounded-sm">
                        {/* {order?.commissionRate}% */}
                        pending
                    </span>
                </div>

                {/* Total */}
                <div className="space-y-1 text-right">
                    <p className="text-muted-foreground">Total</p>
                    <p className="text-xl">৳{Number(order?.totalAmount).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}