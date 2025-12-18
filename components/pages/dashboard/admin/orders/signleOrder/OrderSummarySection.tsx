"use client";

import Image from "next/image";
import { OrderData, OrderItem, Product } from "@/types/orders";
import { Card } from "@/components/ui/card";

export function OrderSummarySection({ order }: { order: OrderItem }) {


    return (
        <Card className="bg-transparent! p-0 dark:bg-muted rounded-lg shadow-md w-full border-none">
            <div className="overflow-x-auto w-full ">
                <div className=" w-full bgGlass">
                    {/* Products */}
                    {order?.products && order?.products?.length > 0 ? (
                        order?.products?.map((product) => (
                            <div key={product?.id} className="grid grid-cols-5 gap-4 items-center  border-b border-border text-sm">
                                <div className="flex items-center gap-3 col-span-2">
                                    <div className="w-10 h-10 relative rounded overflow-hidden bg-white">
                                        <Image
                                            src={product?.image_url} 
                                            alt={product?.name ?? "Product"}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="truncate max-w-[180px] font-medium">
                                        {product?.name}
                                    </span>
                                </div>

                                <div className="text-right">৳ {parseFloat(product?.price ?? "0").toLocaleString()}</div>
                                <div className="text-right">{order?.quantity}</div>
                                <div className="text-right font-semibold">
                                    ৳ {(parseFloat(product?.price ?? "0") * order?.quantity)?.toLocaleString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-6 text-sm text-muted-foreground">
                            No products found for this order.
                        </div>
                    )}
                </div>
            </div>
            <div className="overflow-x-auto w-full bgGlass p-6 rounded-xl!">
                {/* Order Summary Footer Styled Like Image */}
                <div className="flex justify-between text-sm mb-2">
                    <span className="">Subtotal</span>
                    <span>৳ {order.totalAmount}</span>
                </div>

                <div className="flex justify-between text-sm mb-2">
                    <span className="">Discount</span>
                    <span className="text-red-500">-৳ {order.commission}</span>
                </div>

                <div className="flex justify-between text-sm mb-1">
                    <div>
                        <span className="">Shipping</span>
                        <div className="text-xs text-muted-foreground">via {"Unknown"}</div>
                    </div>
                    <span>৳ 100</span>
                </div>

                <hr className="my-3 border-border" />
                <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>৳ {order.totalAmount - order.commission + 100}</span>
                </div>
            </div>
        </Card>
    );
}