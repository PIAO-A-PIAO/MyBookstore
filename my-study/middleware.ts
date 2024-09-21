import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const publicPaths = ["/", "/signin", "/signup"];
  const path = req.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(path);
  const token = req.cookies.get("token");

  // Check if it's a public path and the user has a token
  if (isPublicPath && token) {
    try {
      const response = await fetch(
        `${req.nextUrl.origin}/api/Users/onboarded`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: `token=${token.value}`, // Pass the token in cookies
          },
        }
      );
      if (!response.ok) {
        console.error("Error fetching onboarded status.");
        return NextResponse.redirect(new URL("/404", req.nextUrl));
      }

      const result = await response.json();
      console.log(result.onboarded);
      // Redirect based on onboarding status
      if (result.onboarded) {
        return NextResponse.redirect(new URL("/room", req.nextUrl));
      } else {
        return NextResponse.redirect(new URL("/onboard", req.nextUrl));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return NextResponse.redirect(new URL("/404", req.nextUrl));
    }
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isPublicPath && token) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/Users/onboarded",
        { headers: { Cookie: `token=${token.value}` } }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error("Error fetching onboarded status.");
        return NextResponse.redirect(new URL("/404", req.nextUrl));
      }

      // Redirect based on onboarding status
      if (!result.onboarded && path!=="/onboard") {
        return NextResponse.redirect(new URL("/onboard", req.nextUrl));
      }else if (result.onboarded && path==="/onboard") {
        return NextResponse.redirect(new URL("/room", req.nextUrl));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return NextResponse.redirect(new URL("/404", req.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/room", "/onboard"],
};
