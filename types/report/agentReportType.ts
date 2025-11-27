/* eslint-disable @typescript-eslint/no-explicit-any */
export type SubCategory = {
  id: number;
  name: string;
  category: Category;
};

export type Category = {
  id: number;
  name: string;
};

export type OrderAgent = {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
};

export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
};

export type Product = {
  id: number;
  name: string;
  sku: string;
  price: string;
  subCategory: SubCategory;
};

export type Courier = {
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
};

export type Order = {
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
  shipping_address_city: string | null;
  shipping_address_geo_lat: string | null;
  shipping_address_geo_lng: string | null;
  shipping_address_division: string | null;
  shipping_address_post: string | null;
  shipping_address_street: string | null;
  shipping_address_thana: string | null;
  agent: OrderAgent;
  customer: Customer;
  product: Product;
  package: null;
  courier: Courier;
};

export type TAgentReport = {
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
  netSalesAmount: number;
  totalCommission: number;
  totalDeliveryCharge: number;
  uniqueCustomers: number;
  uniqueProducts: number;
  averageOrderValue: string;
  deliveryRate: string;
  returnRate: string;
  cancellationRate: string;
  orders: Order[];
};
