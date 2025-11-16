'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useGetCustomerSummaryQuery } from '@/redux/features/orders/ordersApi'
import { TopProducts } from '@/types/orders'
import { BarChart3, DollarSign, ShoppingBag } from 'lucide-react'
import { useParams } from 'next/navigation'
import OrdersByMonthChart from './OrdersByMonthChart'
import Loading from '@/components/pages/shared/Loading'

export function Summary() {
    const { customerId } = useParams()
    const { data, isLoading } = useGetCustomerSummaryQuery(customerId)
    const dashboardData = data?.data

    const chartData =
        Object.entries(dashboardData?.ordersByMonth || {}).map(
            ([month, total]) => ({
                month,
                total: Number(total),
            })
        )
    if (isLoading)
        return <Loading />
    return (
        <div className="p-5 space-y-8">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                Dashboard Overview
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-8 w-8 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.summary?.totalOrders ?? 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                        <DollarSign className="h-8 w-8 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${dashboardData?.summary?.totalAmount?.toFixed(2) ?? '0.00'}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
                        <BarChart3 className="h-8 w-8 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.summary?.totalQuantity ?? 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                        <DollarSign className="h-8 w-8 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${dashboardData?.summary?.averageOrderValue?.toFixed(2) ?? '0.00'}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart + Products Side-by-Side */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Orders by Month Chart */}
                <div className="w-full lg:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Orders by Month</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <OrdersByMonthChart chartData={chartData} />
                        </CardContent>
                    </Card>
                </div>

                {/* Top Products Table */}
                <div className="w-full lg:w-1/2  ">
                    <Card className='h-full'>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                                    <td className="px-4 py-2">
                                                        ${product.totalSpent.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}