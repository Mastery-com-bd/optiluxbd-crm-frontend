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
} from "@/components/ui/sidebar";
import { crmRoutes } from "@/constants/CRM_Navigation";
import Optilux from "../../../../../public/images/OptiluxBD.png";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { Collapsible } from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { baseApi } from "@/redux/api/baseApi";
import SidebarButtonSvg from "@/components/svgIcon/SidebarButtonSvg";
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
  // const user = useAppSelector(currentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [isHovered, setIsHovered] = React.useState(false);

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
      <div className="flex flex-col justify-between h-full gap-10">
        <div>
          <SidebarHeader>
            <TeamSwitcher teams={data?.teams} />
          </SidebarHeader>
          <div className="border border-dashed border-[rgba(255,177,63,0.50)]"></div>

          <SidebarContent>
            <NavMain
              items={data?.navMain}
              dashboradItem={data?.navMain?.dashboard}
            />
          </SidebarContent>
        </div>

        <SidebarFooter>
          {/* <NavUser user={user as TAuthUSer} /> */}
          <Collapsible asChild className="group/collapsible ">
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={"Logout"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleLogOut}
                className="  cursor-pointer bg-transparent border-none rounded-lg py-1 flex justify-start items-center overflow-hidden w-full px-0"
              >
                <div className="relative cursor-pointer bg-transparent border-none rounded-lg py-1 flex justify-start items-center overflow-hidden w-full ">
                  {isHovered && <SidebarButtonSvg />}

                  {/* Top-left border */}
                  {isHovered && (
                    <div className="absolute top-0 left-px inset-1.5 border-l border-t border-white/20 rounded-tl-lg pointer-events-none" />
                  )}

                  {/* Bottom-right border */}
                  {isHovered && (
                    <div className="absolute bottom-0 right-px inset-1.5 border-r border-b border-white/20 rounded-br-lg pointer-events-none" />
                  )}

                  {/* Bottom gradient line */}
                  {isHovered && (
                    <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
                      <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
                    </div>
                  )}

                  {/* Link text */}
                  <p className="flex items-center gap-2 px-4 group-data-[collapsible=icon]:px-3 text-red-600">
                    <span>
                      <LogOut size={16} />
                    </span>{" "}
                    <span className="text-sm">Logout</span>
                  </p>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarFooter>
      </div>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
