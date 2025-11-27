"use client";
import Loading from "@/components/pages/shared/Loading";
import { routePermissions } from "@/config/routePermission";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicRoutes = ["/login", "/register"];
const alwaysAllowedRoutes = [
  "/dashboard/profile",
  "/dashboard/settings",
  "/dashboard/couriar",
  "/dashboard/couriar/local-create",
  "/dashboard/couriar/local-with-steadfast",
  "/dashboard/couriar/local-update-status",
  "/dashboard/couriar/local-list",
  "/dashboard/couriar/local-get-by-id",
  "/dashboard/couriar/steadfast-create-order",
  "/dashboard/couriar/steadfast-bulk-order",
  "/dashboard/couriar/steadfast-status-invoice",
  "/dashboard/couriar/steadfast-balance",
  "/dashboard/couriar/steadfast-return-request",
  "/dashboard/my-activity",
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector(currentUser);
  const { role, permissions } = getPermissions(user as TAuthUSer);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    Promise.resolve().then(() => {
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    // ---- Guest user ----
    if (!user) {
      if (!publicRoutes.includes(pathname)) {
        router.replace("/login");
      }
      return;
    }

    if (!role.length) {
      if (!publicRoutes.includes(pathname)) {
        router.replace("/activeAccount");
      }
      return;
    }

    // Always allowed pages for any logged-in user
    if (alwaysAllowedRoutes.includes(pathname)) {
      return;
    }
    if (pathname === "/dashboard/activity" && !role.includes("ADMIN")) {
      router.replace("/dashboard/profile");
      return;
    }
    if (
      (pathname === "/dashboard" || pathname === "/dashboard/activity") &&
      role.includes("ADMIN")
    ) {
      return;
    }

    let requiredPerms: string[] = routePermissions[pathname] ?? [];
    // If exact match not found, check for nested routes (startsWith)
    if (requiredPerms.length === 0) {
      const dynamicMatch = Object.entries(routePermissions).find(([route]) =>
        pathname.startsWith(route + "/")
      );
      requiredPerms = dynamicMatch?.[1] ?? [];
    }

    // If no required permissions found → redirect
    if (!requiredPerms) {
      router.replace("/dashboard/profile");
      return;
    }
    // If route not in permission map → redirect to profile
    if (!requiredPerms) {
      router.replace("/dashboard/profile");
      return;
    }

    // Check if user has at least one required permission
    const hasPermission = requiredPerms.some((p) => permissions.includes(p));
    if (!hasPermission) {
      router.replace("/dashboard/profile");
      return;
    }
  }, [hydrated, pathname, user, router, role, permissions]);

  if (!hydrated || !user) {
    return <Loading />;
  }

  // Render children when authenticated and authorized
  return <>{children}</>;
}
