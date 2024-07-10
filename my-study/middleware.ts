import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const publicPaths = ["/", "/signin", "/signup"];
  const path = req.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(path);

  const token = req.cookies.get("token");

  // Ensure the conditions and logic flow as expected

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  // If neither condition is met, return `undefined` to allow normal request handling
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard"],
};
