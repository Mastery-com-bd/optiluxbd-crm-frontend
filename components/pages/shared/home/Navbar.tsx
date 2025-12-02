/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NotificationBell } from "@/components/notification/NotificationBell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { baseApi } from "@/redux/api/baseApi";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import {
  currentUser,
  logOut,
  TAuthUSer,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const user = useAppSelector(currentUser);
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const { role } = getPermissions(user as TAuthUSer);

  const dashboardRoute = role.includes("ADMIN")
    ? "/dashboard"
    : "/dashboard/profile";

  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout(undefined).unwrap();
      if (res?.success) {
        dispatch(logOut());
        dispatch(baseApi.util.resetApiState());
        toast.success(res?.message, {
          id: toastId,
          duration: 3000,
        });
        router.push("/login");
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname?.startsWith("/register")
  )
    return null;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed max-w-full w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10 ",
        "text-white"
      )}
    >
      <div className="max-w-[1444px] mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-yellow-400 font-bold text-xl flex items-center gap-2"
          >
            <Image
              src={"/images/OptiluxBD.png"}
              alt="optiluxBD"
              width={100}
              height={100}
              className="w-auto h-8"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li>
              <Link
                href="/products"
                className={cn(
                  "hover:text-yellow-400 transition",
                  pathname === "/products" && "text-yellow-400"
                )}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/all-user"
                className={cn(
                  "hover:text-yellow-400 transition",
                  pathname === "/products" && "text-yellow-400"
                )}
              >
                Products
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="hover:text-yellow-400">
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-yellow-400">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-yellow-400">
                Resources
              </Link>
            </li>
            <li>
              <NotificationBell />
            </li>
          </ul>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <div className="relative w-10 h-10 overflow-hidden rounded-full hover:bg-accent transition-colors">
              <button
                onClick={() => {
                  setTheme("light");
                  console.log("clicked sun");
                }}
                className={`absolute inset-0 items-center justify-center transition-transform duration-300 ease-in-out hidden dark:flex`}
                aria-label="Switch to light mode"
              >
                <SunIcon className="w-6 h-6" />
              </button>
              <NotificationBell />
              <button
                onClick={() => {
                  setTheme("dark");
                  console.log("clicked moon");
                }}
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out dark:hidden`}
                aria-label="Switch to dark mode"
              >
                <MoonIcon className="w-6 h-6" />
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-yellow-400">
                  <Menu size={24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-black/80 text-white border border-gray-700 space-y-1"
              >
                <DropdownMenuItem>
                  <Link href="/products" className="w-full block">
                    Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/solutions" className="w-full block">
                    Solutions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/pricing" className="w-full block">
                    Pricing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/resources" className="w-full block">
                    Resources
                  </Link>
                </DropdownMenuItem>
                {user && (
                  <DropdownMenuItem>
                    <Link
                      hidden={!user}
                      href={dashboardRoute}
                      className="w-full block text-orange-400"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {user ? (
                  <DropdownMenuItem className="text-red-400">
                    <LogOut onClick={handleLogOut} size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <Link
                      href="/login"
                      className="w-full text-yellow-300 flex items-center"
                    >
                      <LogIn size={16} className="mr-2" />
                      Login
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-10 h-10 overflow-hidden rounded-full hover:bg-accent transition-colors">
              <button
                onClick={() => {
                  setTheme("light");
                  console.log("clicked sun");
                }}
                className={`absolute inset-0 items-center justify-center transition-transform duration-300 ease-in-out hidden dark:flex cursor-pointer`}
                aria-label="Switch to light mode"
              >
                <SunIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  setTheme("dark");
                  console.log("clicked moon");
                }}
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out dark:hidden cursor-pointer`}
                aria-label="Switch to dark mode"
              >
                <MoonIcon className="w-6 h-6" />
              </button>
            </div>
            {user ? (
              <>
                <Link href={dashboardRoute}>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white flex gap-2 cursor-pointer"
                    size="sm"
                    variant="default"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogOut}
                  variant="ghost"
                  className="text-red-400 hover:text-white p-2 cursor-pointer"
                >
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold cursor-pointer"
                  size="sm"
                >
                  <LogIn size={16} className="mr-2" /> Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
