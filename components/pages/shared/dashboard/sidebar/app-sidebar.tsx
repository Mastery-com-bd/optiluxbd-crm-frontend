"use client";
import { Frame } from "lucide-react";
import * as React from "react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { crmRoutes, NavRoute } from "@/constants/CRM_Navigation";
import Optilux from "../../../../../public/images/OptiluxBD.png";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data?.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as TAuthUSer} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
