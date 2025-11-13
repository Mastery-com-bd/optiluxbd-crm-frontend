/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
  TUSerRole,
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

  const handleLogOut = async () => {
    try {
      const res = await logout(undefined).unwrap();
      if (res?.success) {
        dispatch(logOut());
        toast.success(res?.message, {
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
      toast.error(errorInfo, { duration: 3000 });
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
                  className={`absolute inset-0 items-center justify-center transition-transform duration-300 ease-in-out hidden dark:flex`}
                  aria-label="Switch to light mode"
                >
                  <SunIcon className="w-6 h-6" />
                </button>
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
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                    <BellDotIcon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white text-[10px] font-bold text-destructive-foreground shadow">
                      3
                    </span>
                    {/* Optional: subtle pulse animation on the badge */}
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {/* Mock CRM notifications */}
                    <div className="flex items-start gap-3 p-4 border-b hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">New lead assigned</p>
                        <p className="text-xs text-muted-foreground">
                          Sarah Johnson just filled the contact form.
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border-b hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Deal won</p>
                        <p className="text-xs text-muted-foreground">
                          Acme Corp deal ($45,000) moved to Closed-Won.
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border-b hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Task overdue</p>
                        <p className="text-xs text-muted-foreground">
                          Follow-up with TechGlobal is 3 days overdue.
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <button className="w-full text-center text-xs text-primary hover:underline">
                      View all notifications
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 rounded-full pl-2 pr-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent/50 hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                    <Avatar className="w-9 h-9 ring-2 ring-offset-2 ring-offset-background ring-primary/20">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/40 text-primary-foreground">
                        BI
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-semibold text-foreground">
                        {user?.name}
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        {getPermissions(user?.roles as TUSerRole[]).role}
                      </span>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
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
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  >
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
