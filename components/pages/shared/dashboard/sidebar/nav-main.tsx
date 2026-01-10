"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import SubItemButton from "@/components/pages/shared/dashboard/sidebar/buttons/SubItemButton";
import { NavRoute, TCrmNavigation } from "@/constants/CRM_Navigation";
import CoreManagement from "./sidebarRoutes/CoreManagement";
import ChildLessRoute from "./sidebarRoutes/ChildrenLessRoute";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";

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
  // agent route
  const agentRoute = items?.agentRoute;
  const teamRoute = items?.teamRoute;

  const user = useAppSelector(currentUser);
  // const { role } = getPermissions(user as TAuthUSer);
  const role = ["Owner"]; // --- IGNORE ---

  return (
    <SidebarGroup className="space-y-2">
      {role.includes("Agent") && (
        <>
          <ChildLessRoute singleRoute={agentRoute!} />
        </>
      )}
      {role.includes("Team Leader") && (
        <>
          <ChildLessRoute singleRoute={teamRoute!} />
        </>
      )}

      {role.includes("Owner") && (
        <>
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
        </>
      )}
    </SidebarGroup>
  );
}
