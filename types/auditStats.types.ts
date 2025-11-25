export enum UserAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export enum EntityType {
  Customer = "Customer",
  User = "User",
  Order = "Order",
  Product = "Product",
  Package = "Package",
  Role = "Role",
  Address = "Address",
}

export interface ActionEntityCount {
  action: UserAction;
  entityType: EntityType;
  count: number;
}

export interface UserActivityStatistics {
  byAction: Record<UserAction, number>;
  byEntityType: Record<EntityType, number>;
  byActionAndEntity: ActionEntityCount[];
}
