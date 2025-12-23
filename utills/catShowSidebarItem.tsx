import { NavRoute } from "@/constants/CRM_Navigation";

export function canShowSidebarItem(
  route: NavRoute,
  userRoles: string[],
  userPermissions: string[]
) {
  // If roles are defined → must match at least one
  if (route.roles && route.roles.length > 0) {
    const hasRole = route.roles.some((r) => userRoles.includes(r));
    if (!hasRole) return false; // role mismatch → hide
  }

  // If permissions are defined → must match at least one
  if (route.permissions && route.permissions.length > 0) {
    const hasPermission = route.permissions.some((p) =>
      userPermissions.includes(p)
    );
    if (!hasPermission) return false;
  }

  return true;
}
