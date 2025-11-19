// action enum type
export type TAuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "EXPORT"
  | "IMPORT";

//   entity enum type
export type TAuditEntity = "Customer" | "User" | "Order" | "Product" | "Test";

// User type
export type AuditUser = {
  id: number;
  userId: string;
  name: string;
  email: string | null;
};
// changes data type

export type TChnagesdata = {
  name: string;
  value: number;
};
// Main AuditLog type

export type AuditLog = {
  id: number;
  entityType: TAuditEntity | string;
  entityId: string;
  action: TAuditAction;
  userId?: number;
  userName?: string | null;
  userEmail?: string | null;
  previousData?: TChnagesdata;
  newData?: TChnagesdata;
  changedFields: string[];
  ipAddress?: string | null;
  userAgent?: string | null;
  endpoint?: string | null;
  method?: string | null;
  createdAt: string;
  user?: AuditUser | null;
};
