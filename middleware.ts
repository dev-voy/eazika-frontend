import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*", "/", "/profile", "/dashboard", "/login", "/register"],
};

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/cart", "/dashboard", "/profile"];
/*
const adminRoutes = ["/admin"];
const verifyToken = async (token: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/token/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => res.json())
    .catch(() => null);
};
*/
export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value || null; // Get the token from cookies

  // console.log("Middleware token:", token);

  const url = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.some((route) => url.startsWith(route));
  const isProtactedRoutes = protectedRoutes.some((route) =>
    url.startsWith(route)
  );
  /*
    const decodedToken = await verifyToken(token || "");
    const isAdminRoute = adminRoutes.some((route) => url.startsWith(route));
    if (
      isAdminRoute &&
      decodedToken?.user?.role.toLocaleLowerCase() !== "admin"
    ) {
      return NextResponse.redirect(new URL(`/?unauthorized${url}`, request.url));
    }
    */

  if (!token && !isAuthRoute && isProtactedRoutes) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${url}`, request.url)
    );
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}
