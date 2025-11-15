'use client';

import { useGetAgentOrderSummaryQuery } from "@/redux/features/orders/ordersApi";
import { DollarSign, BarChart, TrendingUp, Percent, ShoppingBag } from "lucide-react";
import Loading from "@/components/pages/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Stat = () => {
    const { data, isLoading } = useGetAgentOrderSummaryQuery();
    if (isLoading) return <Loading />;

    const {
        totalOrders = 0,
        totalRevenue = "0",
        totalCommission = "0",
        averageOrderValue = "0",
        averageCommission = "0"
    } = data?.data || {};

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Orders */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingBag className="h-6 w-6 text-orange-600" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-6 w-6 text-green-600" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">${parseFloat(totalRevenue).toFixed(2)}</p>
                </CardContent>
            </Card>

            {/* Total Commission */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                    <BarChart className="h-6 w-6 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">${parseFloat(totalCommission).toFixed(2)}</p>
                </CardContent>
            </Card>

            {/* Average Order Value */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">${parseFloat(averageOrderValue).toFixed(2)}</p>
                </CardContent>
            </Card>

            {/* Average Commission */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Commission</CardTitle>
                    <Percent className="h-6 w-6 text-pink-600" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">${parseFloat(averageCommission).toFixed(2)}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Stat;