/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NotificationBell } from "@/components/notification/NotificationBell";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@/provider/AuthProvider";
import { logout } from "@/service/authService";
import { debounce } from "@/utills/debounce";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  // const { setTheme } = useTheme();
  const { state } = useSidebar();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { setUser, user, setIsLoading } = useUser();

  const handleSearch = async (val: any) => {
    // setFilters({ ...filters, search: val });
    console.log(val);
  };
  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout();
      if (res.success) {
        setIsLoading(true);
        setUser(null);
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/login");
      } else {
        toast.error(res.message);
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
    <header
      className={`sticky top-0 z-50 flex h-16 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 rounded-b-xl ${
        scrolled
          ? "bg-white/5 backdrop-blur-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {state === "collapsed" && <SidebarTrigger />}
      <div
        className={`w-full flex items-center justify-between gap-2 ${
          scrolled ? "px-4" : "px-0"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-2">
          <div className="relative">
            <Input
              className="px-10 py-1.5 w-64 text-sm bg-transparent"
              value={inputValue}
              icon={<Search className="size-4" />}
              onChange={(e) => {
                debouncedLog(e.target.value);
                setInputValue(e.target.value);
              }}
              placeholder="Search "
            />
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Popover>
              <PopoverTrigger asChild className="bg-transparent">
                <button className="flex items-center gap-4 text-sm font-medium text-foreground/80 hover:bg-accent/50 hover:text-foreground transition-all duration-200 cursor-pointer p-2 rounded-lg ">
                  <Avatar className="w-10 h-10 rounded-lg">
                    <AvatarImage src="https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" />
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold text-foreground">
                      {user?.tenantSlug}
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {user?.roles[0]}
                    </span>
                  </div>
                  <span>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 p-2 bg-white/5 backdrop-blur-2xl"
                align="end"
              >
                <div className="flex items-center gap-3 px-2 py-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" />
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold"> {user?.tenantSlug}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.roles[0]}
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
                  href="/dashboard/analysis/settings"
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  My Settings
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
  );
};

export default Navbar;
