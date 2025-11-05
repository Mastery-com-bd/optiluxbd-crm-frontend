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
      { title: "All Products", path: "/dashboard/products/all", icon: ListOrdered },
      { title: "Add Product", path: "/dashboard/products/add", icon: PlusSquare },
      { title: "Draft Products", path: "/dashboard/products/drafts", icon: FileMinus },
      { title: "Deleted Products", path: "/dashboard/products/deleted", icon: Trash2 },
      { title: "Reviews", path: "/dashboard/products/reviews", icon: Star },
      { title: "Inventory", path: "/dashboard/products/inventory", icon: Warehouse },
      { title: "Bulk Upload", path: "/dashboard/products/bulk-upload", icon: Upload },
    ],
  },
  {
    title: "Categories",
    icon: Tags,
    children: [
      { title: "All Categories", path: "/dashboard/categories/all", icon: ListOrdered },
      { title: "Add Category", path: "/dashboard/categories/add", icon: PlusSquare },
      { title: "Edit Categories", path: "/dashboard/categories/edit", icon: Tags },
      { title: "Add Sub Category", path: "/dashboard/categories/sub/add", icon: PlusSquare },
      { title: "Edit Sub Categories", path: "/dashboard/categories/sub/edit", icon: Tags },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    children: [
      { title: "All Orders", path: "/orders", icon: ClipboardList },
      { title: "Processing", path: "/orders/processing", icon: RefreshCcw },
      { title: "Completed", path: "/orders/completed", icon: CheckCircle },
      { title: "Cancelled", path: "/orders/cancelled", icon: XCircle },
      { title: "Returns", path: "/orders/returns", icon: RefreshCw },
      { title: "Invoices", path: "/orders/invoices", icon: FileText },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    children: [
      { title: "All Customers", path: "/dashboard/customers", icon: Users },
      { title: "Add Customer", path: "/dashboard/customers/add", icon: UserPlus },
      { title: "Groups", path: "/dashboard/customers/groups", icon: UserCog },
      { title: "Feedback", path: "/dashboard/customers/feedback", icon: MessageCircle },
      { title: "Support Tickets", path: "/dashboard/customers/tickets", icon: MessageSquare },
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
      { title: "Transactions", path: "/finance/transactions", icon: DollarSign },
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
      { title: "Purchase Orders", path: "/suppliers/purchase-orders", icon: ClipboardList },
      { title: "Stock Transfers", path: "/suppliers/stock-transfers", icon: Package2 },
      { title: "Low Stock Alerts", path: "/suppliers/low-stock", icon: AlertTriangle },
    ],
  },
  {
    title: "HR & Staff",
    icon: Users2,
    children: [
      { title: "All Employees", path: "/dashboard/hr&staff/staff", icon: Users },
      { title: "Add Employee", path: "/dashboard/hr&staff/staff/add", icon: UserPlus },
      { title: "Roles & Permissions", path: "/dashboard/hr&staff/staff/roles", icon: Shield },
      { title: "Attendance", path: "/dashboard/hr&staff/staff/attendance", icon: Clock },
      { title: "Payroll", path: "/dashboard/hr&staff/staff/payroll", icon: Wallet },
      { title: "Performance Review", path: "/dashboard/hr&staff/staff/performance", icon: BarChart2 },
    ],
  },
  {
    title: "Integrations",
    icon: Plug,
    children: [
      { title: "Payment Gateways", path: "/integrations/payments", icon: CreditCard },
      { title: "Shipping Providers", path: "/integrations/shipping", icon: Truck },
      { title: "API & Webhooks", path: "/integrations/api", icon: Plug },
      { title: "Third-Party Apps", path: "/integrations/third-party", icon: Package2 },
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
      { title: "Knowledge Base", path: "/support/knowledge-base", icon: BookOpen },
      { title: "FAQ", path: "/support/faq", icon: MessageSquareQuoteIcon },
      { title: "Contact Support", path: "/support/contact", icon: PhoneCall },
      { title: "Feedback", path: "/support/feedback", icon: ThumbsUp },
    ],
  },
];