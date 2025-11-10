export type TStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DISABLED";

export type TRole = {
  id: number;
  name: string;
  description: string;
};

export type TUserRole = {
  id: number;
  userId: number;
  roleId: number;
  role: TRole;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar_secure_url: string | null;
  email_verified: boolean;
  phone_verified: boolean;
  is_active: boolean;
  status: TStatus;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  roles: TUserRole[];
  addresses: [];
};
