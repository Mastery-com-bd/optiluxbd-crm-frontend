"use client";
import {
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Map as MapIcon,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { crmRoutes } from "@/constants/CRM_Navigation";
import Optilux from "../../../../../public/images/OptiluxBD.png";
import Image from "next/image";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
