"use client";

import { Minus, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { getSidebarRoutes } from "@/utills/getSidebarRoutes";
import { NavRoute } from "@/constants/CRM_Navigation";
import { usePathname } from "next/navigation";
import { matchRoute } from "@/utills/matchRoute";
import SubItemButton from "@/components/ui/SubItemButton";
import SidebarButtonSvg from "@/components/svgIcon/SidebarButtonSvg";

export function NavMain({ items }: { items: NavRoute[] }) {
  const user = useAppSelector(currentUser);
  const { role, permissions } = getPermissions(user as TAuthUSer);
  const visibleRoutes = getSidebarRoutes(items, role, permissions);
  const pathname = usePathname();

  // Show effect if active OR hovered

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core Management</SidebarGroupLabel>
      <SidebarMenu>
        {visibleRoutes.map((item) => {
          const isActive = pathname === item.path;
          if (!item.children || item.children.length === 0) {
            return (
              <SidebarMenuItem key={item.title}>
                {item.path ? (
                  <Link href={item.path}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={isActive ? "bg-gray-100" : ""}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                ) : (
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          }
          // If the item has children
          return (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="w-full"
                  >
                    <button className="relative w-full cursor-pointer text-base overflow-hidden rounded-lg group/btn">
                      {/* Glow SVG */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
                        <SidebarButtonSvg />
                      </div>

                      {/* Top-left border */}
                      <div
                        className="pointer-events-none absolute top-0 left-px inset-1.5
                    border-l border-t border-white/20 rounded-tl-lg opacity-0
                    group-hover/btn:opacity-100 transition-opacity duration-200"
                      />

                      {/* Bottom-right border */}
                      <div
                        className="pointer-events-none absolute bottom-0 right-px inset-1.5
                    border-r border-b border-white/20 rounded-br-lg opacity-0
                    group-hover/btn:opacity-100 transition-opacity duration-200"
                      />

                      {/* Bottom gradient line */}
                      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
                        <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex w-full items-center justify-between px-4 group-data-[collapsible=icon]:p-2 py-2">
                        <p className="flex items-center gap-2">
                          <span>{item.icon && <item.icon size={16} />}</span>
                          <span>{item.title}</span>
                        </p>

                        <p>
                          <Plus
                            size={16}
                            className="transition-all duration-200 group-data-[state=open]/collapsible:hidden"
                          />
                          <Minus
                            size={16}
                            className="hidden transition-all duration-200 group-data-[state=open]/collapsible:block"
                          />
                        </p>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children?.map((subItem) => {
                      const isActive = matchRoute(pathname, subItem.path);

                      return (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          active={isActive}
                        >
                          <SubItemButton
                            isActive={isActive}
                            subItem={subItem}
                          />
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
