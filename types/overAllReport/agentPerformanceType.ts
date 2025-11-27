/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IgentPerformanceSummary {
  totalAgents: number;
  totalOrders: number;
  totalRevenue: number;
  totalCommission: number;
}

export interface OrderAgent {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderCustomer {
  id: number;
  name: string;
  phone: string;
  email: string | null;
}

export interface OrderProduct {
  id: number;
  name: string;
  sku: string;
  price: string; // "37692.17"
  subCategory: OrderSubCategory;
}

export interface OrderSubCategory {
  id: number;
  name: string;
  category: OrderCategory;
}

export interface OrderCategory {
  id: number;
  name: string;
}

export interface OrderCourier {
  id: number;
  status: string;
  courierService: string;
  consignmentId: string | null;
  trackingCode: string | null;
  deliveryCharge: string;
  codAmount: string;
  createdAt: string;
  updatedAt: string;
  returns: any[];
}

export interface Order {
  id: number;
  agentId: number;
  customerId: number;
  productId: number;
  packageId: number | null;
  quantity: number;
  totalAmount: string;
  commissionRate: string;
  commission: string;
  orderDate: string;
  batchId: number | null;
  addressId: number | null;
  shipping_address_tag: string | null;
  shipping_address_street: string | null;
  shipping_address_thana: string | null;
  shipping_address_city: string | null;
  shipping_address_post: string | null;
  shipping_address_division: string | null;
  shipping_address_geo_lat: string | null;
  shipping_address_geo_lng: string | null;
  agent: OrderAgent;
  customer: OrderCustomer;
  product: OrderProduct;
  package: any | null;
  courier: OrderCourier;
}

export interface IAgentPerformanceAgent {
  agentId: number;
  agentUserId: string;
  agentName: string;
  agentEmail: string;
  agentPhone: string;
  totalOrders: number;
  deliveredOrders: number;
  returnedOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  totalSalesAmount: number;
  totalCommission: number;
  totalDeliveryCharge: number;
  uniqueCustomers: number;
  uniqueProducts: number;
  orders: Order[];
  netSalesAmount: number;
  deliveryRate: string;
  returnRate: string;
  cancellationRate: string;
  averageOrderValue: string;
}

export type TAgentPerformanceType = {
  summary: IgentPerformanceSummary;
  topAgents: IAgentPerformanceAgent[];
};

export const AllReportData = {
  reportType: "Overview Report",
  period: {
    startDate: "",
    endDate: "",
  },
  agentPerformance: {
    summary: {
      totalAgents: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalCommission: 0,
    },
    topAgents: [],
  },
  courierPerformance: {
    summary: {
      totalCouriers: 0,
      totalShipments: 0,
      totalDelivered: 0,
      totalReturned: 0,
    },
    services: [],
  },
  productPerformance: {
    summary: {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalQuantitySold: 0,
    },
    topProducts: [],
  },
  geographicDistribution: {
    summary: {
      totalLocations: 0,
      totalOrders: 0,
      totalRevenue: 0,
    },
    topLocations: [],
  },
};
