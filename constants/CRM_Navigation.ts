import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ListOrdered,
  Trash2,
  FileMinus,
  Tags,
  Star,
  Warehouse,
  Upload,
  ShoppingCart,
  ClipboardList,
  CheckCircle,
  XCircle,
  RefreshCcw,
  FileText,
  Users,
  UserPlus,
  UserCog,
  MessageCircle,
  TrendingUp,
  Percent,
  Megaphone,
  Mail,
  MessageSquare,
  Link,
  CreditCard,
  DollarSign,
  RefreshCw,
  BarChart3,
  Briefcase,
  Boxes,
  Truck,
  AlertTriangle,
  Users2,
  Shield,
  Clock,
  Wallet,
  BarChart2,
  Plug,
  Package2,
  Settings,
  Bell,
  Lock,
  FileSearch,
  HelpCircle,
  BookOpen,
  MessageSquareQuoteIcon,
  PhoneCall,
  ThumbsUp,
  Gift,
  PackageSearch,
  Crown,
  UserCheck,
  Group,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon; // actual icon component, not string
  children?: NavRoute[];
}

export const crmRoutes: NavRoute[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    icon: Package,
    children: [
      {
        title: "All Products",
        path: "/dashboard/admin/products/all-products",
        icon: ListOrdered,
      },
      {
        title: "Add Product",
        path: "/dashboard/admin/products/add-product",
        icon: PlusSquare,
      },
      {
        title: "Draft Products",
        path: "/dashboard/admin/products/drafts",
        icon: FileMinus,
      },
      {
        title: "Deleted Products",
        path: "/dashboard/admin/products/deleted",
        icon: Trash2,
      },
      {
        title: "Reviews",
        path: "/dashboard/admin/products/reviews",
        icon: Star,
      },
      {
        title: "Inventory",
        path: "/dashboard/admin/products/inventory",
        icon: Warehouse,
      },
      {
        title: "Bulk Upload",
        path: "/dashboard/admin/products/bulk-upload",
        icon: Upload,
      },
    ],
  },
  {
    title: "Categories",
    icon: Tags,
    children: [
      {
        title: "All Categories",
        path: "/dashboard/categories/all",
        icon: ListOrdered,
      },
      {
        title: "Add Category",
        path: "/dashboard/categories/add",
        icon: PlusSquare,
      },
      {
        title: "Edit Categories",
        path: "/dashboard/categories/edit",
        icon: Tags,
      },
      {
        title: "Add Sub Category",
        path: "/dashboard/categories/sub/add",
        icon: PlusSquare,
      },
      {
        title: "Edit Sub Categories",
        path: "/dashboard/categories/sub/edit",
        icon: Tags,
      },
    ],
  },
  {
    title: "Combo Pack",
    icon: Gift,
    children: [
      {
        title: "All Combo Pack",
        path: "/dashboard/combo",
        icon: Boxes,
      },
      {
        title: "Create Combo",
        path: "/dashboard/combo/create-combo",
        icon: PackageSearch,
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    children: [
      {
        title: "All Orders",
        path: "/dashboard/admin/orders",
        icon: ClipboardList,
      },
      {
        title: "My Orders",
        path: "/dashboard/agent/orders/my-orders",
        icon: ClipboardList,
      },
      {
        title: "Top Sellers",
        path: "/dashboard/admin/orders/top-sellers",
        icon: ClipboardList,
      },
      { title: "Processing", path: "/orders/processing", icon: RefreshCcw },
      { title: "Completed", path: "/orders/completed", icon: CheckCircle },
      { title: "Cancelled", path: "/orders/cancelled", icon: XCircle },
      { title: "Returns", path: "/orders/returns", icon: RefreshCw },
      { title: "Invoices", path: "/orders/invoices", icon: FileText },
    ],
  },
  {
    title: "Leads Magement",
    icon: Users2,
    children: [
      {
        title: "All Leads",
        path: "/dashboard/admin/leads",
        icon: ClipboardList,
      },
      {
        title: "Admin",
        path: "/dashboard/leads/admin/assign-agent",
        icon: Shield,
      },
      { title: "Leaders", path: "/dashboard/leads/leaders", icon: Crown },
      { title: "Agents", path: "/dashboard/leads/agents", icon: UserCheck },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    children: [
      { title: "All Customers", path: "/dashboard/customers", icon: Users },
      {
        title: "Add Customer",
        path: "/dashboard/customers/add",
        icon: UserPlus,
      },
      { title: "Groups", path: "/dashboard/customers/groups", icon: UserCog },
      {
        title: "Feedback",
        path: "/dashboard/customers/feedback",
        icon: MessageCircle,
      },
      {
        title: "Support Tickets",
        path: "/dashboard/customers/tickets",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Sales & Marketing",
    icon: TrendingUp,
    children: [
      { title: "Discounts", path: "/marketing/discounts", icon: Percent },
      { title: "Campaigns", path: "/marketing/campaigns", icon: Megaphone },
      { title: "Email Marketing", path: "/marketing/email", icon: Mail },
      { title: "SMS Marketing", path: "/marketing/sms", icon: MessageSquare },
      { title: "Affiliate Program", path: "/marketing/affiliates", icon: Link },
    ],
  },
  {
    title: "Finance",
    icon: CreditCard,
    children: [
      {
        title: "Transactions",
        path: "/finance/transactions",
        icon: DollarSign,
      },
      { title: "Payments", path: "/finance/payments", icon: CreditCard },
      { title: "Refunds", path: "/finance/refunds", icon: RefreshCcw },
      { title: "Expenses", path: "/finance/expenses", icon: Briefcase },
      { title: "Profit & Loss", path: "/finance/profit-loss", icon: BarChart3 },
    ],
  },
  {
    title: "Inventory & Suppliers",
    icon: Boxes,
    children: [
      { title: "Suppliers", path: "/suppliers", icon: Truck },
      { title: "Add Supplier", path: "/suppliers/add", icon: PlusSquare },
      {
        title: "Purchase Orders",
        path: "/suppliers/purchase-orders",
        icon: ClipboardList,
      },
      {
        title: "Stock Transfers",
        path: "/suppliers/stock-transfers",
        icon: Package2,
      },
      {
        title: "Low Stock Alerts",
        path: "/suppliers/low-stock",
        icon: AlertTriangle,
      },
    ],
  },
  {
    title: "HR & Staff",
    icon: Users2,
    children: [
      {
        title: "All Employees",
        path: "/dashboard/hr&staff/staff",
        icon: Users,
      },
      {
        title: "Add Employee",
        path: "/dashboard/hr&staff/staff/add",
        icon: UserPlus,
      },
      {
        title: "All Users",
        path: "/dashboard/admin/manage-users",
        icon: Users,
      },
      {
        title: "Roles & Permissions",
        path: "/dashboard/hr&staff/roles",
        icon: Shield,
      },
      {
        title: "Attendance",
        path: "/dashboard/hr&staff/staff/attendance",
        icon: Clock,
      },
      {
        title: "Payroll",
        path: "/dashboard/hr&staff/staff/payroll",
        icon: Wallet,
      },
      {
        title: "Performance Review",
        path: "/dashboard/hr&staff/staff/performance",
        icon: BarChart2,
      },
    ],
  },
  {
    title: "Integrations",
    icon: Plug,
    children: [
      {
        title: "Payment Gateways",
        path: "/integrations/payments",
        icon: CreditCard,
      },
      {
        title: "Shipping Providers",
        path: "/integrations/shipping",
        icon: Truck,
      },
      { title: "API & Webhooks", path: "/integrations/api", icon: Plug },
      {
        title: "Third-Party Apps",
        path: "/integrations/third-party",
        icon: Package2,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General Settings", path: "/settings/general", icon: Settings },
      { title: "Company Settings", path: "/settings/company", icon: Briefcase },
      { title: "Security", path: "/settings/security", icon: Lock },
      { title: "Notifications", path: "/settings/notifications", icon: Bell },
      { title: "System Logs", path: "/settings/logs", icon: FileSearch },
    ],
  },
  {
    title: "Support",
    icon: HelpCircle,
    children: [
      {
        title: "Knowledge Base",
        path: "/support/knowledge-base",
        icon: BookOpen,
      },
      { title: "FAQ", path: "/support/faq", icon: MessageSquareQuoteIcon },
      { title: "Contact Support", path: "/support/contact", icon: PhoneCall },
      { title: "Feedback", path: "/support/feedback", icon: ThumbsUp },
    ],
  },
];
