"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { NavRoute, TCrmNavigation } from "@/constants/CRM_Navigation";
import CoreManagement from "./sidebarRoutes/CoreManagement";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";

export function NavMain({ items }: { items: TCrmNavigation }) {
  const user = useAppSelector(currentUser);
  // const { role } = getPermissions(user as TAuthUSer);
  const role = ["Owner"];


  return (
    <SidebarGroup className="space-y-2">
      {role.includes("Agent") && (
        <>
          <CoreManagement
            sidebarRoutes={items?.agentRoute?.routes as NavRoute[]}
          />
        </>
      )}
      {role.includes("Team Leader") && (
        <>
          <CoreManagement
            sidebarRoutes={items?.teamRoute?.routes as NavRoute[]}
          />
        </>
      )}

      {role.includes("Owner") && (
        <>
          <CoreManagement sidebarRoutes={items?.dashboard?.routes} />
          {/* core management */}
          <CoreManagement
            sidebarRoutes={items?.coreManagement}
            platform="Core Management"
          />
          {/* team and sales hub */}
          <CoreManagement
            sidebarRoutes={items?.teamAndSales}
            platform="Team & Sales Hub"
          />
          {/* delivery and communication */}
          <CoreManagement
            sidebarRoutes={items?.deliveryCommunication.routes}
            platform="Delivery & Communication"
          />
          {/* settings and analytics */}
          <CoreManagement
            sidebarRoutes={items?.analyticsAndSettings?.routes}
            platform="Analytics & Settings"
          />
        </>
      )}
    </SidebarGroup>
  );
}
