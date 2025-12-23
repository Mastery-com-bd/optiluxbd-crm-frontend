"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import SubItemButton from "@/components/ui/SubItemButton";
import { NavRoute, TCrmNavigation } from "@/constants/CRM_Navigation";
import CoreManagement from "./sidebarRoutes/CoreManagement";

export function NavMain({
  items,
  dashboradItem,
}: {
  items: TCrmNavigation;
  dashboradItem: NavRoute;
}) {
  const pathname = usePathname();
  const isActiveDashboard = pathname === dashboradItem.path;
  // core management
  const coreManagement = items?.coreManagement;
  // team and sales hub
  const teamAndSalesHub = items?.teamAndSales;
  //  delivery and communication
  const deliveryAndCommunication = items?.deliveryCommunication;
  // analytics and settings
  const analyticsAndSettings = items?.analyticsAndSettings;

  return (
    <SidebarGroup className="space-y-2">
      <SubItemButton isActive={isActiveDashboard} subItem={dashboradItem} />

      {/* core management */}
      <CoreManagement
        sidebarRoutes={coreManagement}
        platform="Core Management"
      />
      {/* team and sales hub */}
      <CoreManagement
        sidebarRoutes={teamAndSalesHub}
        platform="Team & Sales Hub"
      />
      {/* delivery and communication */}
      <CoreManagement
        sidebarRoutes={deliveryAndCommunication}
        platform="Delivery & Communication"
      />
      {/* settings and analytics */}
      <CoreManagement
        sidebarRoutes={analyticsAndSettings}
        platform="Analytics & Settings"
      />
    </SidebarGroup>
  );
}
