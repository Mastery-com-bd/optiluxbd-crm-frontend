export type TAuthUser = {
  userId: string;
  userRole: "Admin" | "Agent" | "SuperAdmin";
  iat: number;
  exp: number;
};

export type TAuthState = {
  user: null | TAuthUser;
  token: null | string;
};
