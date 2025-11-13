import { TUSerRole } from "@/redux/features/auth/authSlice";

export const getPermissions = (roles: TUSerRole[]) => {
  const permissions = roles?.[0]?.role?.permissions?.map((p) => p.name) || [];
  const role = roles?.[0]?.role?.name;
  return { permissions, role };
};
