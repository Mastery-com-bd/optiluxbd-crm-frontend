/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NotificationBell } from "@/components/notification/NotificationBell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import {
  currentUser,
  logOut,
  TAuthUSer,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { BellDotIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const { setTheme } = useTheme();
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const { role } = getPermissions(user as TAuthUSer);

  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout(undefined).unwrap();
      if (res?.success) {
        dispatch(logOut());
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

  return (
    <div>
      <header className="sticky top-0 z-9 flex border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background">
        <div className="w-full flex items-center justify-between gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground/80">
                Good afternoon
              </span>
              <span className="text-lg font-semibold text-foreground">
                Welcome back, {user?.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 overflow-hidden rounded-full hover:bg-accent transition-colors">
                <button
                  onClick={() => {
                    setTheme("light");
                    console.log("clicked sun");
                  }}
                  className={`absolute inset-0 items-center justify-center transition-transform duration-300 ease-in-out hidden dark:flex cursor-pointer`}
                  aria-label="Switch to light mode">
                  <SunIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => {
                    setTheme("dark");
                    console.log("clicked moon");
                  }}
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out dark:hidden cursor-pointer`}
                  aria-label="Switch to dark mode">
                  <MoonIcon className="w-6 h-6" />
                </button>
              </div>
              <NotificationBell />
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 rounded-full pl-2 pr-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent/50 hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer">
                    <Avatar className="w-9 h-9 ring-2 ring-offset-2 ring-offset-background ring-primary/20">
                      <AvatarImage
                        src={
                          user?.avatar_secure_url ||
                          "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                        }
                      />
                      <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/40 text-primary-foreground">
                        BI
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-semibold text-foreground">
                        {user?.name}
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        {role
                          .map(
                            (r) =>
                              r.charAt(0).toUpperCase() +
                              r.slice(1).toLowerCase(),
                          )
                          .join(", ")}
                      </span>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={
                          user?.avatar_secure_url ||
                          "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                        }
                      />
                      <AvatarFallback>BI</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold"> {user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                    Log out
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
