/** @format */

import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/home"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
};

const isRouteMatch = (pathname: string, routes: string[]) => {
  return routes.some((route) =>
    route === "/"
      ? pathname === "/"
      : pathname === route || pathname.startsWith(`${route}/`)
  );
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value ?? null;
  const { pathname, search } = request.nextUrl;

  if (isRouteMatch(pathname, AUTH_ROUTES)) {
    if (token) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  if (isRouteMatch(pathname, PUBLIC_ROUTES)) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
