// @ts-nocheck
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractUser } from "./utils/extractUser";

export function middleware(request: NextRequest) {
  const user = extractUser();
  const path = request.nextUrl.pathname;

  // Public routes
  const publicRoutes = [
    "/signin",
    "/signup",
    "/about-us",
    "/contact-us",
    "/forget-password",
    "/",
  ];
  if (publicRoutes.includes(path) || path.startsWith("/reset-password/")) {
    return NextResponse.next();
  }
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Protected routes
  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Admin-only routes

  if (path.startsWith("/dashboard") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin or user routes
  if (
    (path === "/my-profile" || path === "/verifyUser") &&
    !["admin", "user"].includes(user.role)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User-only routes
  if (path === "/my-feed" && user.role !== "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
