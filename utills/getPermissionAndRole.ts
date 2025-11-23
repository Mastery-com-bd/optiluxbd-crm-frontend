import { TAuthUSer, TUSerRole } from "@/redux/features/auth/authSlice";

export const getPermissions = (user: TAuthUSer) => {
  const roles = (user?.roles as TUSerRole[]) || [];
  const allPermissions = roles?.flatMap(
    (r) => r.role?.permissions?.map((p) => p.name) || []
  );
  const permissions = Array.from(new Set(allPermissions));
  const role = roles.map((r) => r.role?.name).filter(Boolean);
  return { permissions, role };
};
