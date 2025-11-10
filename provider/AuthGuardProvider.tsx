"use client";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const roleBasedRoutes: Record<string, RegExp[]> = {
  admin: [/^\/dashboard(\/.*)?$/],
};
const publicRoutes = ["/login", "/register"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [logout] = useLogoutMutation();
  const { data, isLoading } = useGetProfileQuery(undefined);
  const user = data?.data;

  useEffect(() => {
    if (isLoading) return; // wait until profile is fetched

    // ---- Guest user ----
    if (!user) {
      // Only redirect if they're on a private route
      if (!publicRoutes.includes(pathname)) {
        router.replace("/login");
      }
      return;
    }

    // ---- Logged-in user ----
    const role = user?.roles[0]?.role?.name.toLowerCase();

    if (!role) {
      console.log(role);
      router.replace("/login");
      return;
    }

    // Prevent logged-in users from visiting login/register
    if (publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
      return;
    }

    // Check role-based access
    const allowedRoutes = roleBasedRoutes[role] ?? [];
    const isAllowed = allowedRoutes.some((r) => r.test(pathname));

    if (!isAllowed) {
      (async () => {
        try {
          await logout(undefined).unwrap();
        } catch (err) {
          console.error("Logout failed:", err);
        } finally {
          router.replace("/login");
        }
      })();
    }
  }, [user, isLoading, pathname, router, logout]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Render children when authenticated and authorized
  return <>{children}</>;
}
