/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Frame, LogOut } from "lucide-react";
import * as React from "react";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { crmRoutes, NavRoute } from "@/constants/CRM_Navigation";
import Optilux from "../../../../../public/images/OptiluxBD.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentUser,
  logOut,
  TAuthUSer,
} from "@/redux/features/auth/authSlice";
import { NavUser } from "./nav-user";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { baseApi } from "@/redux/api/baseApi";
// This is sample data.
const data = {
  teams: [
    {
      name: "OpitluxBD",
      logo: () => <Image src={Optilux} alt="Logo" width={24} height={24} />,
      plan: "CRM",
      icon: Frame,
    },
  ],
  navMain: crmRoutes,
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(currentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

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

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex flex-col justify-between h-full ">
        <div>
          <SidebarHeader>
            <TeamSwitcher teams={data?.teams} />
          </SidebarHeader>
          <div className="border border-dashed border-[rgba(255,177,63,0.50)]"></div>

          <SidebarContent>
            <NavMain items={data?.navMain} />
          </SidebarContent>
        </div>

        <SidebarFooter>
          {/* <NavUser user={user as TAuthUSer} /> */}
          <Collapsible asChild className="group/collapsible ">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogOut}
                tooltip={"Logout"}
                className="cursor-pointer text-[#E03137] hover:text-red-800"
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarFooter>
      </div>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
