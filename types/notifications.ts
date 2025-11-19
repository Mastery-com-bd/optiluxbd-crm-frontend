/* eslint-disable @typescript-eslint/no-explicit-any */
export type NotificationType =
  | "ORDER_PLACED"
  | "ORDER_UPDATED"
  | "CUSTOMER_ASSIGNED"
  | "AGENT_ASSIGNED"
  | "BATCH_ACCEPTED"
  | "BATCH_REJECTED"
  | "COMMISSION_CALCULATED"
  | "HIGH_VALUE_ORDER"
  | "SYSTEM_ALERT"
  | "TEAM_UPDATE"
  | "REPORT_READY";

export type NotificationPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  isRead: boolean;
  data?: Record<string, any>;
  expiresAt?: string;
  createdAt: string;
}
