export interface Tsummary {
  totalOrders: number;
  newOrders: number;
  deliveredOrders: number;
  returnedOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalCommission: number;
  totalDeliveryCharge: number;
  netRevenue: number;
  activeAgents: number;
  newCustomers: number;
  totalUniqueCustomers: number;
  overallDeliveryRate: string;
  overallReturnRate: string;
  topAgentId: number;
  topAgentOrderCount: number;
  topProductId: number;
  topProductOrderCount: number;
  topCourierService: string;
  topCourierOrderCount: number;
}
