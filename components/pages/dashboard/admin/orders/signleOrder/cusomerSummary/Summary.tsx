'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCustomerSummaryQuery } from "@/redux/features/orders/ordersApi";
import { SummaryData, TopProducts } from "@/types/orders";
import { BarChart3, DollarSign, ShoppingBag } from "lucide-react";
import { useParams } from "next/navigation";
import OrdersByMonthChart from "./OrdersByMonthChart";

type Props = {
    summary: SummaryData,
    customerId: string | undefined,
}
export function Summary() {
    const { customerId } = useParams();
    const { data } = useGetCustomerSummaryQuery(customerId);
    const dashboardData = data?.data;
    const chartData = Object.entries(dashboardData?.ordersByMonth || {}).map(([month, total]) => ({
        month,
        total: Number(total),
    }));
    return (
        <div>
            <div className="p-5 space-y-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                    Dashboard Overview
                </h2>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboardData?.summary?.totalOrders}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${dashboardData?.summary?.totalAmount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboardData?.summary?.totalQuantity}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${dashboardData?.summary?.averageOrderValue}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex border">
                    {/* Orders By Month */}
                    <div className="border max-w-[50%]">
                        <h3 className="text-lg font-semibold mb-3">Orders by Month</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <OrdersByMonthChart chartData={chartData} />
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="border border-red-600">
                        <h3 className="text-lg font-semibold mb-3">Top Products</h3>
                        {dashboardData?.topProducts?.length === 0 ? (
                            <p className="text-muted-foreground">No top products available.</p>
                        ) : (
                            <div className="overflow-auto rounded-lg border">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted text-muted-foreground text-left">
                                        <tr>
                                            <th className="px-4 py-2">Product</th>
                                            <th className="px-4 py-2">Times Purchased</th>
                                            <th className="px-4 py-2">Total Spent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboardData?.topProducts?.map((product: TopProducts) => (
                                            <tr key={product.productId} className="border-t">
                                                <td className="px-4 py-2 font-medium text-foreground">
                                                    {product.productName}
                                                </td>
                                                <td className="px-4 py-2">{product.timesPurchased}</td>
                                                <td className="px-4 py-2">${product.totalSpent}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
