import { TUSerRole } from "@/redux/features/auth/authSlice";

export type TStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DISABLED";

export type TRole = {
  id: number;
  name: string;
  description: string;
};

export type TUser = {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar_secure_url: string | null;
  email_verified: boolean;
  is_approved: boolean;
  phone_verified: boolean;
  is_active: boolean;
  status: TStatus;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  roles: TUSerRole[];
  addresses: [];
};
