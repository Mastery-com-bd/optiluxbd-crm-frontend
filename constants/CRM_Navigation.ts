import LeadsTitleIcon from "@/components/svgIcon/LeadsTitleIcon";
import {
  ShoppingCart,
  Users,
  CircleGauge,
  UsersRound,
  GitFork,
  PackageCheck,
  FileStack,
  Handbag,
  Contact,
  Phone,
  ChartColumn,
  Info,
  Settings,
  CalendarClock,
  Target,
  CircleUserRound,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  roles?: string[];
  permissions?: string[];
  children?: NavRoute[];
}

export type TCrmNavigation = {
  dashboard: {
    routes: NavRoute[];
  };
  coreManagement: NavRoute[];
  teamAndSales: NavRoute[];
  deliveryCommunication: {
    routes: NavRoute[];
  };
  analyticsAndSettings: {
    routes: NavRoute[];
  };
  agentRoute?: {
    routes: NavRoute[];
  };
  teamRoute?: {
    routes: NavRoute[];
  };
};

export const crmRoutes: TCrmNavigation = {
  dashboard: {
    routes: [
      {
        title: "Dashboard",
        icon: CircleGauge,
        path: "/dashboard",
      },
    ],
  },
  // core management
  coreManagement: [
    //CATEGORIES
    {
      title: "Categories",
      icon: FileStack,
      // permissions: [
      //   "CATEGORIES CREATE",
      //   "CATEGORIES UPDATE",
      //   "CATEGORIES DELETE",
      //   "CATEGORIES VIEW",
      //   "SUBCATEGORIES CREATE",
      //   "SUBCATEGORIES UPDATE",
      //   "SUBCATEGORIES DELETE",
      //   "SUBCATEGORIES VIEW",
      // ],
      children: [
        {
          title: "Overview",
          path: "/dashboard/categories",
          // permissions: [
          //   "CATEGORIES CREATE",
          //   "CATEGORIES UPDATE",
          //   "CATEGORIES DELETE",
          //   "CATEGORIES VIEW",
          // ],
        },
        {
          title: "All Category",
          path: "/dashboard/categories/all",
          // permissions: [
          //   "SUBCATEGORIES CREATE",
          //   "SUBCATEGORIES UPDATE",
          //   "SUBCATEGORIES DELETE",
          //   "SUBCATEGORIES VIEW",
          // ],
        },
      ],
    },

    // products route
    {
      title: "Products",
      icon: Handbag,
      // permissions: [
      //   "PRODUCTS VIEW",
      //   "PRODUCTS CREATE",
      //   "PRODUCTS UPDATE",
      //   "PRODUCTS DELETE",
      // ],
      children: [
        {
          title: "All Products",
          path: "/dashboard/admin/products/all-products",
          // permissions: ["PRODUCTS VIEW"],
        },
        {
          title: "Add Product",
          path: "/dashboard/admin/products/add-product",
          // permissions: ["PRODUCTS CREATE"],
        },
        {
          title: "Draft Products",
          path: "/dashboard/admin/products/draft-products",
          // permissions: ["PRODUCTS DELETE", "PRODUCTS VIEW", "PRODUCTS UPDATE"],
        },
        {
          title: "Low Stock Products",
          path: "/dashboard/admin/products/low-stock-products",
          // permissions: ["PRODUCTS DELETE", "PRODUCTS VIEW", "PRODUCTS UPDATE"],
        },
        // {
        //   title: "History",
        //   path: "/dashboard/admin/products/history",
        //   // permissions: ["PRODUCTS DELETE", "PRODUCTS VIEW", "PRODUCTS UPDATE"],
        // },
      ],
    },

    // combo pack route
    {
      title: "Combo Pack",
      icon: GitFork,
      // permissions: [
      //   "PACKAGES VIEW",
      //   "PACKAGES CREATE",
      //   "PACKAGES UPDATE",
      //   "PACKAGES DELETE",
      // ],
      children: [
        {
          title: "All Combo Pack",
          path: "/dashboard/combo",
          // permissions: ["PACKAGES VIEW"],
        },
        {
          title: "Create Combo",
          path: "/dashboard/combo/create-combo",
          // permissions: ["PACKAGES CREATE"],
        },
        {
          title: "Combo Draft",
          path: "/dashboard/combo/combo-draft",
          // permissions: ["PACKAGES VIEW"],
        },
      ],
    },

    // orders route
    {
      title: "Orders",
      icon: ShoppingCart,
      // permissions: [
      //   "ORDERS VIEW",
      //   "ORDERS CREATE",
      //   "ORDERS UPDATE",
      //   "ORDERS DELETE",
      //   "ORDERS VIEW OWN",
      // ],
      children: [
        {
          title: "Overview",
          path: "/dashboard/admin/orders/overview",
          // permissions: ["ORDERS VIEW"],
        },
        {
          title: "All Orders",
          path: "/dashboard/admin/orders",
          // permissions: ["ORDERS VIEW"],
        },
        {
          title: "Refunds",
          path: "/dashboard/admin/orders/refunds",
          // permissions: ["ORDERS VIEW"],
        },
        {
          title: "Invoice Generator",
          path: "/dashboard/admin/orders/payments",
          // permissions: ["ORDERS VIEW"],
        },
        // {
        //   title: "My Orders",
        //   path: "/dashboard/agent/orders/my-orders",
        //   permissions: ["ORDERS VIEW OWN"],
        //   roles: ["AGENT"],
        // },
        // {
        //   title: "Create Order",
        //   path: `/dashboard/agent/orders/create-order/${0}`,
        //   permissions: ["ORDERS CREATE"],
        //   roles: ["AGENT"],
        // },
        // {
        //   title: "Top Sellers",
        //   path: "/dashboard/admin/orders/top-sellers",
        //   permissions: ["ORDERS VIEW"],
        //   roles: ["ADMIN"],
        // },
      ],
    },

    // leads management route
    {
      title: "Leads",
      icon: LeadsTitleIcon,
      // permissions: [
      //   "ALLOCATIONS ASSIGN LEADER",
      //   "ALLOCATIONS DISTRIBUTE",
      //   "ALLOCATIONS REPORTS VIEW",
      //   "ALLOCATIONS REPORTS VIEW OWN",
      //   "ALLOCATIONS VIEW OWN",
      // ],
      // roles: ["owner", "AGENT", "TEAM_LEADER"],
      children: [
        {
          title: "Lead Overview",
          path: "/dashboard/leads/lead-overview",
          // roles: ["owner", "Agent"],
          // permissions: [
          //   "ALLOCATIONS ASSIGN LEADER",
          //   "ALLOCATIONS DISTRIBUTE",
          //   "ALLOCATIONS REPORTS VIEW",
          //   "ALLOCATIONS REPORTS VIEW OWN",
          //   "ALLOCATIONS VIEW OWN",
          // ],
        },
        {
          title: "All Leads",
          path: "/dashboard/leads",
          // roles: ["owner", "Agent"],
          // permissions: [
          //   "ALLOCATIONS ASSIGN LEADER",
          //   "ALLOCATIONS DISTRIBUTE",
          //   "ALLOCATIONS REPORTS VIEW",
          //   "ALLOCATIONS REPORTS VIEW OWN",
          //   "ALLOCATIONS VIEW OWN",
          // ],
        },
      ],
    },

    // customers route
    {
      title: "Customers",
      icon: Users,
      // permissions: [
      //   "CUSTOMERS VIEW",
      //   "CUSTOMERS CREATE",
      //   "CUSTOMERS UPDATE",
      //   "CUSTOMERS DELETE",
      // ],
      children: [
        {
          title: "Customer Overview",
          path: "/dashboard/customers/overview",
          // permissions: ["CUSTOMERS VIEW"],
        },
        {
          title: "All Customers",
          path: "/dashboard/customers",
          // permissions: ["CUSTOMERS VIEW"],
        },
        // {
        //   title: "Add Customer",
        //   path: "/dashboard/customers/add",
        //   permissions: ["CUSTOMERS CREATE"],
        // },
      ],
    },
  ],

  // team and sales hub
  teamAndSales: [
    // team leader management route
    {
      title: "Agents",
      icon: Contact,
      // permissions: [
      //   "ALLOCATIONS ASSIGN LEADER",
      //   "ALLOCATIONS DISTRIBUTE",
      //   "ALLOCATIONS REPORTS VIEW",
      //   "ALLOCATIONS REPORTS VIEW OWN",
      //   "ALLOCATIONS VIEW OWN",
      // ],
      children: [
        {
          title: "All Agents",
          path: "/dashboard/admin/agent",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
        {
          title: "Attendence",
          path: "/dashboard/admin/agent/attendance",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
        {
          title: "Team & Hierarchy",
          path: "/dashboard/admin/agent/team",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
        {
          title: "Call Tasks",
          path: "/dashboard/admin/agent/all-task",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
        {
          title: "Leaderboard",
          path: "/dashboard/admin/agent/leaderboard",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
      ],
    },
    {
      title: "Teams",
      icon: UsersRound,
      // permissions: [
      //   "ALLOCATIONS ASSIGN LEADER",
      //   "ALLOCATIONS DISTRIBUTE",
      //   "ALLOCATIONS REPORTS VIEW",
      //   "ALLOCATIONS REPORTS VIEW OWN",
      //   "ALLOCATIONS VIEW OWN",
      // ],
      children: [
        {
          title: "Team`s Overview",
          path: "/dashboard/team/overview",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
        {
          title: "All Teams",
          path: "/dashboard/team",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
        {
          title: "Lead Assignment",
          path: "/dashboard/team/assign-leads",
          // permissions: ["ALLOCATIONS REPORTS VIEW"],
        },
      ],
    },
  ],

  // delivery and communication
  deliveryCommunication: {
    routes: [
      {
        title: "Communication",
        icon: Phone,
        path: "/dashboard/communication",
      },

      {
        title: "Courier & Delivery",
        icon: PackageCheck,

        children: [
          {
            title: "Courier Overview",
            path: "/dashboard/couriar",
            // permissions: ["ORDERS VIEW"],
          },
          {
            title: "All Courier",
            children: [
              {
                title: "Pathao",
                path: "/dashboard/couriar/pathao",
              },
              {
                title: "Redex",
                path: "/dashboard/couriar/redx",
              },
              {
                title: "Steedfast",
                path: "/dashboard/couriar/steadFast",
              },
            ],
            // permissions: ["ORDERS VIEW"],
          },
          {
            title: "Courier Assignemnts",
            path: "/dashboard/couriar/assignments",
            // permissions: ["ORDERS VIEW"],
          },
        ],
      },
    ],
  },

  // amalytics and settings
  analyticsAndSettings: {
    routes: [
      {
        title: "Reports & Analytics",
        icon: ChartColumn,
        path: "/dashboard/analysis",
      },
      {
        title: "Help",
        icon: Info,
        path: "/dashboard/analysis/help",
      },
      {
        title: "Settings",
        icon: Settings,
        children: [
          {
            title: "General Settings",
            path: "/dashboard/settings/general",
          },
          {
            title: "Users & Roles",
            path: "/dashboard/settings/users&Roles",
          },
          {
            title: "Email & SMS",
            path: "/dashboard/settings/email&sms",
          },
          {
            title: "Notification",
            path: "/dashboard/settings/notification",
          },
          {
            title: "Backup & Restore",
            path: "/dashboard/settings/backup&restore",
          },
          {
            title: "Api Integration",
            path: "/dashboard/settings/api-Integration",
          },
        ],
      },
    ],
  },

  agentRoute: {
    routes: [
      {
        title: "Dashboard",
        icon: CircleGauge,
        path: "/dashboard/agentDashboard",
      },
      {
        title: "Attendence",
        icon: CalendarClock,
        path: "/dashboard/agentDashboard/attendance",
      },
      {
        title: "My Leads",
        icon: Target,
        path: "/dashboard/agentDashboard/leads",
      },
      {
        title: "Profile",
        icon: CircleUserRound,
        path: "/dashboard/agentDashboard/profile",
      },
      {
        title: "Settings",
        icon: Settings,
        path: "/dashboard/analysis/settings",
      },
    ],
  },

  teamRoute: {
    routes: [
      {
        title: "Dashboard",
        icon: CircleGauge,
        path: "/dashboard/team-leader/home",
      },
      {
        title: "My Leads",
        icon: Target,
        path: "/dashboard/team-leader/my-leads",
      },
      {
        title: "My Team",
        icon: Users,
        path: "/dashboard/team-leader/my-team",
      },
      {
        title: "Profile",
        icon: CircleUserRound,
        path: "/dashboard/agentDashboard/profile",
      },
      {
        title: "Settings",
        icon: Settings,
        path: "/dashboard/analysis/settings",
      },
    ],
  },
};
