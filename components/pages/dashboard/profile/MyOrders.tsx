"use client";

import { TProfileOrderData } from "@/types/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, DollarSign, Package, Receipt } from "lucide-react";
import { convertDate } from "@/utills/dateConverter";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const MyOrders = ({ order }: { order: TProfileOrderData[] }) => {
  console.log(order);
  return (
    <div className="w-full lg:w-[60vw] mx-auto bg-gray-200 dark:bg-gray-900">
      <Card className="shadow-lg border bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            My Orders
          </CardTitle>
        </CardHeader>

        <CardContent>
          {order?.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-6">
              No orders found.
            </p>
          ) : (
            <ScrollArea className="max-h-[650px] pr-3">
              <div className="space-y-4">
                {order.map((item) => (
                  <Card
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition dark:bg-gray-700"
                  >
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Receipt size={15} />
                            Order ID:{" "}
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              #{item.id}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 dark:text-gray-400">
                            <CalendarDays size={15} />
                            Order Date:{" "}
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {
                                convertDate(new Date(item.orderDate))
                                  .creationTime
                              }
                              ,{" "}
                              {
                                convertDate(new Date(item.orderDate))
                                  .creationDate
                              }
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 dark:text-gray-400">
                            <Package size={15} />
                            Product ID:{" "}
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {item.productId ?? "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 dark:text-gray-400">
                            <DollarSign size={15} />
                            Total Amount:
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {Number(item.totalAmount).toLocaleString()} BDT
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 dark:text-gray-400">
                            Commission:
                            <Badge className="bg-purple-600/90 dark:bg-purple-700 text-white">
                              {item.commission} Tk
                            </Badge>
                          </div>
                        </div>

                        {/* <Link
                          href={`/orders/${item.id}`}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          View Details →
                        </Link> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyOrders;
