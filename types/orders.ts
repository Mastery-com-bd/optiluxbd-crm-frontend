
export type OrderBase = {
    id: number;
    agentId: number;
    customerId: number;
    productId: number | null;
    packageId: number | null;
    quantity: number;
    totalAmount: number;
    commissionRate: number;
    commission: number;
    orderDate: Date;
};
