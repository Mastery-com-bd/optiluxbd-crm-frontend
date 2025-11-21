interface User {
  id: number;
  name: string;
  email: string;
}

interface RoleUser {
  id: number;
  userId: number;
  roleId: number;
  user: User;
}

export interface Permission {
  id: number;
  key: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  created_at: string;
  permission: Permission;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: RolePermission[];
  users: RoleUser[];
}
