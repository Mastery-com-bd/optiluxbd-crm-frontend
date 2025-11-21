/* eslint-disable @typescript-eslint/no-explicit-any */
// Possible actions
export type TAuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "EXPORT"
  | "IMPORT";

// Possible entities
export type TAuditEntity = "Customer" | "User" | "Order" | "Product" | "Test";

// User type
export type AuditUser = {
  id: number;
  userId: string;
  name: string;
  email: string | null;
};

// Generic data change type (previousData and newData can vary per entity)
export type TDataChanges = Record<string, any> | null;

// Main audit log type
export type AuditLog = {
  id: number;
  entityType: TAuditEntity | string;
  entityId: string;
  action: TAuditAction;
  userId?: number;
  userName?: string | null;
  userEmail?: string | null;
  previousData: TDataChanges;
  newData: TDataChanges;
  changedFields: string[];
  ipAddress?: string | null;
  userAgent?: string | null;
  endpoint?: string | null;
  method?: string | null;
  createdAt: string;
  user?: AuditUser | null;
};

export type AuditLogData = {
  id: number;
  entityType: TAuditEntity;
  entityId: string;
  action: TAuditAction;
  userId?: number;
  userName?: string;
  userEmail?: string | null;
  previousData?: Record<string, string | number> | null;
  newData?: Record<string, string | number> | null;
  changedFields?: string[];
  ipAddress?: string | null;
  userAgent?: string | null;
  endpoint?: string | null;
  method?: string | null;
  createdAt: string;
};
