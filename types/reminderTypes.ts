export interface ReminderCustomer {
  id: number;
  name: string;
  customerId: string;
  phone: string;
  email: string | null;
}

export interface ReminderUser {
  id: number;
  name: string;
}

export interface IReminder {
  id: number;
  userId: number;
  customerId: number;
  title: string;
  note: string;
  remindAt: string;
  status: string;
  isNotified: boolean;
  notifiedAt: string | null;
  user: ReminderUser;
  customer: ReminderCustomer;
}

export interface TReminderStats {
  pending: number;
  completed: number;
  cancelled: number;
  todayReminders: number;
  overdueCount: number;
  total: number;
}
