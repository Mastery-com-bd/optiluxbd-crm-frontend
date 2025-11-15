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
}

export interface Package {
    id: number;
    // Add more fields if needed
}

export interface TopProducts {
    productId: number,
    productName: string,
    timesPurchased: number,
    totalSpent: number,
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
    shipping_address_city: string | null;
    shipping_address_postcode: string | null;
    shipping_address_geo_lat: string | null;
    shipping_address_geo_lng: string | null;

    agentId: number;
    customerId: number;
    productId: number | null;
    packageId: number | null;

    agent: Agent;
    customer: Customer;
    product: Product | null;
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
        totalOrders: number
        totalAmount: number
        totalQuantity: number
        averageOrderValue: number
    }
    ordersByMonth: {
        [month: string]: number
    }
    topProducts: {
        productId: number
        productName: string
        timesPurchased: number
        totalSpent: number
    }[]
}

export interface AgentOrderSummary {
    totalOrders: number,
    totalCommission: string,
    averageOrderValue: string,
    totalRevenue: string,
    averageCommission: string
}