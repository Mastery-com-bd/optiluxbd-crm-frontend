"use client";
import Loading from "@/components/pages/shared/Loading";
import { routePermissions } from "@/config/routePermission";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicRoutes = ["/login", "/register"];
const alwaysAllowedRoutes = ["/dashboard/profile", "/dashboard/customers", "/dashboard/hr&staff/roles", "/dashboard/hr&staff/roles/add", "/dashboard/hr&staff/roles/1", "/dashboard/hr&staff/roles/2"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [logout] = useLogoutMutation();
  const user = useAppSelector(currentUser);
  const roles = user?.roles;
  const dispatch = useAppDispatch();
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
      // Only redirect if they're on a private route
      if (!publicRoutes.includes(pathname)) {
        router.replace("/login");
      }
      return;
    }

    // ---- Logged-in user ----
    const { permissions, role } = getPermissions(user as TAuthUSer);
    if (!permissions.length) {
      router.replace("/login");
      return;
    }

    // Prevent logged-in users from visiting login/register
    if (publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
      return;
    }
    // ---- Role-based default redirection ----
    if (alwaysAllowedRoutes.includes(pathname)) {
      return;
    }

    // Admin can access these directly
    // Admin logic
    if (role === "ADMIN") {
      const adminAllowedRoutes = [
        "/dashboard",
        "/dashboard/settings",
        "/dashboard/profile",
        "/dashboard/admin/landing",
      ];
      if (adminAllowedRoutes.includes(pathname)) return;

      const requiredPerms = Object.entries(routePermissions).find(([route]) =>
        pathname.startsWith(route)
      )?.[1];

      if (!requiredPerms) {
        router.replace("/dashboard/admin/landing");
        return;
      }
      if (
        requiredPerms &&
        !requiredPerms.some((p) => permissions.includes(p))
      ) {
        router.replace("/dashboard/admin/landing");
        return;
      }

      return;
    }
    // Non-admin logic
    const matchedRoute = Object.entries(routePermissions).find(([route]) =>
      pathname.startsWith(route)
    )?.[1];

    if (!matchedRoute) {
      router.replace("/");
      return;
    }
    if (matchedRoute && !matchedRoute.some((p) => permissions.includes(p))) {
      router.replace("/");
      return;
    } else if (!alwaysAllowedRoutes.includes(pathname)) {
      router.replace("/dashboard/profile");
      return;
    }
  }, [dispatch, hydrated, logout, pathname, roles, router, user]);

  if (!hydrated || !user) {
    return <Loading />;
  }

  // Render children when authenticated and authorized
  return <>{children}</>;
}
