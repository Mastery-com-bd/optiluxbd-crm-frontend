/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProductReportSuymmary = {
  totalOrders: number;
  totalProducts: number;
  totalQuantitySold: number;
  totalRevenue: number;
};

export type TProductPerformanceItem = {
  productId: number;
  productName: string;
  productSKU: string;
  productCategory: string;
  productPrice: number;
  totalOrders: number;
  totalQuantitySold: number;
  deliveredOrders: number;
  returnedOrders: number;
  totalRevenue: number;
  totalCommissionPaid: number;
  uniqueCustomers: number;
  agents: Record<string, any>;
  cities: Record<string, any>;
  deliverySuccessRate: string;
  returnRate: string;
  averageOrderValue: string;
  topAgentId: number;
  topAgentSales: number;
  topSalesCity: string | null;
  topSalesCityCount: number;
};

export type TProductPerformence = {
  summary: TProductReportSuymmary;
  topProducts: TProductPerformanceItem[];
};
