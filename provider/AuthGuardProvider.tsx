"use client";
import { routePermissions } from "@/config/routePermission";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { currentUser, logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicRoutes = ["/login", "/register"];
const alwaysAllowedRoutes = ["/dashboard/profile"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [logout] = useLogoutMutation();
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
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
    const permissions = user?.[0]?.role?.permissions?.map((p) => p.name) || [];
    const roleName = user?.[0]?.role?.name;
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
    if (roleName === "ADMIN") {
      const adminAllowedRoutes = [
        "/dashboard",
        "/dashboard/admin/landing",
        "/dashboard/profile",
      ];
      // If current path is explicitly allowed for admin → allow
      if (adminAllowedRoutes.includes(pathname)) {
        return;
      }

      const requiredPerms = Object.entries(routePermissions).find(([route]) =>
        pathname.startsWith(route)
      )?.[1];

      if (
        requiredPerms &&
        !requiredPerms.some((p) => permissions.includes(p))
      ) {
        // 🚫 Admin lacks permission → redirect
        router.replace("/dashboard/admin/landing");
        return;
      }
      return;
    }

    if (pathname === "/dashboard" && roleName !== "ADMIN") {
      router.replace("/dashboard/profile");
      return;
    }

    const requiredPerms =
      routePermissions[pathname] ||
      Object.entries(routePermissions).find(([route]) =>
        pathname.startsWith(route)
      )?.[1];

    if (requiredPerms && !requiredPerms.some((p) => permissions.includes(p))) {
      const handleUnauthorized = async () => {
        try {
          const res = await logout(undefined).unwrap();
          if (res?.success) {
            dispatch(logOut());
            router.push("/login");
          }
        } catch (err) {
          console.error("Logout failed:", err);
        } finally {
          router.replace("/login");
        }
      };
      handleUnauthorized();
    }
  }, [dispatch, hydrated, logout, pathname, router, user]);

  if (!hydrated || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Render children when authenticated and authorized
  return <>{children}</>;
}
