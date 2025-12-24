"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import SubItemButton from "@/components/ui/SubItemButton";
import { NavRoute, TCrmNavigation } from "@/constants/CRM_Navigation";
import CoreManagement from "./sidebarRoutes/CoreManagement";
import ChildLessRoute from "./sidebarRoutes/ChildrenLessRoute";

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
  const deliveryAndCommunication =
    items?.deliveryCommunication?.courierAndDelivery;
  const communicationRoute = items?.deliveryCommunication?.communication;
  // analytics and settings
  const analyticsAndSettings = items?.analyticsAndSettings;
  console.log(analyticsAndSettings);

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
        singleRoute={communicationRoute}
      />
      {/* settings and analytics */}
      <ChildLessRoute
        singleRoute={analyticsAndSettings.childLessRoutes!}
        platform="Analytics & Settings"
      />
    </SidebarGroup>
  );
}
