export type TAuthUser = {
  userId: string;
  role: "ADMIN" | "AGENT" | "SUPER-ADMIN";
  iat: number;
  exp: number;
};

export type TAuthState = {
  user: null | TAuthUser;
  token: null | string;
};
