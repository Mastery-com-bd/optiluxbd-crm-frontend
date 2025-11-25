import { TUSerRole } from "@/redux/features/auth/authSlice";
import { TStatus } from "./user.types";
import { IAddress } from "../address.types";

export interface IProfileInfo {
  id: number;
  avatar_secure_url: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  roles: TUSerRole[];
  is_active: boolean;
  status: TStatus;
  userId: string;
  addresses: IAddress[];
}
