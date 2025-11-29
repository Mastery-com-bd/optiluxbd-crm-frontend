export type TGeographicSummary = {
  totalLocations: number;
  totalOrders: number;
  totalRevenue: number;
};

export interface IGeographicDistributionItem {
  division: string;
  city: string;
  thana: string;
  totalOrders: number;
  deliveredOrders: number;
  returnedOrders: number;
  totalRevenue: number;
  deliverySuccessRate: string;
  returnRate: string;
  averageOrderValue: string;
  topCourierService: string | null;
  topCourierCount: number;
}

export type TGeographicPerformance = {
  summary: TGeographicSummary;
  topLocations: IGeographicDistributionItem[];
};
