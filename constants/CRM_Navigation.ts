import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Users2,
  Gift,
  Activity,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavChildRoute {
  title: string;
  path: string;
  roles?: string[];
  permissions?: string[];
}

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  roles?: string[];
  permissions?: string[];
  children?: NavChildRoute[];
}

export const crmRoutes: NavRoute[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN"],
  },

  // products route
  {
    title: "Products",
    icon: Package,
    permissions: [
      "PRODUCTS VIEW",
      "PRODUCTS CREATE",
      "PRODUCTS UPDATE",
      "PRODUCTS DELETE",
    ],
    children: [
      {
        title: "All Products",
        path: "/dashboard/admin/products/all-products",
        permissions: ["PRODUCTS VIEW"],
      },
      {
        title: "Add Product",
        path: "/dashboard/admin/products/add-product",
        permissions: ["PRODUCTS CREATE"],
      },
      {
        title: "Draft Products",
        path: "/dashboard/admin/products/drafts",
        permissions: ["PRODUCTS VIEW"],
      },
    ],
  },

  // combo pack route
  {
    title: "Combo Pack",
    icon: Gift,
    permissions: [
      "PACKAGES VIEW",
      "PACKAGES CREATE",
      "PACKAGES UPDATE",
      "PACKAGES DELETE",
    ],
    children: [
      {
        title: "All Combo Pack",
        path: "/dashboard/combo",
        permissions: ["PACKAGES VIEW"],
      },
      {
        title: "Create Combo",
        path: "/dashboard/combo/create-combo",
        permissions: ["PACKAGES CREATE", "PRODUCTS VIEW"],
      },
    ],
  },

  // orders route
  {
    title: "Orders",
    icon: ShoppingCart,
    permissions: [
      "ORDERS VIEW",
      "ORDERS CREATE",
      "ORDERS UPDATE",
      "ORDERS DELETE",
      "ORDERS VIEW OWN",
    ],
    children: [
      {
        title: "All Orders",
        path: "/dashboard/admin/orders",
        permissions: ["ORDERS VIEW"],
      },
      {
        title: "My Orders",
        path: "/dashboard/agent/orders/my-orders",
        permissions: ["ORDERS VIEW OWN"],
        roles: ["AGENT"],
      },
      {
        title: "Top Sellers",
        path: "/dashboard/admin/orders/top-sellers",
        permissions: ["ORDERS VIEW"],
        roles: ["ADMIN"],
      },
    ],
  },
  // Courier route
  {
    title: "Courier",
    icon: Users,
    permissions: [
      "ORDERS VIEW",
      "ORDERS CREATE",
      "ORDERS UPDATE",
      "ORDERS DELETE",
      "ORDERS VIEW OWN",
    ],
    children: [
      {
        title: "All Courier",
        path: "/dashboard/couriar",
        permissions: ["ORDERS VIEW"],
      },
    ],
  },

  // leads management route
  {
    title: "Leads Magement",
    icon: Users2,
    permissions: [
      "ALLOCATIONS ASSIGN LEADER",
      "ALLOCATIONS DISTRIBUTE",
      "ALLOCATIONS REPORTS VIEW",
      "ALLOCATIONS REPORTS VIEW OWN",
      "ALLOCATIONS VIEW OWN",
    ],
    roles: ["ADMIN", "AGENT", "TEAM_LEADER"],
    children: [
      {
        title: "Agent Distribution",
        path: "/dashboard/leads/admin/assign-agent",
        roles: ["ADMIN"],
        permissions: [
          "ALLOCATIONS ASSIGN LEADER",
          "ALLOCATIONS DISTRIBUTE",
          "ALLOCATIONS REPORTS VIEW",
          "ALLOCATIONS REPORTS VIEW OWN",
          "ALLOCATIONS VIEW OWN",
        ],
      },
      {
        title: "Customer Distribution",
        path: "/dashboard/leads/admin/assign-customer",
        roles: ["ADMIN"],
        permissions: [
          "ALLOCATIONS ASSIGN LEADER",
          "ALLOCATIONS DISTRIBUTE",
          "ALLOCATIONS REPORTS VIEW",
          "ALLOCATIONS REPORTS VIEW OWN",
          "ALLOCATIONS VIEW OWN",
        ],
      },
      {
        title: "My Team",
        path: "/dashboard/leads/leaders",
        roles: ["TEAM_LEADER"],
        permissions: [
          "ALLOCATIONS ASSIGN LEADER",
          "ALLOCATIONS DISTRIBUTE",
          "ALLOCATIONS REPORTS VIEW",
          "ALLOCATIONS REPORTS VIEW OWN",
          "ALLOCATIONS VIEW OWN",
        ],
      },
      {
        title: "My Leads",
        path: "/dashboard/leads/agents",
        roles: ["AGENT"],
        permissions: [
          "ALLOCATIONS ASSIGN LEADER",
          "ALLOCATIONS DISTRIBUTE",
          "ALLOCATIONS REPORTS VIEW",
          "ALLOCATIONS REPORTS VIEW OWN",
          "ALLOCATIONS VIEW OWN",
        ],
      },
    ],
  },

  // customers route
  {
    title: "Customers",
    icon: Users,
    permissions: [
      "CUSTOMERS VIEW",
      "CUSTOMERS CREATE",
      "CUSTOMERS UPDATE",
      "CUSTOMERS DELETE",
    ],
    children: [
      {
        title: "All Customers",
        path: "/dashboard/customers",
        permissions: ["CUSTOMERS VIEW"],
      },
      {
        title: "Add Customer",
        path: "/dashboard/customers/add",
        permissions: ["CUSTOMERS CREATE"],
      },
    ],
  },

  // hr and staff route
  {
    title: "HR & Staff",
    icon: Users2,
    permissions: ["USERS CREATE", "USERS VIEW", "ROLES MANAGE", "ROLES VIEW"],
    roles: ["ADMIN"],
    children: [
      {
        title: "All Employee",
        path: "/dashboard/admin/manage-users",
        permissions: ["USERS VIEW"],
      },
      {
        title: "Add Employee",
        path: "/dashboard/hr&staff/staff/add",
        permissions: ["USERS CREATE"],
      },
      {
        title: "Roles & Permissions",
        path: "/dashboard/hr&staff/roles",
        permissions: ["ROLES MANAGE"],
      },
    ],
  },
  {
    title: "Activity",
    icon: Activity,
    children: [
      {
        title: "All Activity",
        path: "/dashboard/activity",
        permissions: ["AUDIT VIEW"],
        roles: ["ADMIN"],
      },
      {
        title: "My Activity",
        path: "/dashboard/my-activity",
      },
    ],
  },
];
