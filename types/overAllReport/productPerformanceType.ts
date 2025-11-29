export type TProductPerformanceSummary = {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalQuantitySold: number;
};

export interface IProductPerformanceItem {
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
  agents: Record<string, unknown>;
  cities: Record<string, unknown>;
  deliverySuccessRate: string;
  returnRate: string;
  averageOrderValue: string;
  topAgentId: number;
  topAgentSales: number;
  topSalesCity: string | null;
  topSalesCityCount: number;
}

export type TProductPerformance = {
  summary: TProductPerformanceSummary;
  topProducts: IProductPerformanceItem[];
};
