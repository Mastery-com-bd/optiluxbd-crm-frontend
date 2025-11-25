export interface Agent {
  id: number;
  userId: string;
  name: string;
  email: string;
  is_active: boolean;
  todaysOrder: number;
  doubleOrder: number;
  singleOrder: number;
  paymentCount: number;
  paidAmount: number;
  orderRank: number;
}

export interface TTeamReport {
  teamLeaderId: number;
  teamLeaderUserId: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  totalAgents: number;
  activeAgents: number;
  agents: Agent[];
  totalOrders: number;
  deliveredOrders: number;
  returnedOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  totalSalesAmount: number;
  totalCommission: number;
  totalDeliveryCharge: number;
  todaysTotalSale: number;
  teamName: string;
}
