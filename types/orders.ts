export interface Agent {
    id: number;
    name: string;
    email: string;
}

export interface Customer {
    id: number;
    name: string;
    phone: string;
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