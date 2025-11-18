export const routePermissions: Record<string, string[]> = {
  //   👤 User Management
  "/dashboard/admin/manage-users": ["USERS VIEW"],

  // 🛍️ Product Management
  "/dashboard/admin/products/all-products": ["PRODUCTS VIEW"],
  "/dashboard/admin/products/add-product": ["PRODUCTS CREATE"],
  "/dashboard/admin/products/drafts": ["PRODUCTS VIEW"],
  "/dashboard/admin/products/deleted": ["PRODUCTS VIEW"],
  "/dashboard/admin/products/inventory": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/reviews": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/bulk-upload": ["PRODUCTS VIEW", "PRODUCTS DELETE"],

  // combo management
  "/dashboard/combo": ["PACKAGES VIEW"],
  "/dashboard/combo/create-combo": [
    "PACKAGES CREATE",
    "PACKAGES VIEW",
    "PRODUCTS VIEW",
  ],

  // 🧾 Customer Management
  "/dashboard/customers": ["CUSTOMERS VIEW"],
  "/dashboard/customers/add": ["CUSTOMERS CREATE"],
  "/dashboard/customers/id": ["CUSTOMERS VIEW"],
  "/dashboard/customers/edit": ["CUSTOMERS UPDATE"],
  "/dashboard/customers/delete": ["CUSTOMERS DELETE"],

  // 🖼️ Image Management
  "/dashboard/admin/images": [
    "IMAGES UPLOAD",
    "IMAGES DELETE",
    "IMAGES OPTIMIZE",
  ],

  // 🏠 Address Management
  "/dashboard/admin/addresses": [
    "ADDRESSES VIEW",
    "ADDRESSES CREATE",
    "ADDRESSES UPDATE",
    "ADDRESSES DELETE",
  ],

  // 💰 ORDERS Management
  "/dashboard/agent/orders/my-orders": ["ORDERS VIEW"],
  "/dashboard/admin/orders/top-sellers": ["ORDERS VIEW"],
  "/dashboard/admin/orders": ["ORDERS VIEW"],
  "/dashboard/admin/orders/myOrders": [
    "ORDERS CREATE",
    "ORDERS VIEW",
    "ORDERS VIEW OWN",
    "ORDERS UPDATE",
    "ORDERS DELETE",
  ],

  // 💸 Commissions Management
  "/dashboard/admin/commissions": [
    "COMMISSIONS VIEW",
    "COMMISSIONS VIEW OWN",
    "COMMISSIONS VIEW ALL",
  ],
  // 💸 role Management
  "/dashboard/hr&staff/roles": ["ROLES MANAGE"],
  "/dashboard/hr&staff/staff/add": ["USERS CREATE"],

  // leads management
  "/dashboard/leads/admin/assign-agent": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS REPORTS VIEW",
    "ALLOCATIONS REPORTS VIEW OWN",
    "ALLOCATIONS VIEW OWN",
  ],

  "/dashboard/leads/admin/assign-customer": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS REPORTS VIEW",
    "ALLOCATIONS REPORTS VIEW OWN",
    "ALLOCATIONS VIEW OWN",
  ],

  "/dashboard/leads/leaders": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS VIEW OWN",
    "ALLOCATIONS REPORTS VIEW OWN",
    "CONTACTS CREATE",
  ],
  "/dashboard/test-notifications": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS VIEW OWN",
    "ALLOCATIONS REPORTS VIEW OWN",
    "CONTACTS CREATE",
  ],
};
