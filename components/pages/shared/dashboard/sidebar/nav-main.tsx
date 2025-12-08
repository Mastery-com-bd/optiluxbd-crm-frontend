"use client";

import { ChevronRight, Minus, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { getSidebarRoutes } from "@/utills/getSidebarRoutes";
import { NavRoute } from "@/constants/CRM_Navigation";
import { usePathname } from "next/navigation";

export function NavMain({ items }: { items: NavRoute[] }) {
  const user = useAppSelector(currentUser);
  const { role, permissions } = getPermissions(user as TAuthUSer);
  const visibleRoutes = getSidebarRoutes(items, role, permissions);
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {visibleRoutes.map((item) => {
          if (!item.children || item.children.length === 0) {
            const isActive = pathname === item.path;
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
            <Collapsible
              key={item.title}
              asChild
              className="group/collapsible "
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="cursor-pointer"
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <Plus className="ml-auto transition-all duration-200 group-data-[state=open]/collapsible:hidden" />

                    {/* Minus (only when open) */}
                    <Minus className="ml-auto hidden transition-all duration-200 group-data-[state=open]/collapsible:block" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children?.map((subItem) => {
                      const isActive = pathname === subItem.path;
                      return (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          active={isActive}
                        >
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.path!}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
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
