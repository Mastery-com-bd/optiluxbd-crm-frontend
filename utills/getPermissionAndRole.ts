import { TUSerRole } from "@/redux/features/auth/authSlice";

export const getPermissions = (user: TUSerRole[]) => {
  const permissions = user?.[0]?.role?.permissions?.map((p) => p.name) || [];
  const role = user?.[0]?.role?.name;
  return { permissions, role };
};
