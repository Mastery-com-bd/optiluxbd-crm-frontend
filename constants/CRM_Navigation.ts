import LeadsTitleIcon from "@/components/svgIcon/LeadsTitleIcon";
import {
  Package,
  ShoppingCart,
  Users,
  Users2,
  Activity,
  Tags,
  MessageCircleWarning,
  CircleGauge,
  UsersRound,
  GitFork,
  PackageCheck,
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
  dashboard: NavRoute;
  coreManagement: NavRoute[];
  teamAndSales: NavRoute[];
  deliveryCommunication: NavRoute[];
  analyticsAndSettings: NavRoute[];
};

export const crmRoutes: TCrmNavigation = {
  dashboard: {
    title: "Dashboard",
    icon: CircleGauge,
    path: "/dashboard",
    // permissions: ["REPORTS VIEW", "AGENT-REPORTS VIEW"],
    // roles: ["owner", "TEAM_LEADER"],
  },

  // core management
  coreManagement: [
    //CATEGORIES
    {
      title: "Categories",
      icon: Tags,
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
          title: "Parent Categories",
          path: "/dashboard/admin/product-category/parent-category",
          // permissions: [
          //   "CATEGORIES CREATE",
          //   "CATEGORIES UPDATE",
          //   "CATEGORIES DELETE",
          //   "CATEGORIES VIEW",
          // ],
        },
        {
          title: "Sub Categories",
          path: "/dashboard/admin/product-category/sub-category",
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
      icon: Package,
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
          title: "Payments",
          path: "/dashboard/admin/orders/payments",
          // permissions: ["ORDERS VIEW"],
        },
        {
          title: "My Orders",
          path: "/dashboard/agent/orders/my-orders",
          // permissions: ["ORDERS VIEW OWN"],
          // roles: ["AGENT"],
        },
        {
          title: "Create Order",
          path: `/dashboard/agent/orders/create-order/${0}`,
          // permissions: ["ORDERS CREATE"],
          // roles: ["AGENT"],
        },
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
        // {
        //   title: "All Teams",
        //   path: "/dashboard/leads/admin/all-teams",
        //   roles: ["owner"],
        //   permissions: [
        //     "ALLOCATIONS ASSIGN LEADER",
        //     "ALLOCATIONS DISTRIBUTE",
        //     "ALLOCATIONS REPORTS VIEW",
        //     "ALLOCATIONS REPORTS VIEW OWN",
        //     "ALLOCATIONS VIEW OWN",
        //   ],
        // },
        // {
        //   title: "My Team",
        //   path: "/dashboard/leads/leaders",
        //   roles: ["TEAM_LEADER"],
        //   permissions: [
        //     "ALLOCATIONS ASSIGN LEADER",
        //     "ALLOCATIONS DISTRIBUTE",
        //     "ALLOCATIONS REPORTS VIEW",
        //     "ALLOCATIONS REPORTS VIEW OWN",
        //     "ALLOCATIONS VIEW OWN",
        //   ],
        // },
        {
          title: "My Leads",
          path: "/dashboard/team-leader/my-leads",
          // roles: ["AGENT"],
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
        {
          title: "My Team",
          path: "/dashboard/team-leader/my-team",
          // roles: ["AGENT"],
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
  ],

  // delivery and communication
  deliveryCommunication: [
    // Courier route
    {
      title: "Courier & Delivery",
      icon: PackageCheck,
      // permissions: [
      //   "ORDERS VIEW",
      //   "ORDERS CREATE",
      //   "ORDERS UPDATE",
      //   "ORDERS DELETE",
      //   "ORDERS VIEW OWN",
      // ],
      // roles: ["owner", "LEADER"],
      children: [
        {
          title: "Courier Overview",
          path: "/dashboard/couriar/local",
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
              path: "/dashboard/couriar/redex",
            },
            {
              title: "Steedfast",
              path: "/dashboard/couriar/steadfast",
            },
          ],
          // permissions: ["ORDERS VIEW"],
        },
        {
          title: "Courier Assignemnts",
          path: "/dashboard/couriar/local",
          // permissions: ["ORDERS VIEW"],
        },
        // {
        //   title: "Steadfast",
        //   path: "/dashboard/couriar/steadFast",
        //   permissions: ["ORDERS VIEW"],
        // },
        // {
        //   title: "Pathao",
        //   path: "/dashboard/couriar/pathao",
        //   permissions: ["ORDERS VIEW"],
        // },
        // {
        //   title: "RedX",
        //   path: "/dashboard/couriar/redx",
        //   permissions: ["ORDERS VIEW"],
        // },
      ],
    },
  ],

  // amalytics and settings
  analyticsAndSettings: [
    // complain route
    {
      title: "Complaint",
      icon: MessageCircleWarning,
      // permissions: [
      //   "COMPLAIN VIEW",
      //   "COMPLAIN CREATE",
      //   "COMPLAIN UPDATE",
      //   "COMPLAIN DELETE",
      // ],
      children: [
        {
          title: "Report user's complain",
          path: "/dashboard/agent/complaint",
          // permissions: ["COMPLAINT CREATE", "COMPLAINT VIEW", "COMPLAINT UPDATE", "COMPLAINT DELETE"],
        },
      ],
    },

    // hr and staff route
    {
      title: "HR & Staff",
      icon: Users2,
      // permissions: ["USERS CREATE", "USERS VIEW", "ROLES MANAGE", "ROLES VIEW"],
      // roles: ["owner"],
      children: [
        {
          title: "All Employee",
          path: "/dashboard/admin/manage-users",
          // permissions: ["USERS VIEW"],
        },
        {
          title: "Add Employee",
          path: "/dashboard/hr&staff/staff/add",
          // permissions: ["USERS CREATE"],
        },
        {
          title: "Roles & Permissions",
          path: "/dashboard/hr&staff/roles",
          // permissions: ["ROLES MANAGE"],
        },
        {
          title: "Pending Approval",
          path: "/dashboard/admin/approve-user",
          // permissions: ["USERS VIEW"],
        },
      ],
    },

    // activity
    {
      title: "Activity",
      icon: Activity,
      children: [
        {
          title: "All Activity",
          path: "/dashboard/activity",
          // permissions: ["AUDIT VIEW"],
          // roles: ["owner"],
        },
        {
          title: "My Activity",
          path: "/dashboard/my-activity",
        },
      ],
    },

    // reminder
    {
      title: "Reminder",
      icon: Activity,
      children: [
        {
          title: "All Reminders",
          path: "/dashboard/reminders",
          // permissions: ["AUDIT VIEW"],
        },
        // {
        //   title: "Customer Reminder",
        //   path: "/dashboard/reminders/customer-reminders",
        //   // permissions: ["AUDIT VIEW"],
        // },
        {
          title: "Upcoming Reminders",
          path: "/dashboard/reminders/upcoming-reminders",
          // permissions: ["AUDIT VIEW"],
        },
      ],
    },
  ],
};
