export const routePermissions: Record<string, string[]> = {
  // 👤 User Management
  "/dashboard/admin/manage-users": [
    "USERS VIEW",
    "USERS CREATE",
    "USERS UPDATE",
    "USERS DELETE",
  ],

  // 🛍️ Product Management
  "/dashboard/admin/products": [
    "PRODUCTS VIEW",
    "PRODUCTS CREATE",
    "PRODUCTS UPDATE",
    "PRODUCTS DELETE",
  ],

  // 🧾 Customer Management
  "/dashboard/customers/page": ["CUSTOMERS VIEW"],
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

  // 💰 Sales Management
  "/dashboard/admin/sales": [
    "SALES CREATE",
    "SALES VIEW",
    "SALES VIEW OWN",
    "SALES UPDATE",
    "SALES DELETE",
  ],

  // 💸 Commissions Management
  "/dashboard/admin/commissions": [
    "COMMISSIONS VIEW",
    "COMMISSIONS VIEW OWN",
    "COMMISSIONS VIEW ALL",
  ],
};
