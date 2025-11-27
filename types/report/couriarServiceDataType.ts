export type TCourierPerformanceItem = {
  courierService: string;
  totalShipments: number;
  deliveredShipments: number;
  pendingShipments: number;
  returnedShipments: number;
  cancelledShipments: number;
  totalCODAmount: number;
  totalDeliveryCharge: number;
  deliverySuccessRate: string;
  returnRate: string;
  averageDeliveryCharge: string;
  topDeliveryCity: string | null;
  topDeliveryCityCount: number;
  topDeliveryDivision: string | null;
  topDeliveryDivisionCount: number;
  topReturnReason: string | null;
  topReturnReasonCount: number;
};
