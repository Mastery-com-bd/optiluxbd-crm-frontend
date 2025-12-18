export interface Agent {
  id: number;
  name: string;
  email: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string,
  image_public_id: string,
  quantity: number,
}

export interface Package {
  id: number;
  name: string;
  // Add more fields if needed
}

export interface TopProducts {
  productId: number;
  productName: string;
  timesPurchased: number;
  totalSpent: number;
}

export interface OrderData {
  id: number;
  orderDate: string;
  quantity: number;
  totalAmount: number;
  commissionRate: number;
  commission: number;
  addressId: string | null;
  shipping_address_tag: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_address_postcode: string | null;
  shipping_address_geo_lat: string | null;
  shipping_address_geo_lng: string | null;
  shipping_address_street: string | null;
  shipping_address_thana: string | null,
  shipping_address_city: string | null,
  shipping_address_post: string | null,
  shipping_address_division: string | null,
  agentId: number;
  customerId: number;
  productId: number | null;
  packageId: number | null;
  agent: Agent;
  customer: Customer;
  products: [Product] | null;
  package: Package | null;
}

export type OrderFilters = {
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
  search?: string;
  agentId?: number;
  customerId?: number;
  productId?: number;
  packageId?: number;
  from?: Date;
  to?: Date;
};

export interface SummaryData {
  summary: {
    totalOrders: number;
    totalAmount: number;
    totalQuantity: number;
    averageOrderValue: number;
  };
  ordersByMonth: {
    [month: string]: number;
  };
  topProducts: {
    productId: number;
    productName: string;
    timesPurchased: number;
    totalSpent: number;
  }[];
}

export interface AgentOrderSummary {
  totalOrders: number;
  totalCommission: string;
  averageOrderValue: string;
  totalRevenue: string;
  averageCommission: string;
}

export interface OrderItem {
  id: number;
  agentId: number;
  customerId: number;
  productId: number | null;
  packageId: number | null;
  quantity: number;
  totalAmount: string;
  commissionRate: string;
  commission: string;
  orderDate: string;
  addressId: number | null;
  status: string;
  shipping_address_tag: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_address_city: string | null;
  shipping_address_postcode: string | null;
  shipping_address_geo_lat: number | null;
  shipping_address_geo_lng: number | null;

  // Nested customer object
  customer: {
    id: number;
    name: string;
    phone: string;
    email?: string | null;
  };

  // Nested product (nullable)
  products: {
    id: number;
    name: string;
    price: string;
    sku: string;
    image_url: string;
    quantity: number,
  }[] | null;

  // Nested package (nullable)
  package: {
    id: number;
    name: string;
    sku: string;
    discountPrice: string;
  } | null;

  courier: {
    id: number;
    name: string;
    status: string;
  } | null;

  payment: {
    method: string,
    provider: string,
    trxId: string,
    amount: number,
    paidAt: string,
  }
}

export interface TProfileOrderData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  addressId: number | null;
  agentId: number | null;
  batchId: number | null;
  commission: string;
  commissionRate: string;
  customerId: number;
  id: number;
  orderDate: string;
  packageId: number | null;
  productId: number | null;
  quantity: number;
  shipping_address_city: string | null;
  shipping_address_division: string | null;
  shipping_address_geo_lat: string | null;
  shipping_address_geo_lng: string | null;
  shipping_address_post: string | null;
  shipping_address_street: string | null;
  shipping_address_tag: string | null;
  shipping_address_thana: string | null;
  totalAmount: string;
}

export interface Address {
  id: number,
  city: string,
  division: string,
  post: string,
  street: string,
  thana: string,
}