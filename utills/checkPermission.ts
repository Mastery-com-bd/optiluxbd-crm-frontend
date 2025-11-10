import { TUSerRole } from "@/redux/features/auth/authSlice";

export const getUserPermissions = (user: TUSerRole[] | null): string[] => {
  if (!user) return [];
  return user.flatMap((r) => r.role.permissions.map((p) => p.name));
};

export const hasPermission = (
  user: TUSerRole[] | null,
  required: string[]
): boolean => {
  const userPerms = getUserPermissions(user);
  return required.every((perm) => userPerms.includes(perm));
};
