"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { NavRoute, TCrmNavigation } from "@/constants/CRM_Navigation";
import CoreManagement from "./sidebarRoutes/CoreManagement";

export function NavMain({ items }: { items: TCrmNavigation }) {
  return (
    <SidebarGroup className="space-y-2">
      <CoreManagement
        sidebarRoutes={items?.singleRoute?.routes as NavRoute[]}
      />
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
    </SidebarGroup>
  );
}
