import { NavRoute } from "@/constants/CRM_Navigation";
import { canShowSidebarItem } from "./catShowSidebarItem";

export function getSidebarRoutes(
  routes: NavRoute[],
  userRoles: string[],
  userPermissions: string[]
): NavRoute[] {
  return routes
    .map((route) => {
      // Filter children first
      const allowedChildren = route.children
        ? route.children.filter((child) =>
            canShowSidebarItem(child, userRoles, userPermissions)
          )
        : [];

      // Parent is allowed if:
      const parentAllowed =
        canShowSidebarItem(route, userRoles, userPermissions) ||
        allowedChildren.length > 0;

      if (!parentAllowed) return null;

      return {
        ...route,
        children: allowedChildren,
      };
    })
    .filter(Boolean) as NavRoute[];
}
