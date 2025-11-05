import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, logout } from "./service/auth";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

const rolebasedPrivateUser = {
  ADMIN: [/^\/dashboard\/admin(\/.*)?$/],
  "SUPER-ADMIN": [/^\/dashboard\/admin(\/.*)?$/],
  CUSTOMER: [/^\/dashboard\/agent(\/.*)?$/],
  AGENT: [/^\/dashboard\/agent(\/.*)?$/],
};

type TRole = keyof typeof rolebasedPrivateUser;
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }
  const role = userInfo?.role as TRole;
  if (role && rolebasedPrivateUser[role]) {
    const allowedRoutes = rolebasedPrivateUser[role];
    const isAllowed = allowedRoutes.some((route) => {
      const match = pathname.match(route);
      return match !== null;
    });
    console.log(isAllowed);
    if (!isAllowed) {
      await logout();
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } else {
    await logout();
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/dashboard/(.*)"],
};
