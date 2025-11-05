export type TAuthUser = {
  userId: string;
  role: "ADMIN" | "AGENT" | "CUSTOMER" | "SUPER-ADMIN";
  iat: number;
  exp: number;
};

export type TAuthState = {
  user: null | TAuthUser;
  token: null | string;
};
