import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SubItemButton from "@/components/pages/shared/dashboard/sidebar/buttons/SubItemButton";
import { NavRoute } from "@/constants/CRM_Navigation";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { getSidebarRoutes } from "@/utills/getSidebarRoutes";
import { usePathname } from "next/navigation";

type TCoreManagementRoute = {
  sidebarRoutes?: NavRoute[];
  platform: string;
  singleRoute: {
    reports: NavRoute;
    settings: NavRoute;
    help: NavRoute;
  };
};

const ChildLessRoute = ({ platform, singleRoute }: TCoreManagementRoute) => {
  const user = useAppSelector(currentUser);
  const { role, permissions } = getPermissions(user as TAuthUSer);
  const pathname = usePathname();
  const routes = Object.values(singleRoute);
  const visibleRoutes = getSidebarRoutes(routes, role, permissions);

  return (
    <div>
      <SidebarGroupLabel>{platform}</SidebarGroupLabel>
      <SidebarMenu>
        {visibleRoutes.map((item, i) => {
          const isActive = pathname === item.path;

          // If the item has children
          return (
            <Collapsible key={i} asChild className="group/collapsible">
              <SidebarMenuItem>
                {singleRoute && (
                  <SubItemButton isActive={isActive} subItem={item} />
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </div>
  );
};

export default ChildLessRoute;
