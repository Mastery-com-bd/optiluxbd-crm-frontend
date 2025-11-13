export const routePermissions: Record<string, string[]> = {
  //   👤 User Management
  "/dashboard/admin/manage-users": [
    "USERS VIEW",
    "USERS CREATE",
    "USERS UPDATE",
    "USERS DELETE",
  ],

  // 🛍️ Product Management
  // "/dashboard/admin/products": [
  //   "PRODUCTS VIEW",
  //   "PRODUCTS CREATE",
  //   "PRODUCTS UPDATE",
  //   "PRODUCTS DELETE",
  // ],
  "/dashboard/admin/products/inventory": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/reviews": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/all": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/drafts": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/add": ["PRODUCTS CREATE"],
  "/dashboard/admin/products/deleted": ["PRODUCTS DELETE"],
  // combo management
  "/dashboard/combo": [
    "PRODUCTS VIEW",
    "PRODUCTS UPDATE",
    "PRODUCTS DELETE",
    "PRODUCTS UPDATE",
  ],
  "/dashboard/combo/create-combo": [
    "PRODUCTS VIEW",
    "PRODUCTS UPDATE",
    "PRODUCTS CREATE",
    "PRODUCTS DELETE",
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

  // 🧑‍💼 Role Management
  "/dashboard/admin/roles": ["ROLES MANAGE"],

  // 💰 ORDERS Management
  "/dashboard/admin/orders": [
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
};
